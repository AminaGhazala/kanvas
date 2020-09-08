import React from "react";
import TaskCard from "./TaskCard";

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "lightblue",
  ...draggableStyle,
});

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnEditing: false,
      title: this.props.title,
      tasks: this.props.tasks,
      columnId: this.props.columnId
    };
    this.editColInputs = this.editColInputs.bind(this)
    this.doneEditingCol = this.doneEditingCol.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  editColInputs() {
    this.setState({ columnEditing: true })
  }

  doneEditingCol() {
    this.setState({ columnEditing: false })
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ [event.target.id]: inputValue });
    this.props.changeColumnTitle(this.props.columnId, inputValue);
  }

  render() {
    const { tasks, columnId, parentProvided, parentSnapshot, deleteTask } = this.props;

    return (
      <div className="column-dimensions mx-3">
        <div
          className="shadow rounded"
          ref={parentProvided.innerRef}
          {...parentProvided.draggableProps}
          style={getItemStyle(parentSnapshot.isDragging, parentProvided.draggableProps.style)}
        >
          <div className="d-flex justify-content-end">
            <i
              className="pink-hover mt-2 mr-2 fas fa-times-circle"
              onClick={() => {
                this.props.deleteColumn(this.props.columnId);
              }}
            ></i>
          </div>
          <header className="mx-0 w-100 d-flex justify-content-center" {...parentProvided.dragHandleProps}>
            {this.state.columnEditing ? (
              <div>
                <input
                  id="title"
                  type="text"
                  className="w-100 border-noborder"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <button className="btn btn-secondary btn-sm" onClick={() => this.doneEditingCol()}>
                  Done
                </button>
              </div>
            ) : (
              <h4 className="pt-1 pb-2" onClick={this.editColInputs}>
                {this.state.title}
              </h4>
            )}
          </header>
          <div className="d-flex justify-content-center">
            <i onClick={() => this.props.addTask(columnId)} className="fas fa-plus mb-2 add-task"></i>
          </div>
          <TaskCard
            tasks={tasks}
            columnId={columnId}
            changeItems={this.props.changeItems}
            columnList={this.props.columnList}
            deleteTask={deleteTask}
            getTaskDetails={this.props.getTaskDetails}
            moveTo={this.props.moveTo}
          />
        </div>
        {parentProvided.placeholder}
      </div>
    );
  }
}
