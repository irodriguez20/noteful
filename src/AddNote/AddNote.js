import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ApiContext from "../ApiContext";
import config from "../config";
import "./AddNote.css";
import PropTypes from "prop-types";


export default class AddNote extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: () => { }
    }).isRequired,
  };
  static contextType = ApiContext;

  state = {
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, content, folderId } = e.target;
    const newNote = {
      name: name.value,
      content: content.value,
      folderid: folderId.value,
      modified: new Date()
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        console.log("newNote folderId", newNote.folderId);
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(note => {
        name.value = "";
        content.value = "";
        folderId.value = "";
        this.context.addNote(note);
        this.props.history.push('/');
      })
      .catch(error => {
        console.error({ error });
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state
    const { folders = [] } = this.context;
    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div className="field">
            <label htmlFor="note-name-input">
              Name
              {" "}
            </label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">
              Content
              {" "}
            </label>
            <textarea id="content" name="content" required />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">
              Folder
              {" "}
            </label>
            <select id="folderId" name="folderId" required>
              <option value={null}>...</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id} name="folderId">
                  {folder.folder_name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="submit">Add note</button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

AddNote.defaultProps = {
  history: PropTypes.Object
};
