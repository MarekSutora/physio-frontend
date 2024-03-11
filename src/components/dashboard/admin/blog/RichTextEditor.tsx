// RichTextEditor.tsx
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editorConfiguration = {
  //TODO adjust this configuration
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
  initialContent?: string;
};

const RichTextEditor = ({
  onContentChange,
  initialContent = "",
}: RichTextEditorProps) => {
  return (
    <div className="m-auto h-[500px] w-full overflow-y-visible">
      <style>
        {`.ck-editor__editable {
    max-height: 460px;
    height: 460px
}`}
      </style>

      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={initialContent}
        onChange={(event, editor) => {
          const data = editor.getData();
          onContentChange(data);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
