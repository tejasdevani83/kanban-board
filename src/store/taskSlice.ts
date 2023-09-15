import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';

interface Task {
    id: string;
    content: string;
}

interface Column {
    title: string;
    tasks: Task[];
}

interface TaskState {
    [key: string]: Column;
}

const initialState: TaskState = {
    todo: {
        title: 'To Do',
        tasks: [{ id: 'task-1', content: 'Task 1' }, { id: 'task-2', content: 'Task 2' }],
    },
    inProgress: {
        title: 'In Progress',
        tasks: [{ id: 'task-3', content: 'Task 3' }],
    },
    done: {
        title: 'Done',
        tasks: [{ id: 'task-4', content: 'Task 4' }],
    },
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ column: string; task: Task }>) => {
            state[action.payload.column].tasks.push(action.payload.task);
        },
        moveTask: (
            state,
            action: PayloadAction<{ source: DraggableLocation; destination: DraggableLocation; taskId: string }>
        ) => {
            const { source, destination, taskId } = action.payload;
            const task = state[source.droppableId].tasks.find((t) => t.id === taskId);
            console.log(Boolean(task))
            if (task) {
                state[source.droppableId].tasks.splice(source.index, 1)
                const destinationId = destination?.droppableId as string;
                const destinationDropIndex = destination?.index;
                if (destinationId && destinationDropIndex !== undefined) {
                    // state[destinationId].tasks.push(task);
                    state[destinationId].tasks.splice(destinationDropIndex, 0, task)
                }
            }
        },
    },
});

export const { addTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
