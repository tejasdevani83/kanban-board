import React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

interface TaskProps {
    task: { id: string; content: string };
    index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <ListItem button {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Paper elevation={3} style={{ padding: '8px', margin: '8px', minWidth: '200px' }}>
                        <ListItemText primary={task.content} />
                    </Paper>
                </ListItem>
            )}
        </Draggable>
    );
};

export default Task;
