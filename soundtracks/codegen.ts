import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
        federation: true,
        mappers: {
          Playlist: "./models#PlaylistModel",
          Track: "./models#TrackModel",
          AddItemsToPlaylistPayload: "./models#AddItemsToPlaylistPayloadModel",
          Recipe: "./models#RecipeModel"
        },
      },
    },
  },
};

export default config;