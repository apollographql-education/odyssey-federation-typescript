import { gql } from "graphql-tag";

export const typeDefs = gql`
extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@requires", "@external"])
  type Query {
    "Playlists hand-picked to be featured to all users."
    featuredPlaylists: [Playlist!]!
    "Retrieves a specific playlist."
    playlist(id: ID!): Playlist
  }
  type Recipe @key(fields: "id") {
    id: ID!
    "The name of the recipe"
    name: String! @external
    "A list of recommended playlists to accompany the recipe"
    recommendedPlaylists: [Playlist!]! @requires(fields: "name")
  }
  type Mutation {
    "Add one or more items to a user's playlist."
    addItemsToPlaylist(
      input: AddItemsToPlaylistInput!
    ): AddItemsToPlaylistPayload!
  }
  input AddItemsToPlaylistInput {
    "The ID of the playlist."
    playlistId: ID!
    "A comma-separated list of Spotify URIs to add."
    uris: [String!]!
  }
  type AddItemsToPlaylistPayload {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "The playlist that contains the newly added items"
    playlist: Playlist
  }
  "A curated collection of tracks designed for a specific activity or mood."
  type Playlist {
    "The ID for the playlist."
    id: ID!
    "The name of the playlist."
    name: String!
    "Describes the playlist, what to expect and entices the user to listen."
    description: String
    "The tracks of the playlist."
    tracks: [Track!]!
  }
  "A single audio file, usually a song."
  type Track {
    "The ID for the track."
    id: ID!
    "The name of the track"
    name: String!
    "The track length in milliseconds."
    durationMs: Int!
    "Whether or not the track has explicit lyrics (true = yes it does; false = no it does not OR unknown)"
    explicit: Boolean!
    "The URI for the track, usually a Spotify link."
    uri: String!
  }
`;
