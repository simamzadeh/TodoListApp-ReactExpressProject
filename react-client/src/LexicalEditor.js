import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
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
                <RichTextPlugin
                    contentEditable={<ContentEditable/>}
                    placeholder={<Placeholder/>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/*<HistoryPlugin />*/}
                {/*<OnChangePlugin onChange={onChange} />*/}
            </div>
        </LexicalComposer>
    );
}

const Placeholder = () => {
    return (
        <div className="absolute top-[1.125rem] left-[1.125rem] opacity-50">
            Enter a to-do...
        </div>
    );
};

export function EditorWrapper() {
    return (
        <div
            id="editor-wrapper"
            className={
                'relative prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2'
            }
        >
            <Editor
                config={{
                    namespace: 'lexical-editor',
                    theme: {
                        root: 'p-4 border-slate-500 border-2 rounded h-full min-h-[200px] focus:outline-none focus-visible:border-black',
                        link: 'cursor-pointer',
                        text: {
                            bold: 'font-semibold',
                            underline: 'underline',
                            italic: 'italic',
                            strikethrough: 'line-through',
                            underlineStrikethrough: 'underlined-line-through',
                        },
                    },
                    onError: error => {
                        console.log(error);
                    },
                }}
            />
        </div>
    );
}