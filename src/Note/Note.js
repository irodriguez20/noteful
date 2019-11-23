import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiContext from "../ApiContext";
import config from "../config";
import "./Note.css";
import { format } from "date-fns";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => { },
    history: {
      push: () => { }
    }

  };
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    console.log('in handle click delete');
    debugger;
    this.props.onDeleteNote(this.props.id);

    // fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    //   method: "DELETE",
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
    //   .then(res => {
    //     if (!res.ok) return res.json().then(e => Promise.reject(e));
    //     return res.json();
    //   })
    //   .then(() => {
    //     this.context.deleteNote(noteId);
    //     // allow parent to perform extra behaviour
    //     this.props.onDeleteNote(noteId);
    //     this.props.history.goBack()
    //   })

    //   .catch(error => {
    //     console.error({ error });
    //   });
  };

  render() {
    const { name, id, modified } = this.props;
    console.log('props id in render', this.props.id)
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note_dates">
          <div className="Note_dates-modified">
            Modified{" "}
            <span className="Date">
              {format(new Date(modified), "yyyy-MM-dd")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Note.defaultProps = {
  onDeleteNote: PropTypes.func
};
