import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

const Para = styled.p`
 display: inline-block;
 margin: 2px  10px 2px 5px;
`

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
        <Container
          {...{ ...draggableProps, ...dragHandleProps }}
          ref={innerRef}
          isDragging={snapshot.isDragging}
        >
          <Para>{task.elementnumber}</Para><Para>{task.elementlabel}</Para>  
          <Para>Desc: {task.elementDescription}</Para><Para>{task.elementFormat}</Para>  
          <Para>Time: {task.elementDuration}</Para><Para>{task.elementCategory}</Para>  
          <Para>{task.elementSubCategory}</Para><Para>{task.elementMarket}</Para>  
          <Para>CogRating: {task.elementCogRating}</Para><Para>PhysRating: {task.elementPhysRating}</Para>  
          <Para>{task.elementLink}</Para>
          
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
