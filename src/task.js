import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
        <Container
          {...{ ...draggableProps, ...dragHandleProps }}
          ref={innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.elementlabel}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
