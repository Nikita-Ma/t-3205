import React, {useEffect} from 'react';
import './App.css';

function App() {
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('http://localhost:7575/')
            response = await response.json()
            console.log(response)
        }

        fetchMyAPI()
    }, [])
    return (
        <h1>Initial</h1>
    );
}

export default App;
