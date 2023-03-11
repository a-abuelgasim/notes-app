import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NewNote } from './NewNote';
import { useLocalStorage } from './useLocalStorage';
import { NoteList } from './NoteList';
import { NoteLayout } from './NoteLayout';
import { Note } from './Note';
import { EditNote } from './EditNote';


// TYPES
export type Note = {
  id: string,
} & NoteData;
export type NoteData = {
  markdown: string;
  tags: Tag[];
  title: string;
}

export type RawNote = {
  id: string;
} & RawNoteData
export type RawNoteData = {
  markdown: string;
  tagIDs: string[];
  title: string;
}

export type Tag = {
  id: string;
  label: string;
}


// APP
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      const noteWithTag = { ...note, tags: tags.filter(tag => note.tagIDs.includes(tag.id)) } as any;
      delete noteWithTag.tagIDs;
      return noteWithTag as Note;
    })
  }, [notes, tags]);

  // FUNCTIONS
  // Add a new tag
  function addTag(newTag: Tag): void {
    setTags(prevTags => [...prevTags, newTag]);
  }

  // Update existing tag label
  function updateTag(id: string, label: string): void {
    setTags(prevTags => (prevTags.map(tag => {
      if (tag.id == id) return {...tag, label}
      return tag;
    })));
  }

  // Delete tag
  function deleteTag(id: string): void {
    setTags(prevTags => (prevTags.filter(tag => tag.id !== id)));
  }

  // Creat a new note
  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => ([
      ...prevNotes,
      {...data, id: uuid(), tagIDs: tags.map(tag => tag.id)},
    ]));
  }

  // Delete a note
  function onDeleteNote(id: string): void {
    setNotes(prevNotes => (prevNotes.filter(note => note.id !== id)));
  }

  // Update existing note
  function onUpdateNote(id: string, {tags, ...data}: NoteData) {
    setNotes(prevNotes => (prevNotes.map(note => {
        if (note.id === id) return {id, ...data, tagIDs: tags.map(tag => tag.id)}
        return note;
      })
    ))
  }


  return (
    <Container className="my-4">
      <Routes>
        <Route
            element={
              <NoteList
                  availableTags={tags}
                  onDeleteTag={deleteTag}
                  notes={notesWithTags}
                  onUpdateTag={updateTag}/>
            }
            path="/"/>

        <Route
            element={
              <NewNote
                  availableTags={tags}
                  onAddTag={addTag}
                  onSubmit={onCreateNote}/>
            }
            path="/new"/>

        <Route
            element={<NoteLayout notes={notesWithTags}/>}
            path="/:id">
          <Route
              element={<Note onDelete={onDeleteNote}/>}
              index />

          <Route
              element={
                <EditNote
                    availableTags={tags}
                    onAddTag={addTag}
                    onSubmit={onUpdateNote}/>
              }
              path="edit" />
        </Route>

        <Route
            element={<Navigate to="/"></Navigate>}
            path="*"/>
      </Routes>
    </Container>
  )
}

export default App
