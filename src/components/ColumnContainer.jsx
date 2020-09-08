import React from "react";
import TaskModal from "./TaskModal";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { defaultTask } from "./DefaultTask";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "white" : "white",
});

export default class ColumnContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLanding: true,
      showModal: false,
      selectedTaskDetails: {
        id: "",
        title: "",
        description: "",
        imageBase64String: "",
      },
      items: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.getTaskDetails = this.getTaskDetails.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addTask = this.addTask.bind(this);
    this.changeItems = this.changeItems.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeColumnTitle = this.changeColumnTitle.bind(this);
  }

  componentDidMount() {
    this.loadTaskDataFromLocalStorage();
  }

  changeItems(id, task) {
    const oldItems = this.state.items.slice();
    for (let i = 0; i < oldItems.length; i++) {
      for (let inc = 0; inc < oldItems[i].tasks.length; inc++) {
        if (id === oldItems[i].tasks[inc].id) {
          oldItems[i].tasks[inc] = task;
        }
      }
    }
    this.setState({ items: oldItems });
    this.saveTaskDataToLocalStorage();
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  changeColumnTitle(columnId, newTitle) {
    const newItems = [...this.state.items];
    newItems.forEach((column) => {
      if (column.id === columnId) {
        column.title = newTitle;
      }
    });

    this.setState({ items: newItems });
    this.saveTaskDataToLocalStorage();
  }

  getColumnList() {
    const columnList = [];

    this.state.items.map((item) => {
      const column = [];
      column[0] = item.id;
      column[1] = item.title;
      columnList.push(column);
      return true;
    });
    return columnList;
  }

  getTaskDetails(task) {
    this.setState({
      selectedTaskDetails: {
        id: task.id,
        title: task.title,
        description: task.content,
        imageBase64String: task.imageBase64String,
      },
      showModal: true,
    });
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      const items = this.reorder(this.state.items, sourceIndex, destIndex);

      this.setState({ items });
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = this.state.items.reduce((acc, item) => {
        acc[item.id] = item.tasks;
        return acc;
      }, {});

      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;
      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...this.state.items];

      if (sourceParentId === destParentId) {
        const reorderedSubItems = this.reorder(sourceSubItems, sourceIndex, destIndex);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.tasks = reorderedSubItems;
          }
          return item;
        });
        this.setState({ items: newItems });
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.tasks = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.tasks = newDestSubItems;
          }
          return item;
        });
        this.setState({ items: newItems });
      }
    }
    this.saveTaskDataToLocalStorage();
  }

  saveTaskDataToLocalStorage() {
    localStorage.setItem("team-overeact-task-data", JSON.stringify(this.state.items));
  }

  loadTaskDataFromLocalStorage() {
    const taskData = JSON.parse(localStorage.getItem("team-overeact-task-data"));
    if (window.localStorage && taskData) {
      this.setState({ items: taskData });
    } else {
      this.setState({ items: defaultTask });
    }
  }

  addColumn(event) {
    event.preventDefault();
    const newColumn = this.state.items.slice();
    newColumn.push({
      id: `C${Date.now()}`,
      title: "New Column",
      tasks: [],
    });

    this.setState((state) => ({ items: newColumn }));
    this.saveTaskDataToLocalStorage();
  }

  deleteColumn(columnId) {
    const arrayCopy = this.state.items.slice();
    for (let i = 0; i < arrayCopy.length; i++) {
      if (arrayCopy[i].id === columnId) {
        arrayCopy.splice(i, 1);
      }
    }
    this.setState({ items: arrayCopy });
    this.saveTaskDataToLocalStorage();
  }

  addTask(columnId) {
    const columns = this.state.items.slice();
    const column = columns.filter((col) => {
      return col.id === columnId;
    });

    column[0].tasks.push({
      title: "Added Task",
      id: `T${Date.now()}`,
      content: "Enter Description Here",
    });
    this.setState((state) => ({ items: columns }));
    this.saveTaskDataToLocalStorage();
  }

  deleteTask(taskId, columnId) {
    const newItems = [...this.state.items];
    newItems.filter((column, index) => {
      if (column["id"] === columnId) {
        const taskIndex = newItems[index].tasks.findIndex((task) => task.id === taskId);
        newItems[index].tasks.splice(taskIndex, 1);
        this.setState({ items: newItems });
        return true;
      }
      return false;
    });
    this.saveTaskDataToLocalStorage();
  }

  render() {
    if (!this.state.items) return <></>;

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" type="droppableItem" mode="virtual" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className="d-flex horizontal-scroll mt-5 pt-5"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Column
                        title={item.title}
                        tasks={item.tasks}
                        columnId={item.id}
                        columnList={this.getColumnList()}
                        parentProvided={provided}
                        parentSnapshot={snapshot}
                        addTask={this.addTask}
                        getTaskDetails={this.getTaskDetails}
                        deleteTask={this.deleteTask}
                        deleteColumn={this.deleteColumn}
                        moveTo={this.onDragEnd}
                        changeItems={this.changeItems}
                        changeColumnTitle={this.changeColumnTitle}
                      />
                    )}
                  </Draggable>
                ))}
                <div onClick={this.addColumn} className="add-column">
                  <i className="fa fa-plus-circle fa-lg zoom mt-2 mr-3" aria-hidden="true"></i>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {this.state.showModal ? (
          <TaskModal
            closeModal={this.closeModal}
            title={this.state.selectedTaskDetails.title}
            description={this.state.selectedTaskDetails.description}
            imageBase64String={this.state.selectedTaskDetails.imageBase64String}
            id={this.state.selectedTaskDetails.id}
            changeItems={this.changeItems}
          />
        ) : null}
      </div>
    );
  }
}
