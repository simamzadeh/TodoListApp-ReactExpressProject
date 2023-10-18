import React from "react";
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import editorConfig from "./editorConfig";
import onChange from "./onChange";

export default function Editor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input"/>}
                    placeholder={<Placeholder/>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={onChange} />
            </div>
        </LexicalComposer>
    );
}

const Placeholder = () => {
    return (
        <div className="editor-placeholder">
            Enter a to-do...
        </div>
    );
};
