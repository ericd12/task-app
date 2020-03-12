import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  min-height: 100 px;
  flex-grow: 1;
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
`;

const Column = ({ id, column }) => {
  return (
    <Container>
      <Title>{column.name}</Title>
      <div style={{ margin: 2 }}>
        <Droppable key={id} droppableId={id}>
          {(provided, snapshot) => {
            return (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                // isDraggingOver={snapshot.isDraggingOver}
              >
                {column.items.map((task, index) => {
                  return <Task {...{ task, index, key: task._id }} />;
                })}
                {provided.placeholder}
              </TaskList>
            );
          }}
        </Droppable>
      </div>
    </Container>
  );
};

export default Column;
