import React from "react";

export default class TaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      content: this.props.description,
      imageBase64String: this.props.imageBase64String,
      taskTitleEditing: false,
      taskContentEditing: false,
    };
    this.editTaskTitle = this.editTaskTitle.bind(this);
    this.doneEditingTaskTitle = this.doneEditingTaskTitle.bind(this);
    this.editTaskContent = this.editTaskContent.bind(this);
    this.doneEditingTaskContent = this.doneEditingTaskContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }

  editTaskTitle() {
    this.setState({ taskTitleEditing: true });
  }

  editTaskContent() {
    this.setState({ taskContentEditing: true });
  }

  doneEditingTaskTitle(id, title, content, image) {
    const task = {
      id: id,
      title: title,
      content: content,
      imageBase64String: image,
    };
    this.props.changeItems(id, task);
    this.setState({ taskTitleEditing: false });
  }

  doneEditingTaskContent(id, title, content, image) {
    const task = {
      id: id,
      title: title,
      content: content,
      imageBase64String: image,
    };
    this.props.changeItems(id, task);
    this.setState({ taskTitleEditing: false });
    this.setState({ taskContentEditing: false });
  }

  loadFile(fileUrl) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

      this.setState({ imageBase64String: base64String });
      this.doneEditingTaskContent(this.props.id, this.state.title, this.state.content, base64String);
    };
    reader.readAsDataURL(fileUrl);
  }

  handleClickDelete(event) {
    this.setState({ imageBase64String: "" });
    this.doneEditingTaskContent(this.props.id, this.state.title, this.state.content, "");
  }

  handleChange(event) {
    if (event.target.id === "image") {
      if (event.target.files && event.target.files[0]) {
        this.loadFile(event.target.files[0]);
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const imageAttach = (
      <div className="input-group mt-2 mb-3">
        <div className="custom-file">
          <input
            type="file"
            accept="image/*"
            className="custom-file-input"
            id="image"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
          <label className="custom-file-label" htmlFor="image">
            Choose Image
          </label>
        </div>
      </div>
    );

    const imageShow = (
      <div>
        <button type="button" className="close pink-hover" id={this.props.id} onClick={this.handleClickDelete}>
          <span>&times;</span>
        </button>
        <img
          src={"data:image/png;base64," + this.state.imageBase64String}
          className="task-image rounded img-fluid img-thumbnail"
          alt={this.props.id}
        ></img>
      </div>
    );

    return (
      <div className="backdrop d-flex">
        <div className="modal-contents m-auto bg-white border rounded p-3 task-modal">
          <div className="d-flex justify-content-end">
            <div onClick={this.props.closeModal}><i className="far fa-times-circle modal-close"></i></div>
          </div>
          {this.state.taskTitleEditing ? (
            <div>
              <input
                name="title"
                type="text"
                className="w-100 border-noborder"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <button
                onClick={() =>
                  this.doneEditingTaskTitle(
                    this.props.id,
                    this.state.title,
                    this.state.content,
                    this.state.imageBase64String
                  )
                }
              >
                Done
              </button>
            </div>
          ) : (
            <h6 onClick={this.editTaskTitle}>{this.state.title}</h6>
          )}
          {this.state.taskContentEditing ? (
            <div>
              <input
                name="content"
                type="text"
                className="w-100 border-noborder"
                value={this.state.content}
                onChange={this.handleChange}
              />
              <button
                onClick={() =>
                  this.doneEditingTaskContent(
                    this.props.id,
                    this.state.title,
                    this.state.content,
                    this.state.imageBase64String
                  )
                }
              >
                Done
              </button>
            </div>
          ) : (
            <p onClick={this.editTaskContent}>{this.state.content}</p>
          )}
          {this.state.imageBase64String ? imageShow : imageAttach}
        </div>
      </div>
    );
  }
}
