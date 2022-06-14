export const NoteList = ({ notes, onDeleteNotePressed, onArchiveNotePressed, dateFormatter }) => {
  return notes.length > 0 ? (
    notes.map((note) => (
      <article className="card" key={note.id}>
        <h1 className="card__title">{note.title}</h1>
        <p className="card__created-at">{dateFormatter(note.createdAt)}</p>
        <p className="card__body">{note.body}</p>
        <div className="card-action">
          <button type="button" className="card-action__delete" onClick={() => onDeleteNotePressed(note.id)}>hapus</button>
          <button type="button" className="card-action__archive" onClick={() => onArchiveNotePressed(note.id)}>arsipkan</button>
        </div>
      </article>
    ))
  ) : (
    <h1 className="text-muted">Tidak ada catatan</h1>
  )
}