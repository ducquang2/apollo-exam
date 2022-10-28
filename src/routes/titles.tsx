import { useQuery, gql } from "@apollo/client";

export default function Titles() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Title</h2>
            <DisplayTitles />
        </main>
    );
}

const GET_TITLES = gql`
query GetTitles {
    books {
        title
    }
}
`

function DisplayTitles() {
    const { loading, error, data } = useQuery(GET_TITLES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error ${error.message}</p>

    return (
        <ul>
            {data.books.map((item: any, index: any) => <li key={index}> {item.title} </li>)}
        </ul>
    )

}