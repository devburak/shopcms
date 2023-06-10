import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

const MyEditor = ({ onContentChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new EditorJS({
      // Ayarlarınızı burada belirtin
      // ...
      onChange: () => {
        // Blok içeriği alın
        editor.save().then((outputData) => {
          // Blok içeriğini üst bileşene iletişim sağlamak için
          onContentChange(outputData);
        });
      },
    });

    // Editor.js örneğini ref'e atayın
    editorRef.current = editor;

    return () => {
      // Bileşen temizlendiğinde editor örneğini yok edin
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <TextField
        id="editorjs-container"
        variant="outlined"
        multiline
        rows={4}
        inputProps={{ style: { height: 'auto' } }}
        InputLabelProps={{ shrink: true }}
        placeholder="Blok içeriği buraya gelecek"
      />
    </div>
  );
};

export default MyEditor;
