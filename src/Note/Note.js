import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiContext from "../ApiContext";
import config from "../config";
import "./Note.css";
import { format } from "date-fns";
import PropTypes from "prop-types";

export default class Note extends React.Component {

  static propTypes = {
    history: PropTypes.shape({
      push: () => { }
    }).isRequired,
  };

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;
    // this.context.deleteNote(noteId);


    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })
      .then(res => {

        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        // return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        //this.props.onDeleteNote(noteId);
        this.props.history.push('/notes')
      })

      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <Link to={`/edit/${id}`}>
          Edit Note
        </Link>
        {''}
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" />
          {" "}
          remove
        </button>
        <div className="Note_dates">
          <div className="Note_dates-modified">
            Modified{" "}
            <span className="Date">
              {modified ? format(new Date(Date.parse(modified)), "yyyy-MM-dd") : ""}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

