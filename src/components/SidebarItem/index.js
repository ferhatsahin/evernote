import React from 'react';
import classnames from 'classnames'
import ListItemText from '@material-ui/core/ListItemText';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { removeHTMLTags } from '../../helpers';

import './style.scss'

class SidebarItem extends React.Component {

  selectNote = (note, index) => this.props.selectNote(note, index);
  deleteNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  }

  render() {
    const { index, note, selectedNoteIndex } = this.props;
    const isSelected = index === selectedNoteIndex;

    return(
      <div key={index} className="sidebaritem-wrapper">
        <li className={classnames('list-item',{'list-item-selected': isSelected})}>
            <div 
              className="text-section"
              onClick={() => this.selectNote(note, index)}>
                <ListItemText
                  primary={note.title}
                  secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}/>
            </div>
            <RemoveCircleOutlineIcon onClick={() => this.deleteNote(note)}
              className="delete-icon"/>
        </li>
      </div>
    );
  }

}

export default SidebarItem;