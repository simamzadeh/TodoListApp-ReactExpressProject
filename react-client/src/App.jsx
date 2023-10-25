import React, {Component, useEffect, useState} from "react";
import './App.css';
import Editor from "./LexicalEditor";
import "./styles.css";
import userEvent from "@testing-library/user-event";


const App = () => {
    const [apiResponse, setApiResponse] = useState("");

    const callAPI = () => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        callAPI()
    }, []);

    return (
        <div className="App">
            <h1>Lexical Text Editor</h1>
            <p>A place to write your to-do's!</p>
            <Editor/>
            {/*<input onChange={(e)=>console.log(e.target.value)}/>*/}
            <p className="App-intro">{apiResponse}</p>
        </div>
    );
}

export default App;
