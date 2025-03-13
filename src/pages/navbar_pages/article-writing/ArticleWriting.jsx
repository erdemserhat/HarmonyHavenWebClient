import '@mdxeditor/editor/style.css'
import './articleWriting.css'

import {
    MDXEditor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    BlockTypeSelect,
    ChangeCodeMirrorLanguage,
    CreateLink,
    linkDialogPlugin,
    InsertCodeBlock,
    Button,
    codeBlockPlugin,
    codeMirrorPlugin,
    sandpackPlugin,
    InsertSandpack,
    ConditionalContents,
    ShowSandpackInfo,
    quotePlugin,
    Separator,
    linkPlugin,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
    imagePlugin,
    InsertImage,
    tablePlugin,
    InsertTable,
    headingsPlugin,
    ChangeAdmonitionType, markdownShortcutPlugin, CodeToggle, Select, InsertFrontmatter, thematicBreakPlugin
} from '@mdxeditor/editor'
import Editor from "react-markdown-editor-lite";

export function ArticleWriting() {


    return (
        <MDXEditor className="mdx-editor"
            onChange={console.log}
            markdown="hello world"
            plugins={[
                // the default code block language to insert when the user clicks the "insert code block" button
                diffSourcePlugin({diffMarkdown: 'An older version', viewMode: 'rich-text'}),
                codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
                quotePlugin(),
                headingsPlugin(),
                linkPlugin(),
                thematicBreakPlugin(),
                tablePlugin(),
                markdownShortcutPlugin(),
                linkDialogPlugin(),
                imagePlugin({
                    imageUploadHandler: () => {
                        return Promise.resolve('https://picsum.photos/200/300')
                    },
                    imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
                }),

                codeMirrorPlugin({codeBlockLanguages: {js: 'JavaScript', css: 'CSS', kotlin: 'Kotlin'}, defaultCodeBlockLanguage: 'javascript'}),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <DiffSourceToggleWrapper>
                                <UndoRedo/>
                                <Separator/>
                                <BoldItalicUnderlineToggles />
                                <Separator/>
                                <CodeToggle/>
                                <BlockTypeSelect/>
                                <Separator/>
                                <InsertImage/>
                                <Separator/>
                                <InsertCodeBlock/>
                                <Separator/>
                                <InsertTable />
                                <Separator/>
                                <CreateLink/>
                                <BlockTypeSelect/>

                            </DiffSourceToggleWrapper>

                        </>


                    )
                })
            ]}
        />
    );
}
