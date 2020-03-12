import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "@atlaskit/css-reset";
import Column from "./column";
import AddItemForm from "./AddItemForm";

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [columns, setColumns] = useState({
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
  });

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:5000/elements/").then(response => {
        setColumns(prev => {
          const copy = { ...prev };
          const [firstColumnId] = Object.keys(copy);

          copy[firstColumnId].items = [
            ...copy[firstColumnId].items,
            ...response.data,
          ];
          return copy;
        });
      });
    };

    getData();
  }, []);

  return (
    <div>
      <AddItemForm {...{ columns, setColumns }} />
      <Container>
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) {
              return;
            }

            if (source.droppableId !== destination.droppableId) {
              const sourceColumn = columns[source.droppableId];
              const destColumn = columns[destination.droppableId];
              const sourceItems = [...sourceColumn.items];
              const destItems = [...destColumn.items];
              const [removed] = sourceItems.splice(source.index, 1);
              destItems.splice(destination.index, 0, removed);
              setColumns({
                ...columns,
                [source.droppableId]: {
                  ...sourceColumn,
                  items: sourceItems,
                },
                [destination.droppableId]: {
                  ...destColumn,
                  items: destItems,
                },
              });
            } else {
              const column = columns[source.droppableId];
              const copiedItems = [...column.items];
              const [removed] = copiedItems.splice(source.index, 1);
              copiedItems.splice(destination.index, 0, removed);
              setColumns({
                ...columns,
                [source.droppableId]: {
                  ...column,
                  items: copiedItems,
                },
              });
            }
          }}
        >
          {Object.entries(columns).map(([id, column]) => {
            return <Column {...{ id, column, key: id }} />;
          })}
        </DragDropContext>
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
