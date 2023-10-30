import React, { useState } from 'react';

function TextEditorForm({ onSaveText }) {
    const [lexicalContext, setLexicalContext] = useState('');

    const handleInputChange = (e) => {
        setLexicalContext(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveText(lexicalContext);
        // Clear the input field or perform any other actions you need.
        setLexicalContext('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your lexical context"
                value={lexicalContext}
                onChange={handleInputChange}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default TextEditorForm;
