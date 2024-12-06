import {describe, expect, test} from 'bun:test'
// Make sure to run `bun run build` before running the tests
import app from './.pylon/index'

describe('GraphQL API', () => {
  test('Query.movies', async () => {
    const res = await app.request('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'query { movies { id title releaseYear } }'
      })
    })
    expect(res.status).toBe(200)
    const data = await res.json()
    console.log(data)
  })
})
