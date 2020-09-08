import React from "react";

export default class Task extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title: this.props.title,
      content: this.props.content,
      imageBase64String: this.props.imageBase64String,
      taskTitleEditing: false,
      taskContentEditing: false
    }
    this.editTaskTitle = this.editTaskTitle.bind(this)
    this.doneEditingTaskTitle = this.doneEditingTaskTitle.bind(this)
    this.editTaskContent = this.editTaskContent.bind(this);
    this.doneEditingTaskContent = this.doneEditingTaskContent.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps){
    let newProp = null;
    let key = null;
    if (this.props.title !== prevProps.title) {
      key = "title";
      newProp = this.props.title;
      this.setState({ [key]: newProp });
    } else if (this.props.content !== prevProps.content) {
      key = "content";
      newProp = this.props.content;
      this.setState({ [key]: newProp });
    } else if (this.props.imageBase64String !== prevProps.imageBase64String) {
      key = "imageBase64String";
      newProp = this.props.imageBase64String;
      this.setState({ [key]: newProp });
    }
  }

  editTaskTitle() {
    this.setState({ taskTitleEditing: true})
  }

  editTaskContent(){
    this.setState({taskContentEditing: true})
  }

  doneEditingTaskTitle(id, title, content, image) {
    const task = {
      id: id,
      title: title,
      content: content,
      imageBase64String: image,
    };
    this.props.changeItems(id, task)
    this.setState({ taskTitleEditing: false })
  }

  doneEditingTaskContent(id, title, content, image){
    const task = {
      id: id,
      title: title,
      content: content,
      imageBase64String: image,
    };
    this.props.changeItems(id, task)
    this.setState({ taskTitleEditing: false })
    this.setState({taskContentEditing: false})
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    const imageShow = (
      <div className="text-center">
        <img
          src={"data:image/png;base64," + this.state.imageBase64String}
          className="task-image rounded img-fluid img-thumbnail mb-3 mx-auto"
          alt={this.props.id}
          style={{ maxHeight: "7rem", margin: "auto" }}
        ></img>
      </div>
    );

    return (
      <div>
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
              className="btn btn-info btn-sm"
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
              className="btn btn-info btn-sm"
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
        {this.state.imageBase64String ? imageShow : <></>}
      </div>
    );
  }

}
