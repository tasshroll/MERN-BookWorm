const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes'); // remove
const { ApolloServer } = require('apollo-server-express'); // added
const { typeDefs, resolvers } = require('./schemas'); // added
const { authMiddleware } = require('./utils/auth'); // added

const server = new ApolloServer({ // added
  typeDefs,
  resolvers,
  // Pass function authMiddleware to resolverrs so context is made available
  // to all resolvers to access the user data if the user is logged in
  context: authMiddleware, 
});
const PORT = process.env.PORT || 3001;
const app = express();

// apply middleware to our server to encode url data and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes); // replaced with Apollo server

app.get('*', (req, res) => { // add
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => { //add
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log (`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

startApolloServer(typeDefs, resolvers); // add
