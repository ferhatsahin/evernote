import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';

import SidebarItem from '../SidebarItem';

import './style.scss'

class Sidebar extends Component {

  state = {
    addingNote: false,
    title: null
  }

  newNoteBtnClick = () => {
    this.setState(({ addingNote }) => ({ title: null, addingNote: !addingNote }));
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  onSubmitNewNote = () => {
    this.props.onSubmitNewNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  }

  selectNote = (note, index) => this.props.selectNote(note, index);
  
  deleteNote = (note) => this.props.deleteNote(note);

  getNotes = () => {
    const { notes, selectedNoteIndex } = this.props
    return notes.map((note, index) => {
      return(
        <div key={index}>
          <SidebarItem
            note={note}
            index={index}
            selectedNoteIndex={selectedNoteIndex}
            selectNote={this.selectNote}
            deleteNote={this.deleteNote}
            />
          <Divider/>
        </div>
      )
    })
  }

  render() {
    const { notes } = this.props;
    const { addingNote } = this.state;
    const newBtnText = addingNote ? 'Cancel' : 'New Note';

    if(!notes) return null;
    const noteItems = this.getNotes();
    return (
      <div className="sidebar-container">
       <Button
         onClick={this.newNoteBtnClick}
         className="new-note-btn">{newBtnText}</Button>
         {addingNote && 
           <div>
             <input type='text'
               className="new-note-input"
               placeholder='Enter note title'
               onKeyUp={this.updateTitle}>
             </input>
             <Button 
               className="new-note-submit-btn"
               onClick={this.onSubmitNewNote}>
                Submit Note
             </Button>
           </div>
         }
         <List>
           {noteItems}
         </List>
      </div>
    )
  }
}

export default Sidebar;
