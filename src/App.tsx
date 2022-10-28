// Import everything needed to use the `useQuery` hook
import { gql, useQuery } from '@apollo/client';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
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

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_TITLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.message}</p>;

  return (
    <div>
      <h1>Books:</h1>
      <nav style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}>
          <Link to="/titles">Titles</Link> |{" "}
          <Link to="/authors">Authors</Link>
        </nav>
        <Outlet />
      {/* <ul>
        {data.books.map((item: any, index: any) => <li key={index}> {item.title} </li>)}
      </ul> */}
    </div>
  )
}