import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import Column from "./column";

const Container = styled.div`
  display: "flex";
`;

class App extends React.Component {
  state = {
    elements: [],
    tasks: {
      "5e4f069d36b19abd04800eae": {
        _id: "5e4f069d36b19abd04800eae",
        elementnumber: "101",
        elementlabel: "101label",
        elementDescription: "101desc",
        elementFormat: "Video",
        elementDuration: "10:25",
        elementCategory: "Timing",
        elementSubCategory: "101Subcat",
        elementMarket: "Memory Care",
        elementCogRating: 5,
        elementPhysRating: 6,
        elementLink: "https://www.google.com/",
        createdAt: "2020-02-25T21:51:31.739Z",
        updatedAt: "2020-02-25T21:52:53.316Z",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Elements",
        taskIds: ["5e4f069d36b19abd04800eae"],
      },
      "column-2": {
        id: "column-2",
        title: "Track List",
        taskIds: [],
      },
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/elements/")
      .then(response => {
        console.log({ response });
        this.setState({ elements: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDragEnd = result => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  };

  render() {
    const { tasks, columns } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {Object.values(columns).map(column => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={column.taskIds.map(taskId => tasks[taskId])}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
