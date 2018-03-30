import Note from '../models/Note'
import noteStore from '../store/noteStore'

class NoteManager {
  constructor(notes) {
    this.notes = null
    if (notes) {
      this.notes = notes
    } else {
      this.notes = noteStore.getNotes()
    }
  }
}

export default NoteManager