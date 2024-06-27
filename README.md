# (Odyssey Course) Federation with TypeScript

Welcome to the starter code for **Federation with TypeScript**. You can find the [course lessons and instructions](https://apollographql.com/tutorials/federation-typescript) on Odyssey, [Apollo](https://apollographql.com)'s learning platform.

## How to use this repo

The course will walk you step by step on what to do. This codebase is the starting point of your journey!

In order to install and run the project locally, navigate into the `listings` directory and run:

```shell
npm install && npm run dev
```

Right now, `listings` is a GraphQL server returning listing and amenity data at `http://localhost:4000`. You can visit `http://localhost:4000` directly, or use [Apollo Sandbox](https://studio.apollographql.com/sandbox?endpoint=http://localhost:5059/graphql) to connect to the endpoint and send queries.

Try running this query:

```graphql
query GetFeaturedListings {
  featuredListings {
    id
    title
    description
    amenities {
      id
      name
      category
    }
  }
}
```

The `final` branch of this repo contains the final stage of the course, with all of the steps and code completed! If you get stuck, you can refer to it and compare your code.

## Getting Help

This repo is _not regularly monitored_.

For any issues or problems concerning the course content, please refer to the [Odyssey topic in our community forums](https://community.apollographql.com/tags/c/help/6/odyssey). You can also [join the Apollo Discord](https://discord.gg/graphos).
