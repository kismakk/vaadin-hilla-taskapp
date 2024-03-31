import Task from 'Frontend/generated/com/example/application/data/Task';
import { TextField } from '@hilla/react-components/TextField';
import { useForm } from '@hilla/react-form';
import TaskModel from 'Frontend/generated/com/example/application/data/TaskModel';
import { Button } from '@hilla/react-components/Button';
import { useEffect } from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker';

interface TaskFormProps {
  task: Task,
  onSubmit: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
}

export default function TaskForm({task, onSubmit, onDelete}: TaskFormProps) {
  const {field, model, submit, read, invalid } = useForm(TaskModel, { onSubmit })

  useEffect(() => {
    read(task)
  }, [task]);

  return (
    <div className='grid grid-cols-2 gap-s'>
      <TextField label='Title' {...field(model.title)}/>
      <TextField label='Description' {...field(model.description)}/>
      <TextField label='Created At' readonly={true} {...field(model.createdAt)}/>
      <DatePicker label='Due Date' {...field(model.dueDate)}/>
      <Button onClick={submit} theme='primary' disabled={invalid}>Save</Button>
      <Button onClick={() => onDelete(task)} theme='error' >Delete</Button>
    </div>
  )
}
