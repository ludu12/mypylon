import {app, PylonConfig, ServiceError} from '@getcronit/pylon'
import {asc, eq} from "drizzle-orm";
import {db} from "./db";
import {Movie, movies} from "./schema";
import {useErrorHandler, useLogger} from '@envelop/core'

export const graphql = {
  Query: {
    // READ
    movies: async () => {
      return db
          .select()
          .from(movies)
          .orderBy(asc(movies.id)) // order by is mandatory
    }
  },
  Mutation: {
    // CREATE
    createMovie: async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
      const m = (await db.insert(movies).values({
        title: movie.title,
        releaseYear: movie.releaseYear
      }).returning())[0];

      return {
        id: m.id,
        title: m.title,
        releaseYear: m.releaseYear
      };
    },
    // UPDATE
    updateMovie: async (id: Movie['id'], movie: Omit<Movie, 'id'>): Promise<Movie> => {
      const r = await db.update(movies).set({
        title: movie.title,
        releaseYear: movie.releaseYear
      }).where(eq(movies.id, id)).returning();

      const m = r[0];

      if (!m) {
        throw new ServiceError(`Movie with ${id} not found.`, {code: "NOT_FOUND", statusCode: 404, details: {}})
      }

      return {
        id: m.id,
        title: m.title,
        releaseYear: m.releaseYear
      };
    },
    // DELETE
    deleteMovie: async (id: Movie['id']): Promise<Movie['id']> => {
      await db.delete(movies).where(eq(movies.id, id))
      return id;
    }
  }
}

app.use(async (c, next) => {
  console.log('HERE!!!!!!')
  await next()
})

export const config: PylonConfig = {
  plugins: [
    useErrorHandler(({errors, context, phase}) => {
      console.error(errors)
    }),
    useLogger({
      skipIntrospection: false,
      logFn: (eventName, args) => {
        console.log(eventName)
      }
    })
  ]
}

export default app
