import React, { Component } from 'react'
import firebase from 'firebase/app'

import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

import './app.css'

export default class App extends Component {

  state = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null
  }

  componentDidMount(){
    firebase
    .firestore()
    .collection('notes')
    .onSnapshot( serverUpdate => {
      const notes = serverUpdate.docs.map( doc => ({ id: doc.id, ...doc.data()}))
      this.setState({ notes })
      console.log(notes)
    })
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }
  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  render() {
    const { notes, selectedNoteIndex, selectedNote } = this.state;
    return (
      <div className="app-container">
      <Sidebar 
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={this.deleteNote}
        selectNote={this.selectNote}
        newNote={this.newNote}/>
      {
        selectedNote ?
        <Editor selectedNote={selectedNote}
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        noteUpdate={this.noteUpdate}/>
        : null
      }
    </div>
    )
  }
}
