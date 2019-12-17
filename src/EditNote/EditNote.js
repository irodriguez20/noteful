import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";

const Required = () => (<span className="UpdateNote_required">*</span>);

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
        folderId: 1,
        content: ""
    };


    componentDidMount() {
        const { noteId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `${noteId}`, {
            method: "GET"
        })
            .then(res => {
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
                    folderId: responseData.folderId,
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
        this.setState({ folderId: e.taret.value });
    };

    handleChangeContent = e => {
        this.setState({ content: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { noteId } = this.props.match.params;
        const { id, name, content, folderId, modified } = this.state;
        const updatedNote = { id, name, content, folderId, modified };
        console.log("date", updatedNote.modified);
        fetch(config.API_ENDPOINT + `${noteId}`, {
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
                this.context.updatedNote(updatedNote);
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
            folderId: newFields.folderId || "",
            modified: newFields.modified || ""
        });
    };

    handleClickCancel = () => {
        this.props.history.push("/");
    };

    render() {
        const { name, folderId, content, error } = this.state;
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
                            id="note-name-input"
                            name="note-name"
                            Required
                            value={name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="note-content-input">Content</label>
                        <textarea
                            id="note-content-input"
                            name="note-content"
                            Required
                            value={content}
                            onChange={this.handleChangeContent}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="note-folder-select">Folder</label>
                        <select
                            id="note-folder-select"
                            name="note-folder-id"
                            Required
                            onChange={this.handleChangeFolderId}
                        >
                            <option value={folderId}>...</option>
                            {folders.map(folder => (
                                <option key={folder.id} value={folder.id}>
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