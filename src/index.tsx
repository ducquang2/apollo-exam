import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Titles from './routes/titles';
import Books from './routes/books';
import Authors from './routes/authors';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

// client.writeQuery({
//   query: gql`
//     query WriteBook($title: String!) {
//       books(title: $title) {
//         title
//         author
//       }
//     }
//   `,
//   data: {
//     books: {
//       __typename: 'Book',
//       title: 'Test',
//       author: 'Alo'
//     }
//   },
//   variables: {
//     title: 'Test'
//   }
// })

client.query({
  query: gql`
    query GetBooks {
      books {
        id
        title
        author
      }
    }
  `
}).then((result) => console.log(result))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/books" element={<Books />} />
            <Route path="/titles" element={<Titles />} />
            <Route path="/authors" element={<Authors />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
