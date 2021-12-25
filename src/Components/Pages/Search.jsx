import axios from "axios"
import React, {useState, useEffect} from "react"



const Search = () => {
    const [search, setsearch] = useState('')
    const [results, setresult] = useState()


    const searchbook = async (name) => {
        try {
            const query = name.split(" ").join('+')
            const api = await axios.get(`http://openlibrary.org/search.json?q=${query}`, {
            })
            setresult(api.data.docs)
        } catch (error) {
            console.error(error.message);

        }
    }

    useEffect(() => {
        if (search !== '')
            searchbook(search)
    }, [search])

    const ui = results?.map(ele =>

        <tr>
            <td>{ele.title}</td>
            <td>{ele.author_name ? ele.author_name : "N/A"}</td>
            <td>{ele.first_publish_year ? ele.first_publish_year : "N/A  "}</td>
        </tr>
    )
    return (
        <div className="search-result">
            <input type="search" placeholder="Search" value={search} onChange={(e) => setsearch(e.target.value)} autoFocus={true} />
            <h1>Search Result</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publish Year</th>
                    </tr>
                </thead>
                <tbody>
                    {ui}
                </tbody>
            </table>

        </div>
    )
}


export default Search