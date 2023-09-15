import React from 'react';
import { Paper, Typography, List } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

interface ColumnType {
    title: string;
    tasks: { id: string; content: string }[];
}

interface ColumnProps {
    columnId: string;
    column: ColumnType;
    index: number;
}

const Column: React.FC<ColumnProps> = ({ columnId, column, index }) => {
    return (
        <Paper elevation={3} style={{ padding: '8px', margin: '8px', minWidth: '250px' }}>
            <Typography variant="h6">{columnId}</Typography>
            <Droppable droppableId={columnId} type="task">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {column.tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Paper>
    );
};

export default Column;
