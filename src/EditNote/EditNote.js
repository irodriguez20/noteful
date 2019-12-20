import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import { countNotesForFolder } from '../notes-helpers'
import './EditNote.css'

// const Required = () => (<span className="UpdateNote_required">*</span>);

class EditNote extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object
        }),
        history: PropTypes.shape({
            push: PropTypes.func
        }).isRequired,
    };

    static contextType = ApiContext;

    state = {
        error: null,
        id: "",
        name: "",
        modified: "",
        folderid: 1,
        content: ""
    };


    componentDidMount() {
        const { noteId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
            method: "GET",

        })
            .then(res => {
                console.log('in editNote', noteId)
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error));
                }
                return res.json();
            })
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    name: responseData.name,
                    modified: responseData.modified,
                    folderid: responseData.folderid,
                    content: responseData.content
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleChangeName = e => {
        this.setState({ name: e.target.value });
    };

    handleChangeModified = e => {
        this.setState({ modified: e.target.value });
    };

    handleChangeFolderId = e => {
        this.setState({ folderid: e.target.value });
    };

    handleChangeContent = e => {
        this.setState({ content: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { noteId } = this.props.match.params;
        const { id, name, content, folderid, modified } = this.state;
        const updatedNote = { id, name, content, folderid, modified };
        console.log("date", updatedNote.modified);
        fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
            method: "PATCH",
            body: JSON.stringify(updatedNote),
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => {
                if (!res.ok) return res.json().then(error => Promise.reject(error));
            })
            .then(() => {
                this.resetFields(updatedNote);
                this.context.updateNote(updatedNote);
                this.props.history.push("/");
            })
            .catch(error => {
                console.error({ error });
                this.setState({ error });
            });
    };

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || "",
            name: newFields.name || "",
            content: newFields.content || "",
            folderid: newFields.folderid || "",
            modified: newFields.modified || ""
        });
    };

    handleClickCancel = () => {
        this.props.history.push("/");
    };

    render() {
        const { name, folderid, content, error } = this.state;
        const { folders = [] } = this.context;
        return (
            <section className="UpdateNote">
                <h2>Update note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="UpdatedNote__form" role="alert">
                        {error && <p>{error.message}</p>}
                    </div>
                    <input
                        type='hidden'
                        name='id'
                    />
                    <div className="field">
                        <label htmlFor="note-name-input">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="note-content-input">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={this.handleChangeContent}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="note-folder-select">Folder</label>
                        <select
                            id="folderid"
                            name="folderid"
                            required
                            onChange={this.handleChangeFolderId}
                        >
                            <option value={folderid}>...</option>
                            {folders.map(folder => (
                                <option key={folder.id} value={folder.id} name="folderid">
                                    {folder.folder_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="buttons">
                        <button type="button" onClick={this.handleClickCancel}>
                            Cancel
            </button>
                        {" "}
                        <button type="submit">Update note</button>
                    </div>
                </NotefulForm>
            </section>
        );
    }
}

export default EditNote