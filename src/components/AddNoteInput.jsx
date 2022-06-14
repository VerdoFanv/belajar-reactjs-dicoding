import {Component} from 'react'

export class AddNoteInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: '',
      titleCharMax: this.props.titleCharMax,
      titleCharLeft: 0
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.onBodyChange = this.onBodyChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  componentDidMount() {
    const { titleCharMax } = this.state
    this.setState((state) => ({ ...state, titleCharLeft: titleCharMax }))
  }

  onTitleChange(event) {
    const value = event.target.value
    const { titleCharMax } = this.state
    if (value.length <= titleCharMax) {
      this.setState((state) => ({ 
        ...state, 
        title: value, 
        titleCharLeft: titleCharMax - value.length 
      }))
    }
  }

  onBodyChange(event) {
    this.setState((state) => ({ ...state, body: event.target.value }))
  }

  onSubmitHandler(event) {
    event.preventDefault()
    this.props.onAddNote(this.state)
  }

  render() {
    return (
      <form className="add-note-input" onSubmit={this.onSubmitHandler}>
        <h1>Tambah Catatan</h1>
        <p className="add-note-input__char-left">Sisa karakter: {this.state.titleCharLeft}</p>
        <input className="add-note-input__title" type="text" placeholder="Ketikkan Judul" onChange={this.onTitleChange} value={this.state.title} />
        <textarea className="add-note-input__body" placeholder="Ketikkan Judul" onChange={this.onBodyChange}  />
        <button type="submit" className="add-note-input__submit">Tambah</button>
      </form>
    )
  }
}