
async function schema() {
  const res = await fetch("http://localhost:3000/graphql", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return await res.json()
}

async function query() {
  const res = await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: 'query { movies { id title releaseYear } }'
    })
  })

  return await res.json()
}

async function mutation() {
  const res = await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation CreateMovie($m: OmitInput!) { createMovie(movie:$m) { id, title, releaseYear } }`,
      variables: {
        m: { title:"Finding Nemo", releaseYear: 2003 }
      }
    })
  })

  return await res.json()
}

async function deleteMutation() {
  const res = await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation DeleteMovie($id: Number!) { deleteMovie(id:$id) }`,
      variables: {
        id: 13
      }
    })
  })

  return await res.json()
}

async function updateMutation() {
  const res = await fetch(" http://localhost:3000/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation CreateMovie($id: Number!, $m: OmitInput!) { updateMovie(id: $id, movie:$m) { id, title, releaseYear } }`,
      variables: {
        id: 10,
        m: { title:"Finding Nemo", releaseYear: 2003 }
      }
    })
  })

  return await res.json()
}


async function run(){
  const m = await updateMutation()
  console.log(m)
  //
  // const q = await query()
  // console.log(q)
}


run().then(() => process.exit(1))
