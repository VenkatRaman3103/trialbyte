import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const selectedTrials = pgTable('selected_trials', {
    id: uuid('id').defaultRandom().primaryKey(),
    trial_id: text('trial_id').notNull(),
});
