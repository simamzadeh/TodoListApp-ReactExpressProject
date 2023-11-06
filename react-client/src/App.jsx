import React, { useEffect, useState} from "react";
import './App.css';
import "./styles.css";
import "@cloudscape-design/global-styles/index.css"
import "@cloudscape-design/components/textarea"
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

    const onSaveText = (title, context) => {
        const todo = {
          title: title,
          context: context,
        };

        // console.log(todo)
        fetch('http://localhost:9000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Text saved successfully');
                    console.log(response);
                } else {
                    console.error('Error saving text');
                    console.log(response);
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
