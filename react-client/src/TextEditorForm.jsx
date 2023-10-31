import React, { useState } from 'react';

function TextEditorForm({ onSaveText }) {
    const [context, setContext] = useState('');

    const handleInputChange = (e) => {
        setContext(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveText(context);
        setContext('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your context"
                value={context}
                onChange={handleInputChange}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default TextEditorForm;
