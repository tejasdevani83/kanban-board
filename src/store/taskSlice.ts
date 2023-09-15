import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        tasks: [],
    },
    done: {
        title: 'Done',
        tasks: [],
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
            action: PayloadAction<{ source: string; destination: string; taskId: string }>
        ) => {
            const { source, destination, taskId } = action.payload;
            const task = state[source].tasks.find((t) => t.id === taskId);
            if (task) {
                state[source].tasks = state[source].tasks.filter((t) => t.id !== taskId);
                state[destination].tasks.push(task);
            }
        },
    },
});

export const { addTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
