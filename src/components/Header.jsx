import {SearchNoteInput} from './SearchNoteInput'

export const Header = ({ onSearchNote }) => {
  return (
    <section className="header">
      <h1 className="header__title">Verdo Notes</h1>
      <SearchNoteInput onSearchNote={onSearchNote} />
    </section>
  )
}