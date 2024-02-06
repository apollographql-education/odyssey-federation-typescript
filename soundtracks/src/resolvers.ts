// import { GraphQLFieldResolver } from "graphql";
import { Resolvers } from "./types";

// type User = {
//   id: string;
//   name: string;
// }

// type Context = {
//   user: User
// }

// // Example
// gives you a Maybe Promise
// right above GraphQL codegen, or accessing spotify: let's talk about what goes into writing the types for resolvers
// const manualResolver: GraphQLFieldResolver<User, Context, {limit: number;}, User[]> = (parent, args, context, info) => {
//   return args.limit
// }

export const resolvers: Resolvers = {
  Query: {
    // Playlists hand-picked to be featured to all users.
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
    playlist: (_, { id }, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(id);
    },
  },
  Mutation: {
    async addItemsToPlaylist(_, { input }, { dataSources }) {
      try {
        const response = await dataSources.spotifyAPI.addItemsToPlaylist(input);
        if (response.snapshot_id) {
          return {
            code: 200,
            success: true,
            message: "Tracks added to playlist!",
            playlistId: response.snapshot_id,
          };
        } else {
          throw Error("snapshot_id property not found");
        }
      } catch (e) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${e}`,
          playlistId: null,
        };
      }
    },
  },
  AddItemsToPlaylistPayload: {
    playlist: ({ playlistId }, _, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(playlistId);
    },
  },
  Playlist: {
    tracks: (parent) => {
      const { tracks } = parent;
      const { items = [] } = tracks;
      return items.map(({ track }) => track);
    },
  },
  Track: {
    durationMs: (parent) => {
      const { duration_ms: durationMs } = parent;
      return durationMs;
    },
  },
  Recipe: {
    /*
      GraphQL code gen doesn't do well with the @external field
      because it doesn't KNOW if the field is going to be there or not
      so it assumes worst case, it won't be

      You must pass the full object because we NEED those other fields
      we don't know what those might be at that point
      TS doesn't know either
    */
   /* We don't actually need this function; we're taking the data as it. We WOULD use this if we needed the key to look up something in
   our soundtracks db. but we're not doing that
   */
    __resolveReference: (reference) => {
      return reference
    },
    recommendedPlaylists: ({ name }, __, {dataSources}) => {
      return dataSources.spotifyAPI.search(name);
    }
  }
};
