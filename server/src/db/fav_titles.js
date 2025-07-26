import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const favTitle = pgTable('fav_titles', {
    id: uuid('id').defaultRandom().primaryKey(),
    trial_id: text('trial_id').notNull(),
});
