import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

export default class ContextPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  makeMoveResult(taskIndex, taskId, currentColumnId, targetColumnId) {
    return {
      combine: null,
      destination: { droppableId: targetColumnId, index: 0 },
      draggableId: taskId,
      mode: "FLUID",
      reason: "DROP",
      source: { index: taskIndex, droppableId: currentColumnId },
      type: "droppableSubItem",
    };
  }

  handleClick(event, data) {
    if (data.action === "delete") {
      this.props.delete(this.props.id, this.props.columnId);
    } else if (data.action === "move") {
      const { taskIndex, taskId, currentColumnId, targetColumnId } = data;
      const result = this.makeMoveResult(taskIndex, taskId, currentColumnId, targetColumnId);
      this.props.moveTo(result);
    }
  }

  getColumnAvailibleToMove() {
    const columnLists = this.props.columnList;
    columnLists.filter((column, index) => {
      if (column[0] === this.props.columnId) {
        columnLists.splice(index, 1);
      }
      return true;
    });
    return columnLists;
  }

  render() {
    return (
      <div>
        <ContextMenu id={this.props.id}>
          <MenuItem data={{ action: "delete" }} onClick={this.handleClick} attributes={{ className: "custom-root" }}>
            Delete
          </MenuItem>
          <MenuItem divider />
          {this.getColumnAvailibleToMove().map((column, index) => {
            return (
              <MenuItem
                key={index}
                data={{
                  action: "move",
                  taskIndex: `${this.props.index}`,
                  taskId: `${this.props.id}`,
                  currentColumnId: `${this.props.columnId}`,
                  targetColumnId: column[0],
                }}
                onClick={this.handleClick}
                attributes={{ className: "custom-root" }}
              >
                {`Move to ${column[1]}`}
              </MenuItem>
            );
          })}
        </ContextMenu>
      </div>
    );
  }
}
