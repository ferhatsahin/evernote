import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Editor extends Component {

  state = {
    id: null,
    title:'',
    text: ''
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };
  updateTitle = async (e) => {
    const title = e.target.value
    await this.setState({ title });
    this.update();
  }
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);


  render() {
    const { classes : { editorContainer , editIcon, titleInput} } = this.props;
    const { title, text } = this.state;

    return(
      <div className={editorContainer}>
        <BorderColorIcon className={editIcon}></BorderColorIcon>
        <input
          className={titleInput}
          placeholder='Note title...'
          value={title || ''}
          onChange={this.updateTitle}>
        </input>
        <ReactQuill 
          value={text} 
          onChange={this.updateBody}>
        </ReactQuill>
      </div>
    );
  }
}

export default withStyles(styles)(Editor)