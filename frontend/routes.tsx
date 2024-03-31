import MainLayout from 'Frontend/views/MainLayout.js';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import TaskView from "Frontend/views/tasks/TaskView";
import NoteView from "Frontend/views/notes/NoteView";

export const routes = [
  {
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '/', element: <TaskView />, handle: { title: 'Tasks' } },
      { path: '/notes', element: <NoteView />, handle: { title: 'Notes'} }
    ],
  },
] as RouteObject[];

export default createBrowserRouter(routes);
