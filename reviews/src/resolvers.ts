import { Resolvers } from './types'

export const resolvers: Resolvers = {
  Query: {
    allReviews: async (_, __, {dataSources}) => {
      return dataSources.reviewsDb.getAllReviews();
    },
  },
  Mutation: {
    submitReview: async (_, {listingId, review}, {dataSources} ) => {
      const { text, rating } = review;
      const submittedReview = await dataSources.reviewsDb.createReviewForListing({ listingId, text, rating})

      return {
        code: 200,
        success: true,
        message: 'Review successfully submitted',
        review: submittedReview
      }
    }
    },
    Listing: {
      __resolveReference: (representation) => {
        return representation;
      },
      reviews: ({ id }, _, {dataSources}) => {
        return dataSources.reviewsDb.getReviewsByListing(id);
      },
      overallRating: ({ id }, _, { dataSources }) => {
        return dataSources.reviewsDb.getOverallRatingForListing(id);
      }
    }
};