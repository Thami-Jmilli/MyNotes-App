import { useState } from 'react';
import { motion } from 'framer-motion';

function AddNote({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Personal');
  const [color, setColor] = useState('#A7F3D0');

  const saveNote = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    addNote({
      title,
      content,
      tag,
      color,
    });

    setTitle('');
    setContent('');
    setTag('Personal');
  };

  return (
    <motion.div
      className='add-note'
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type='text'
        placeholder='Note title'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder='Write your thoughts...'
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <div className='controls'>
        <input
          type='text'
          placeholder='Tag'
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />

        <input
          type='color'
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </div>

      <button onClick={saveNote}>
        Add Note
      </button>
    </motion.div>
  );
}

export default AddNote;
