import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "@atlaskit/css-reset";
import Column from "./column";

const Container = styled.div`
  display: flex;
  justify-content: left;
  width: 95%;
`;

class App extends Component {
  state = {
    "column-1": {
      name: "Elements",
      items: [
        { _id: "task-1", elementlabel: "content-1" },
        { _id: "task-2", elementlabel: "content-2" },
        { _id: "task-3", elementlabel: "content-3" },
        { _id: "task-4", elementlabel: "content-4" },
        { _id: "task-5", elementlabel: "content-5" },
      ],
    },
    "column-2": {
      name: "Track List",
      items: [],
    },
  };

  componentDidMount() {
    axios.get("http://localhost:5000/elements/").then(response => {
      this.setState(prev => {
        const copy = { ...prev };
        const [firstColumnId] = Object.keys(copy);

        copy[firstColumnId].items = [
          ...copy[firstColumnId].items,
          ...response.data,
        ];
        return copy;
      });
    });
  }

  render() {
    return (
      <Container>
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) {
              return;
            }

            if (source.droppableId !== destination.droppableId) {
              this.setState(prev => {
                const sourceColumn = prev[source.droppableId];
                const destColumn = prev[destination.droppableId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                  },
                  [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                  },
                };
              });
            } else {
              this.setState(prev => {
                const column = prev[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                  },
                };
              });
            }
          }}
        >
          {Object.entries(this.state).map(([id, column]) => {
            return <Column {...{ ...column, id, key: id }} />;
          })}
        </DragDropContext>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
