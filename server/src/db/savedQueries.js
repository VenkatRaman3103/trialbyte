import { integer } from 'drizzle-orm/pg-core';
import { pgTable, uuid, varchar, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const savedQueries = pgTable('saved_queries', {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),

    searchCriteria: jsonb('search_criteria').notNull(),
    simpleSearch: varchar('simple_search', { length: 500 }),
    sortBy: varchar('sort_by', { length: 100 }),
    sortOrder: varchar('sort_order', { length: 10 }).default('asc'),

    isDefault: boolean('is_default').default(false),
    isFavorite: boolean('is_favorite').default(false),
    tags: jsonb('tags'),

    userId: uuid('user_id'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    lastUsedAt: timestamp('last_used_at'),

    usageCount: integer('usage_count').default(0),
});

// query history
export const queryHistory = pgTable('query_history', {
    id: uuid('id').defaultRandom().primaryKey(),

    savedQueryId: uuid('saved_query_id').references(() => savedQueries.id, {
        onDelete: 'set null',
    }),

    searchCriteria: jsonb('search_criteria'),
    simpleSearch: varchar('simple_search', { length: 500 }),
    sortBy: varchar('sort_by', { length: 100 }),
    sortOrder: varchar('sort_order', { length: 10 }),

    resultsCount: integer('results_count'),
    executionTime: integer('execution_time_ms'),

    userId: uuid('user_id'),

    executedAt: timestamp('executed_at').defaultNow().notNull(),
});
