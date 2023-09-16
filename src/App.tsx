import './App.css';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { moveTask } from './store/taskSlice';
import Column from './components/Column';
import { Container, Grid } from '@mui/material';

function App() {
  const columns = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    dispatch(moveTask({ source, destination, taskId: draggableId }));
  };
  return (
    <div className="App">
      <Container maxWidth='md'>
        <h1>Kanban Board</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
                <Grid container spacing={2}>
                  {Object.keys(columns).map((columnId, index) => (
                    <Grid key={columnId} item xs={12} md={4}>
                      <Column key={columnId} columnId={columnId} column={columns[columnId]} index={index} />
                    </Grid>
                  ))}
                  {provided.placeholder}
                </Grid>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </div>
  );
}

export default App;
