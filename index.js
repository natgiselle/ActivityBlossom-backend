//Need to npm install apollo-server

const { ApolloServer } = require('apollo-server');
const { MONGODB } = require('./config.js')
const mongoose = require('mongoose');
const typeDefs = require('./graphql/TypeDefs');
const resolvers = require('./graphql/resolvers');

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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