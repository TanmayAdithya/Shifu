"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Color, TextStyle],
    content: `<h2>Hi there,</h2>
                <p>
                  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
                </p>
              <ul>
                <li>
                  That&apos;s a bullet list with one …
                </li>
                <li>
                  … or two list items.
                </li>
              </ul>
  <p>
    Isn&apos;t that great? <u>And all of that is</u> editable. But wait, there&apos;s more. Let&apos;s try a code block:
  </p>
  <pre><code class="language-css">body {
  display: none;
  }</code></pre>
  <p>
    I know, I know, this is impressive. It&apos;s only the tip of the iceberg though. Give it a try and click a little bit around. Don&apos;t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that&apos;s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>`,
  });

  return (
    <>
      <EditorContent
        id="editor-wrapper"
        className="prose-code:after:content=[''] text-md prose px-2 py-3 outline-none prose-headings:my-1 prose-p:my-1 prose-p:leading-relaxed prose-blockquote:my-1 prose-code:px-1 prose-code:before:content-[''] prose-ul:my-1 prose-li:my-1"
        editor={editor}
      />
    </>
  );
};

export default Tiptap;
