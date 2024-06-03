"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  tablePlugin,
  imagePlugin,
  InsertImage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  linkPlugin,
} from "@mdxeditor/editor";

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        imagePlugin(),
        linkPlugin(),
        markdownShortcutPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <div className="divider h-[16px] w-[1px] border border-b-slate-100 border-l-slate-400 border-r-slate-100 border-t-slate-400 bg-black"></div>
              <BoldItalicUnderlineToggles />
              <div className="divider h-[16px] w-[1px] border border-b-slate-100 border-l-slate-400 border-r-slate-100 border-t-slate-400 bg-black"></div>
              <InsertImage />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
