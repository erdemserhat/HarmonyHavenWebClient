import '@mdxeditor/editor/style.css'
import './articleWriting.css'
import DefaultMD  from "@/pages/navbar_pages/article-writing/DefaultMD.js";

import {
    diffSourcePlugin,
    markdownShortcutPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    KitchenSinkToolbar, MDXEditor
} from '@mdxeditor/editor'

export function ArticleWriting() {


    return (
        <div className="container">
            <MDXEditor className="mdx-editor"
                       onChange={console.log}
                       markdown= {DefaultMD}
                       plugins={[
                           quotePlugin(),
                           toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
                           listsPlugin(),
                           headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
                           linkPlugin(),
                           linkDialogPlugin(),
                           imagePlugin({
                               imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
                               imageUploadHandler: async () => Promise.resolve('https://picsum.photos/200/300')
                           }),
                           tablePlugin(),
                           thematicBreakPlugin(),
                           frontmatterPlugin(),
                           codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
                           codeMirrorPlugin({ codeBlockLanguages: { java:'java',js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', '': 'Unspecified' }}),
                           diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
                           markdownShortcutPlugin()


                       ]}
            />

        </div>

    );
}


