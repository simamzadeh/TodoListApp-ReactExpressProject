import React, { useState, useEffect } from 'react';

function TodoLists() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos(); // Fetch todos when the component mounts
    }, []);

    const fetchTodos = () => {
        fetch('http://localhost:9000/items') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error('Error fetching todos:', error));
    };

    return (
        <div>
            <h2>Current Todo Lists</h2>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo.lexicalContext}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoLists;
