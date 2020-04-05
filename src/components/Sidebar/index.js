import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../SidebarItem';

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

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;

    if(!notes) return null;
    return (
      <div className={classes.sidebarContainer}>
       <Button
         onClick={this.newNoteBtnClick}
         className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New Note'}</Button>
         {
           this.state.addingNote ? 
           <div>
             <input type='text'
               className={classes.newNoteInput}
               placeholder='Enter note title'
               onKeyUp={this.updateTitle}>
             </input>
             <Button 
               className={classes.newNoteSubmitBtn}
               onClick={this.onSubmitNewNote}>Submit Note</Button>
           </div> :
           null
         }
         <List>
           {
             notes.map((note, index) => {
               return(
                 <div key={index}>
                   <SidebarItem
                     note={note}
                     index={index}
                     selectedNoteIndex={selectedNoteIndex}
                     selectNote={this.selectNote}
                     deleteNote={this.deleteNote}/>
                   <Divider/>
                 </div>
               )
             })
           }
         </List>
      </div>
    )
  }
}

export default withStyles(styles)(Sidebar);
