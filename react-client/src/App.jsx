import React, {Component, useEffect, useState} from "react";
import './App.css';
import Editor from "./LexicalEditor";
import "./styles.css";
import TextEditorForm from "./TextEditorForm";
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

    const onSaveText = (lexicalContext) => {

        fetch('http://localhost:9000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lexicalContext }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Text saved successfully');
                } else {
                    console.error('Error saving text');
                }
            })
            .catch((error) => {
                console.error('Network error', error);
            });
    };

    return (
        <div className="App">
            <h1>Write your todo here!</h1>
            {/*<p>A place to write your to-do's!</p>*/}
            {/*<Editor/>*/}
            <TextEditorForm onSaveText={onSaveText} />
            {/*<input onChange={(e)=>console.log(e.target.value)}/>*/}
            <p className="App-intro">{apiResponse}</p>
        </div>
    );
}

export default App;
