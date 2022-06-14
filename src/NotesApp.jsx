import { Header } from './components/Header'
import { Component } from 'react'
import { AddNoteInput } from './components/AddNoteInput'
import { Separator } from './components/Separator'
import { NoteList } from './components/NoteList'
import { showFormattedDate } from './utils/data'

export default class NotesApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      notesFilter: []
    }

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this)
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this)
    this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this)
  }

  searchNoteByQueryTitle(notes, query) {
    return notes.filter((note) => {
      const loweredCaseTitle = note.title.toLowerCase();
      const replaceName = loweredCaseTitle.replace(/\s/, '');

      const loweredCaseQuery = query.toLowerCase();
      const replaceQuery = loweredCaseQuery?.replace(/\s/, '');

      return replaceName.indexOf(replaceQuery) !== -1;
    })
  }

  setArchivedToNote(notes, id) {
    return notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived
        }
      }
     
      return { ...note }
    })
  }

  onSearchNoteHandler(query) {
    const notesFilter = this.searchNoteByQueryTitle(this.state.notes, query)
    this.setState({ notesFilter })
  }

  onArchiveNoteHandler(id) {
    const notes = this.setArchivedToNote(this.state.notes, id)
    const notesFilter = this.setArchivedToNote(this.state.notesFilter, id)

    this.setState({ notes, notesFilter })
  }

  onDeleteNoteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id)
    const notesFilter = this.state.notesFilter.filter((note) => note.id !== id)

    this.setState({ notes, notesFilter })
  }

  onAddNoteHandler({ title, body }) {
    this.setState((state) => ({
      notes: [
        ...state.notes,
        {
          id: +new Date(),
          title,
          body,
          archived: false,
          createdAt: new Date().toISOString(),
        }
      ]
    }))
  }

  render() {
    return (
      <section className="notes-app">
        <Header onSearchNote={this.onSearchNoteHandler} />
        <div className="add-note-wrapper">
          <AddNoteInput onAddNote={this.onAddNoteHandler} titleCharMax={50} />
        </div>
        <Separator />
        <div className="note-list__wrapper">
          <p className="note-list__label">Catatan Yang Aktif</p>
          <div className="note-list__wrapper-grid">
            {this.state.notesFilter.length > 0 ? (
              <NoteList notes={this.state.notesFilter.filter((note) => note.archived === false)} onArchiveNotePressed={this.onArchiveNoteHandler} onDeleteNotePressed={this.onDeleteNoteHandler} dateFormatter={showFormattedDate} />
            ) : (
              <NoteList notes={this.state.notes.filter((note) => note.archived === false)} onArchiveNotePressed={this.onArchiveNoteHandler} onDeleteNotePressed={this.onDeleteNoteHandler} dateFormatter={showFormattedDate} />
            )}
          </div>
        </div>
        <div className="note-list__wrapper">
          <p className='note-list__label'>Catatan Yang Diarsipkan</p>
          <div className="note-list__wrapper-grid">
          {this.state.notesFilter.length > 0 ? (
            <NoteList notes={this.state.notesFilter.filter((note) => note.archived === true)} onArchiveNotePressed={this.onArchiveNoteHandler} onDeleteNotePressed={this.onDeleteNoteHandler} dateFormatter={showFormattedDate} />
          ) : (
            <NoteList notes={this.state.notes.filter((note) => note.archived === true)} onArchiveNotePressed={this.onArchiveNoteHandler} onDeleteNotePressed={this.onDeleteNoteHandler} dateFormatter={showFormattedDate} />
          )}
          </div>
        </div>
      </section>
    )
  }
}