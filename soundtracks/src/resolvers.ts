import { Resolvers } from "./types";

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
    __resolveReference: ({ id, name }) => {
      return {
         id,
         name
      };
    },
    recommendedPlaylists: (parent, args, contextValue, info) => {
      console.log({parent})
      const playlists = [
        { id: "1", name: "Rock n' Roll", description: "A rock n' roll playlist", tracks: { items: [] } = { items: []} },
        { id: "2", name: "Pop", description: "A pop playlist", tracks: { items: [] } = { items: [] } },
      ];
      return playlists;
    }
  }
};
