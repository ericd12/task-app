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
    tasks: {
      "1": {
        _id: "1",
        elementnumber: 30,
        elementlabel: "TDA",
        elementFormat: "Image",
        createdAt: "1/9/2020",
        updatedAt: "10/8/2019",
      },
      "2": {
        _id: "2",
        elementnumber: 90,
        elementlabel: "21 CFR Part 11",
        elementFormat: "Image",
        createdAt: "2/24/2020",
        updatedAt: "11/26/2019",
      },
      "3": {
        _id: "3",
        elementnumber: 45,
        elementlabel: "Slope Stability",
        elementFormat: "Video",
        createdAt: "9/25/2019",
        updatedAt: "12/16/2019",
      },
      "4": {
        _id: "4",
        elementnumber: 50,
        elementlabel: "Axys",
        elementFormat: "Video",
        createdAt: "2/28/2020",
        updatedAt: "12/15/2019",
      },
      "5": {
        _id: "5",
        elementnumber: 78,
        elementlabel: "LCMS",
        elementFormat: "Video",
        createdAt: "5/28/2019",
        updatedAt: "7/14/2019",
      },
      "6": {
        _id: "6",
        elementnumber: 2,
        elementlabel: "Sap Fm",
        elementFormat: "Video",
        createdAt: "10/2/2019",
        updatedAt: "5/31/2019",
      },
      "7": {
        _id: "7",
        elementnumber: 81,
        elementlabel: "Board Certified",
        elementFormat: "Video",
        createdAt: "9/20/2019",
        updatedAt: "2/14/2020",
      },
      "8": {
        _id: "8",
        elementnumber: 81,
        elementlabel: "Project Portfolio Management",
        elementFormat: "Video",
        createdAt: "12/15/2019",
        updatedAt: "6/24/2019",
      },
      "9": {
        _id: "9",
        elementnumber: 44,
        elementlabel: "Labor Relations",
        elementFormat: "Video",
        createdAt: "9/27/2019",
        updatedAt: "10/12/2019",
      },
      "10": {
        _id: "10",
        elementnumber: 17,
        elementlabel: "Fluid Dynamics",
        elementFormat: "Image",
        createdAt: "7/22/2019",
        updatedAt: "4/26/2019",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Elements",
        taskIds: ["1"],
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
        this.setState(prev => {
          const tasks = Object.assign({}, prev.tasks, ...response.data);
          return {
            ...prev,
            tasks
          };
        });
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
        [newStart._id]: newStart,
        [newFinish._id]: newFinish,
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
