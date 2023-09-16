import React from 'react';
import { Avatar, Card, CardContent, ListItem, ListItemText, Stack } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { lightGreen } from '@mui/material/colors';

interface TaskProps {
    task: { id: string; content: string };
    index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Card sx={{ minWidth: '100%' }}>
                        <CardContent>
                            <Stack direction={'row'} spacing={2}>
                                <Avatar sx={{ bgcolor: lightGreen[300] }}>TD</Avatar>
                                <ListItemText primary={task.content} />
                            </Stack>
                        </CardContent>
                    </Card>
                </ListItem>
            )}
        </Draggable>
    );
};

export default Task;
