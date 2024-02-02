import { ApolloServer } from "@apollo/server";
import { SpotifyAPI } from "./datasources/spotify-client";
import { resolvers } from "./resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { buildSubgraphSchema } from '@apollo/subgraph';

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }])
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          spotifyAPI: new SpotifyAPI({ cache }),
        },
      };
    },
  });
  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
