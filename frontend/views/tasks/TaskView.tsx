import { useEffect, useState } from 'react';
import { TaskService } from 'Frontend/generated/endpoints';
import { Grid } from '@hilla/react-components/Grid';
import { GridColumn } from '@hilla/react-components/GridColumn';
import TaskForm from 'Frontend/views/tasks/TaskForm';
import Task from 'Frontend/generated/com/example/application/data/Task';
import { Button } from '@hilla/react-components/Button';

export default function TaskView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined | null>(undefined);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    TaskService.getAllTasks().then(setTasks)
  }, []);

  async function saveTask(task: Task) {
    const savedTask = await TaskService.addTask(task);
    setTasks(tasks.map(existing => existing.id === savedTask.id ? savedTask : existing));
    setSelectedTask(savedTask)
  }

  async function addTask() {
    const newTask: Task = {
      id: Math.random(),
      title: "New task"
    }
    const addedTask: Task = await TaskService.addTask(newTask);
    setTasks([...tasks, addedTask]);
    setSelectedTask(addedTask);
  }

  async function deleteTask(task: Task) {
    await TaskService.deleteTask(task);
    setTasks(tasks.filter(existing => existing.id !== task.id));
    setSelectedTask(undefined);
  }

  return (
    <div className='p-m'>
      <div className='pb-s'>
        <Button
          onClick={addTask}
        >Add Task</Button>
      </div>
      <Grid
        items={tasks}
        onActiveItemChanged={e => setSelectedTask(e.detail.value)}
        selectedItems={[selectedTask]}
      >
        <GridColumn path='title' />
        <GridColumn path='description' />
        <GridColumn path='createdAt' />
        <GridColumn path='dueDate' />
      </Grid>
      {selectedTask &&
      <TaskForm task={selectedTask} onSubmit={saveTask} onDelete={deleteTask}/>}
    </div>
  )
}