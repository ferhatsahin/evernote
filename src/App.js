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
    })
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        ...noteObj,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  onSubmitNewNote = async (title) => {
    const { notes } = this.state
    const note = { title: title, body: '' };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        ...note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    this.setState({ notes: [...notes, note] }, () => {
      const newNoteIndex = notes.indexOf(notes.find(_note => _note.id === newID));
      this.setState({ selectedNote: notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
    });
  }

  deleteNote = async (note) => {
    const { notes, selectedNoteIndex } = this.state;
    const noteIndex = notes.indexOf(note);
    this.setState({ notes: notes.filter( noteItem => noteItem !== note) },() => {
      if(selectedNoteIndex === noteIndex) {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      } else {
        notes.length > 1 ?
        this.selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      }
    });
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
        onSubmitNewNote={this.onSubmitNewNote}/>
      { selectedNote &&
      <Editor 
      selectedNote={selectedNote}
      selectedNoteIndex={selectedNoteIndex}
      notes={notes}
      noteUpdate={this.noteUpdate}/>
      }
    </div>
    )
  }
}
