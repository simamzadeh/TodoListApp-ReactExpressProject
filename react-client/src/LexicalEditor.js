import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import editorConfig from "./editorConfig";
import onChange from "./onChange";

export default function Editor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <PlainTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
            </div>
        </LexicalComposer>
    );
}

function Placeholder() {
    return <div className="editor-placeholder">Enter some plain text...</div>;
}