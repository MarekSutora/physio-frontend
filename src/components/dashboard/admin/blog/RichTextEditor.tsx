// RichTextEditor.tsx
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "insertImage",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

type RichTextEditorProps = {
  onContentChange: (content: string) => void;
};

const RichTextEditor = ({ onContentChange }: RichTextEditorProps) => {
  return (
    <div className="m-auto w-[800px]">
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        onChange={(event, editor) => {
          const data = editor.getData();
          onContentChange(data);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
