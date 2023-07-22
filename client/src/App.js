import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { // add
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; //add
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({ // added
  uri: '/graphql',
});

const client = new ApolloClient({ // added
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}> //added
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<SearchBooks />}
            />
            <Route
              path='/saved'
              element={<SavedBooks />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>

        </>
      </Router>
    </ApolloProvider> // added
  );
}

export default App;
