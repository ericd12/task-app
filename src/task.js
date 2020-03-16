
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

const P = styled.p`
 display: inline-block;
 margin: 2px  10px 2px 5px;
`

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
          <P>{elementnumber}</P>
          <P>{elementlabel}</P>
          <P>Desc: {elementDescription}</P>
          <P>{elementFormat}</P>
          <P>Time: {elementDuration}</P>
          <P>{elementCategory}</P>
          <P>{elementSubCategory}</P>
          <P>{elementMarket}</P>
          <P>CogRating: {elementCogRating}</P>
          <P>PhysRating: {elementPhysRating}</P>
          <P>{elementLink}</P>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;