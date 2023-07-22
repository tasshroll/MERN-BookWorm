const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express'); // added
const { typeDefs, resolvers } = require('./schemas'); // added

const app = express();
const server = new ApolloServer({ // added
  typeDefs,
  resolvers,
})
const PORT = process.env.PORT || 3001;

// apply middleware to our server to encode url data and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

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
