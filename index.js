//Need to npm install apollo-server

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/TypeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB, PORT } = require('./config');

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  formatError: (err) => {
    // Don't expose internal server errors to clients
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    // Return the original error for all others
    return err;
  },
  plugins: [
    {
      requestDidStart: () => ({
        willSendResponse(requestContext) {
          // Log any errors that occur
          const errors = requestContext.response.errors;
          if (errors) {
            console.error('GraphQL Errors:', errors);
          }
        }
      })
    }
  ]
});

// Connect to MongoDB and start server
mongoose.connect(MONGODB)
  .then(() => {
    console.log('📦 Connected to MongoDB');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`🚀 Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });