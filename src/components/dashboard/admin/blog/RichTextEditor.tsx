import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@/root/ckeditor5/build/ckeditor";


type RichTextEditorProps = {
  onContentChange: (content: string) => void;
  initialContent?: string;
};

const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "bold",
      "italic",
      "strikethrough",
      "underline",
      "superscript",
      "subscript",
      "link",
      "bulletedList",
      "numberedList",
      "todoList",
      "fontColor",
      "fontFamily",
      "fontSize",
      "fontBackgroundColor",
      "|",
      "outdent",
      "indent",
      "|",
      "imageInsert",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "alignment",
      "findAndReplace",
      "selectAll",
      "highlight",
      "removeFormat",
      "specialCharacters",
      "restrictedEditingException",
      "accessibilityHelp",
    ],
  },
  language: "sk",
  image: {
    toolbar: [
      "imageTextAlternative",
      "toggleImageCaption",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  removePlugins: ["Title"],
  placeholder: "",
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
        config={editorConfig}
        editor={Editor as any}
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
