import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
        federation: true,
        /*
          Default mapper doesnt work if you have anything defined as a custom mapper
          otherwise it'll toss GQL object "as-is" into the {T}
          Daniel doesn't want to ... use default mapping strategies
          We should strictly define what our maps are. 
        */
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
