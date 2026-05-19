import { motion } from 'framer-motion';

function NoteCard({ note, deleteNote }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      whileHover={{ y: -5 }}
      className='note-card'
      style={{ backgroundColor: note.color }}
    >
      <div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>

      <div className='note-footer'>
        <span className='tag'>{note.tag}</span>
        <small>{note.createdAt}</small>
      </div>

      <button
        className='delete-btn'
        onClick={() => deleteNote(note.id)}
      >
        Delete
      </button>
    </motion.div>
  );
}

export default NoteCard;
