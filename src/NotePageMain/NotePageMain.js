import React, { Component } from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'


export default class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push('/')
  }

  render() {
    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    console.log('notePageMain noteId in render', noteId)
    // debugger
    const note = findNote(notes, noteId) || { content: '' }
    console.log('note in notepagemain', note)
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          content={note.content}
          onDeleteNote={this.handleDeleteNote}
          history={this.props.history}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}