import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import debounce from '../../helpers'

import './style.scss'

class Editor extends Component {

  state = {
    id: null,
    title:'',
    text: ''
  }

  componentDidMount = () => {
    const { id, title, body : text} = this.props.selectedNote
    this.setState({ text, title, id });
  }

  componentDidUpdate = () => {
    const { id, title, body : text} = this.props.selectedNote
    if(id !== this.state.id) {
    this.setState({ text, title, id });
    }
  }

  bodyOnChange = val => {
    this.setState({ text: val }, () => this.update());
  };

  titleOnChange = e => {
    const title = e.target.value
    this.setState({ title }, () => this.update() );
  }

  update = debounce(() => {
    const { id, title, text: body} = this.state
    this.props.noteUpdate( id, { title, body })
}, 1500);


  render() {
    const { title, text } = this.state;

    return(
      <div className="editor-container">
        <BorderColorIcon className="edit-icon"></BorderColorIcon>
        <input
          className="title-input"
          placeholder='Note title...'
          value={title || ''}
          onChange={this.titleOnChange}>
        </input>
        <ReactQuill 
          value={text} 
          onChange={this.bodyOnChange}/>
      </div>
    );
  }
}

export default Editor