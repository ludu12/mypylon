import { pgTable, integer, serial, text } from "drizzle-orm/pg-core";
import {InferSelectModel} from "drizzle-orm";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  releaseYear: integer("release_year"),
});

export type Movie = InferSelectModel<typeof movies>;
