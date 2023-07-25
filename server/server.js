const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes'); // remove
const { ApolloServer } = require('apollo-server-express'); // added
const { typeDefs, resolvers } = require('./schemas'); // added
const { authMiddleware } = require('./utils/auth'); // added

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Pass authMiddleware to the context
});
const PORT = process.env.PORT || 3001;

// apply middleware to our server to encode url data and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes); // replaced with Apollo server

// Replace app.use(routes) with a single route that serves the client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => { //add
  await server.start();
  server.applyMiddleware({ app });
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

// start the Apollo server
startApolloServer(); // add
