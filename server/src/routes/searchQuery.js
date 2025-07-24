import express from 'express';
import { eq, desc, and, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { queryHistory, savedQueries } from '../db/savedQueries.js';

const searchQueryRouter = express.Router();

// Get favorite queries - MUST come before /saved-queries/:id
searchQueryRouter.get('/saved-queries/favorites', async (req, res) => {
    try {
        const { userId } = req.query;

        let query = db.select().from(savedQueries).where(eq(savedQueries.isFavorite, true));

        if (userId) {
            query = query.where(
                and(eq(savedQueries.isFavorite, true), eq(savedQueries.userId, userId)),
            );
        }

        query = query.orderBy(desc(savedQueries.lastUsedAt));

        const favorites = await query;

        res.json({
            success: true,
            data: favorites,
            count: favorites.length,
        });
    } catch (error) {
        console.error('Error fetching favorite queries:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch favorite queries',
        });
    }
});

// Get all saved queries
searchQueryRouter.get('/saved-queries', async (req, res) => {
    try {
        const { userId, includeDefaults = true, tags, sortBy = 'updatedAt' } = req.query;

        let query = db.select().from(savedQueries);

        // Add filters
        const conditions = [];
        if (userId) {
            conditions.push(eq(savedQueries.userId, userId));
        }
        if (includeDefaults === 'false') {
            conditions.push(eq(savedQueries.isDefault, false));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        // Add sorting
        switch (sortBy) {
            case 'name':
                query = query.orderBy(savedQueries.name);
                break;
            case 'lastUsed':
                query = query.orderBy(desc(savedQueries.lastUsedAt));
                break;
            case 'usageCount':
                query = query.orderBy(desc(savedQueries.usageCount));
                break;
            case 'createdAt':
                query = query.orderBy(desc(savedQueries.createdAt));
                break;
            default:
                query = query.orderBy(desc(savedQueries.updatedAt));
        }

        const queries = await query;

        res.json({
            success: true,
            data: queries,
            count: queries.length,
        });
    } catch (error) {
        console.error('Error fetching saved queries:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch saved queries',
        });
    }
});

// Get a specific saved query by ID
searchQueryRouter.get('/saved-queries/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = await db.select().from(savedQueries).where(eq(savedQueries.id, id)).limit(1);

        if (query.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Query not found',
            });
        }

        res.json({
            success: true,
            data: query[0],
        });
    } catch (error) {
        console.error('Error fetching saved query:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch saved query',
        });
    }
});

// Create a new saved query
searchQueryRouter.post('/saved-queries', async (req, res) => {
    try {
        const {
            name,
            description,
            searchCriteria,
            simpleSearch,
            sortBy,
            sortOrder,
            isDefault = false,
            isFavorite = false,
            tags = [],
            userId,
        } = req.body;

        // Validation
        if (!name || !searchCriteria) {
            return res.status(400).json({
                success: false,
                error: 'Name and search criteria are required',
            });
        }

        // Check if name already exists for this user
        const existingQuery = await db
            .select()
            .from(savedQueries)
            .where(
                and(
                    eq(savedQueries.name, name),
                    userId ? eq(savedQueries.userId, userId) : sql`user_id IS NULL`,
                ),
            )
            .limit(1);

        if (existingQuery.length > 0) {
            return res.status(409).json({
                success: false,
                error: 'A query with this name already exists',
            });
        }

        const newQuery = await db
            .insert(savedQueries)
            .values({
                name,
                description,
                searchCriteria,
                simpleSearch,
                sortBy,
                sortOrder,
                isDefault,
                isFavorite,
                tags,
                userId,
                usageCount: 0,
            })
            .returning();

        res.status(201).json({
            success: true,
            data: newQuery[0],
            message: 'Query saved successfully',
        });
    } catch (error) {
        console.error('Error creating saved query:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save query',
        });
    }
});

// Update an existing saved query
searchQueryRouter.put('/saved-queries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            searchCriteria,
            simpleSearch,
            sortBy,
            sortOrder,
            isDefault,
            isFavorite,
            tags,
        } = req.body;

        // Check if query exists
        const existingQuery = await db
            .select()
            .from(savedQueries)
            .where(eq(savedQueries.id, id))
            .limit(1);

        if (existingQuery.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Query not found',
            });
        }

        const updatedQuery = await db
            .update(savedQueries)
            .set({
                name,
                description,
                searchCriteria,
                simpleSearch,
                sortBy,
                sortOrder,
                isDefault,
                isFavorite,
                tags,
                updatedAt: new Date(),
            })
            .where(eq(savedQueries.id, id))
            .returning();

        res.json({
            success: true,
            data: updatedQuery[0],
            message: 'Query updated successfully',
        });
    } catch (error) {
        console.error('Error updating saved query:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update query',
        });
    }
});

// Delete a saved query
searchQueryRouter.delete('/saved-queries/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedQuery = await db
            .delete(savedQueries)
            .where(eq(savedQueries.id, id))
            .returning();

        if (deletedQuery.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Query not found',
            });
        }

        res.json({
            success: true,
            message: 'Query deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting saved query:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete query',
        });
    }
});

// Execute a saved query and log to history
searchQueryRouter.post('/saved-queries/:id/execute', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, resultsCount, executionTime } = req.body;

        // Get the saved query
        const query = await db.select().from(savedQueries).where(eq(savedQueries.id, id)).limit(1);

        if (query.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Query not found',
            });
        }

        const savedQuery = query[0];

        // Update usage statistics
        await db
            .update(savedQueries)
            .set({
                lastUsedAt: new Date(),
                usageCount: sql`${savedQueries.usageCount} + 1`,
            })
            .where(eq(savedQueries.id, id));

        // Log to query history
        await db.insert(queryHistory).values({
            savedQueryId: id,
            searchCriteria: savedQuery.searchCriteria,
            simpleSearch: savedQuery.simpleSearch,
            sortBy: savedQuery.sortBy,
            sortOrder: savedQuery.sortOrder,
            resultsCount,
            executionTime,
            userId,
        });

        res.json({
            success: true,
            data: savedQuery,
            message: 'Query executed and logged',
        });
    } catch (error) {
        console.error('Error executing saved query:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to execute query',
        });
    }
});

// Get query history
searchQueryRouter.get('/query-history', async (req, res) => {
    try {
        const { userId, limit = 50, savedQueryId } = req.query;

        let query = db
            .select({
                id: queryHistory.id,
                savedQueryId: queryHistory.savedQueryId,
                searchCriteria: queryHistory.searchCriteria,
                simpleSearch: queryHistory.simpleSearch,
                sortBy: queryHistory.sortBy,
                sortOrder: queryHistory.sortOrder,
                resultsCount: queryHistory.resultsCount,
                executionTime: queryHistory.executionTime,
                executedAt: queryHistory.executedAt,
                queryName: savedQueries.name,
            })
            .from(queryHistory)
            .leftJoin(savedQueries, eq(queryHistory.savedQueryId, savedQueries.id));

        // Add filters
        const conditions = [];
        if (userId) {
            conditions.push(eq(queryHistory.userId, userId));
        }
        if (savedQueryId) {
            conditions.push(eq(queryHistory.savedQueryId, savedQueryId));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        query = query.orderBy(desc(queryHistory.executedAt)).limit(parseInt(limit));

        const history = await query;

        res.json({
            success: true,
            data: history,
            count: history.length,
        });
    } catch (error) {
        console.error('Error fetching query history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch query history',
        });
    }
});

// Toggle favorite status
searchQueryRouter.patch('/saved-queries/:id/favorite', async (req, res) => {
    try {
        const { id } = req.params;

        // Get current status
        const query = await db
            .select({ isFavorite: savedQueries.isFavorite })
            .from(savedQueries)
            .where(eq(savedQueries.id, id))
            .limit(1);

        if (query.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Query not found',
            });
        }

        const newFavoriteStatus = !query[0].isFavorite;

        const updatedQuery = await db
            .update(savedQueries)
            .set({
                isFavorite: newFavoriteStatus,
                updatedAt: new Date(),
            })
            .where(eq(savedQueries.id, id))
            .returning();

        res.json({
            success: true,
            data: updatedQuery[0],
            message: `Query ${newFavoriteStatus ? 'added to' : 'removed from'} favorites`,
        });
    } catch (error) {
        console.error('Error toggling favorite status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update favorite status',
        });
    }
});

export default searchQueryRouter;
