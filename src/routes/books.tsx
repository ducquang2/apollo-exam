import { useQuery, gql } from "@apollo/client";

export default function Books() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Books</h2>
            <DisplayBooks />
        </main>
    );
}

const GET_BOOKS = gql`
query GetTitles {
    books {
        title
        author
    }
}
`

function DisplayBooks() {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error ${error.message}</p>

    return (
        <ul>
            {data.books.map((item: any, index: any) => <li key={index}> Title: {item.title}, Author: {item.author} </li>)}
        </ul>
    )

}