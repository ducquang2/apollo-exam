import { useQuery, gql } from "@apollo/client";

export default function Authors() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Author</h2>
            <DisplayAuthors />
        </main>
    );
}

const GET_AUTHORS = gql`
query GetTitles {
    books {
        author
    }
}
`

function DisplayAuthors() {
    const { loading, error, data } = useQuery(GET_AUTHORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error ${error.message}</p>

    return (
        <ul>
            {data.books.map((item: any, index: any) => <li key={index}> {item.author} </li>)}
        </ul>
    )

}