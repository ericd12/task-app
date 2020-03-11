import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin:  8px ;
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
    background-color: ${props => (props.isDraggingOver ? '#f5fbfc': 'white')};
    flex-grow: 1;
    min-height: 400px;
    // max-height: 200px;
`;

class InnerList extends React.PureComponent{
    render(){
       return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index}/>
       ));
    }
}

export default class Column extends React.Component{
    render(){
        return(
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (                  
                        <TaskList 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}                        
                        >

                            <InnerList tasks= {this.props.tasks} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}