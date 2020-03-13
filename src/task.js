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
  margin: 2px 10px 2px 5px;
`;

const Task = ({
  _id,
  elementCategory,
  elementCogRating,
  elementDescription,
  elementDuration,
  elementFormat,
  elementlabel,
  elementLink,
  elementMarket,
  elementnumber,
  elementPhysRating,
  elementSubCategory,
  index,
}) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <Container
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <Para>{elementnumber}</Para>
          <Para>{elementlabel}</Para>
          <Para>Desc: {elementDescription}</Para>
          <Para>{elementFormat}</Para>
          <Para>Time: {elementDuration}</Para>
          <Para>{elementCategory}</Para>
          <Para>{elementSubCategory}</Para>
          <Para>{elementMarket}</Para>
          <Para>CogRating: {elementCogRating}</Para>
          <Para>PhysRating: {elementPhysRating}</Para>
          <Para>{elementLink}</Para>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
