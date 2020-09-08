import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from './Task';
import { ContextMenuTrigger } from "react-contextmenu";
import ContextPopup from './ContextPopup'


const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "white",
  padding: "1rem",
  margin: "1rem",
  borderRadius: "10px",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "rgb(235,235,235)" : "rgb(235,235,235)",
  border: "1px solid rgb(225,225,225)",
  padding: "0.5rem 0"
});

export default class TaskCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks
    }
    this.handleClickDelete = this.handleClickDelete.bind(this)
  }

  handleClickDelete(event) {
    event.stopPropagation();
    this.props.deleteTask(event.currentTarget.id, this.props.columnId);
  }

  render() {
    return (
      <Droppable droppableId={this.props.columnId} type={`droppableSubItem`}>
        {(provided, snapshot) => (
          <div className="vertical-scroll" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {this.props.tasks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div>
                    <ContextMenuTrigger id={item.id} holdToDisplay={500}>
                      <div
                        className="shadow-sm"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        id={item.id}
                        onClick={this.handleClickItem}
                      >
                        <button
                          type="button"
                          className="close pink-hover"
                          id={item.id}
                          onClick={this.handleClickDelete}
                        >
                          <span>&times;</span>
                        </button>
                        <Task
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          content={item.content}
                          changeItems={this.props.changeItems}
                          imageBase64String={item.imageBase64String}
                        />
                        <div
                          className="details"
                          onClick={() => {
                            this.props.getTaskDetails(item);
                          }}
                        >
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                    </ContextMenuTrigger>
                    <ContextPopup
                      id={item.id}
                      index={index}
                      columnId={this.props.columnId}
                      columnList={this.props.columnList}
                      delete={this.props.deleteTask}
                      moveTo={this.props.moveTo}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }


}
