import React, {Component, useEffect, useState} from "react";
import './App.css';
import Editor from "./LexicalEditor";
import "./styles.css";
import TextEditorForm from "./TextEditorForm";
import TodoLists from "./TodoLists";
import "@cloudscape-design/global-styles/index.css"
import "@cloudscape-design/components/textarea"
import userEvent from "@testing-library/user-event";
import TodoListForm from "./CloudscapeTodoListForm";


const App = () => {
    const [apiResponse, setApiResponse] = useState("");
    const callAPI = () => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setApiResponse(res))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        callAPI()
    }, []);

    const onSaveText = (context) => {

        fetch('http://localhost:9000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ context }),
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
            <TodoListForm onSaveText={onSaveText} />
            <p className="App-intro">{apiResponse}</p>
        </div>
    );
}

export default App;
