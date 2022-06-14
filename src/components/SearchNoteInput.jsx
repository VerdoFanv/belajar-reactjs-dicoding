export const SearchNoteInput = ({ onSearchNote }) => {
  return (
    <input type="text" placeholder="Cari catatan" className="search-note-input" onChange={(event) => onSearchNote(event.target.value)} />
  )
}