import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    company: text('company').notNull(),
    designation: text('designation').notNull(),
    contact: text('contact').notNull(),
    country: text('country').notNull(),
    region: text('region').notNull(),
    sex: text('sex').notNull(),
    age: text('age').notNull(),
    plan: text('plan').notNull(),
});

export * from './trials.js';
export * from './savedQueries.js';
