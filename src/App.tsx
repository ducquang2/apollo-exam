// Import everything needed to use the `useQuery` hook
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <AddBook />
      <br />
      {/* <DisplayLocations /> */}
      <nav style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}>
        <Link to="/books">Books</Link> | {" "}
        <Link to="/titles">Titles</Link> |{" "}
        <Link to="/authors">Authors</Link>
      </nav>
      <Outlet />
    </div>
  );
}

const GET_TITLES = gql`
  query GetTitles {
    books {
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
mutation AddBook($id: ID, $title: String!, $author: String!) {
  addBook(id: $id, title: $title, author: $author) {
    id
    title
    author
  }
}
`

function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const client = useApolloClient()

  console.log(client.extract());
  
  const [addBook, { loading, error }] = useMutation(ADD_BOOK,
    { 
      update(cache, { data: { addBook } }) {
        console.log(cache.extract());
        cache.modify({
          fields: {
            books(existingBooks = []) {
              console.log(addBook);
              
              const newBookRef = cache.writeFragment({
                data: addBook,
                
                fragment: gql`
                  fragment NewBook on Book {
                    title
                    author
                  }
                `
              });
              return [...existingBooks, newBookRef];
            }
          }
        })
      }
    });



  if (loading) return <p>Submitting...</p>;
  if (error) console.log(error.message);
  

  return (
    <div>
      <h3>Add Book ?</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        addBook({variables: {
          id: 3,
          title: title,
          author: author
        },})
      }}>
        <p>
          <label>Title</label>
          <input
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </p>
        <p>
          <label>Author</label>
          <input
            name='author'
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </p>
        <button type='submit'>
          Add
        </button>
      </form>
    </div>
  );
}