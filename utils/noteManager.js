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

  filterByTargetId(uuid) {
    return this.notes.filter(note => note.targetId == uuid)
  }

  filterByTargetId(uuid) {
    return this.notes.filter(note => note.planId == uuid)
  }
}

export default NoteManager