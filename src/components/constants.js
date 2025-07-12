export const INITIAL_DATA = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the trash' },
    'task-2': { id: 'task-2', content: 'Watch a movie' },
    'task-3': { id: 'task-3', content: 'Charge phone' },
  },
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['todo', 'inprogress', 'done'],
}