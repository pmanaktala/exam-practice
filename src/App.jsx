import {useEffect, useState} from 'react'
import './App.css'

function App() {
    //Any needed hooks

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [successText, setSuccessText] = useState("");
    const [result, setResult] = useState("");

    //Functions for API
    //upload

    const upload = (event) => {

        event.preventDefault();
        const data = {
            "name": name,
            "url": url
        }

        console.log(JSON.stringify(data));

        fetch("http://localhost:3001/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response)
            .then((response) => {
                setSuccessText("Animal Added!");
            });
    }
    //search

    const search = (event) => {
        event.preventDefault();

        fetch(`http://localhost:3001/search/${searchTerm}`)
            .then((response) => response.json())
            .then((response) => {
                setResult(response);
            });
    }
    //clear

    const clear = () => {
        fetch("http://localhost:3001/delete", {
            method: "DELETE",
        })
            .then((response) => response)
            .then((response) => {
                setSuccessText("Deleted");
            });
    }

    return (
        <div className="App">
            <h1>Animal Collection</h1>
            <h3>Add Animal</h3>

            {successText && (<p>{successText}</p>)}

            <form onSubmit={upload}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    required
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                />
                <label htmlFor="recipe_description">Address</label>
                <input
                    id="url"
                    required
                    type="text"
                    onChange={(event) => setUrl(event.target.value)}
                />

                <input type="submit" value="Add Recipe"/>
            </form>

            <h3>Search Animal</h3>

            <form onSubmit={search}>
                <label htmlFor="name">Name</label>
                <input
                    id="search"
                    required
                    onChange={(event) => setSearchTerm(event.target.value)}
                    type="text"
                />

                <input type="submit" value="Search"/>
            </form>
            {/* Search Animal contents */}

            <p>
                {result && (<p>
                    <section>{result.name}</section>
                    <section>
                        <img src={result.url} height={200} alt="Animal Image"/>
                    </section>
                </p>)}
            </p>


            {<button onClick={clear}>Clear Database</button> }

        </div>
    )
}

export default App;

//npm run dev to start React app and Express server

