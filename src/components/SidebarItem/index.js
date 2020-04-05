import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../../helpers';

class SidebarItem extends React.Component {

  selectNote = (note, index) => this.props.selectNote(note, index);
  deleteNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  }

  render() {
    const { index, note, selectedNoteIndex, classes : { listItem, textSection, deleteIcon } } = this.props;
    const isSelected = index === selectedNoteIndex;

    return(
      <div key={index}>
        <ListItem
          className={listItem}
          selected={isSelected}
          alignItems='flex-start'>
            <div 
              className={textSection}
              onClick={() => this.selectNote(note, index)}>
                <ListItemText
                  primary={note.title}
                  secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}/>
            </div>
            <DeleteIcon onClick={() => this.deleteNote(note)}
              className={deleteIcon}/>
        </ListItem>
      </div>
    );
  }

}

export default withStyles(styles)(SidebarItem);