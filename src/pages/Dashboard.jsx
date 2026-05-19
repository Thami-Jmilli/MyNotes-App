import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      fetchNotes()
    } else {
      setLoading(false)
    }
  }, [user])

  async function fetchNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        })

      if (error) {
        console.error(
          'Fetch Notes Error:',
          error
        )
        setLoading(false)
        return
      }

      setNotes(data || [])
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  async function addNote(e) {
    e.preventDefault()

    if (!title || !content) return

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title,
          content,
          user_id: user.id,
        },
      ])
      .select()

    if (error) {
      console.error(
        'Add Note Error:',
        error
      )

      alert(error.message)

      return
    }

    if (data && data.length > 0) {
      setNotes([data[0], ...notes])
    }

    setTitle('')
    setContent('')
  }

  async function deleteNote(id) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(
        'Delete Note Error:',
        error
      )
      return
    }

    setNotes(
      notes.filter((note) => note.id !== id)
    )
  }

  const filtered = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div
        style={{
          padding: '20px',
          fontSize: '20px',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div className='app'>
      <div className='top-bar'>
        <h1>Cloud Notes</h1>

        <button onClick={signOut}>
          Logout
        </button>
      </div>

      <div className='dashboard-grid'>
        <form
          className='note-form'
          onSubmit={addNote}
        >
          <h2>Create Note</h2>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder='Note title'
          />

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder='Write your note...'
          />

          <button type='submit'>
            Save Note
          </button>
        </form>

        <div>
          <input
            className='search-input'
            placeholder='Search notes...'
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className='notes-grid'>
            {filtered.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='note-card'
              >
                <h3>{note.title}</h3>

                <p>{note.content}</p>

                <button
                  onClick={() =>
                    deleteNote(note.id)
                  }
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}