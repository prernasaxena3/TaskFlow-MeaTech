import { http, HttpResponse, delay } from 'msw';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  updatedAt: string;
}

// Mock data store
let tasks: Task[] = [
  {
    id: '1',
    title: 'Setup project repository',
    description: 'Initialize the project with React, TypeScript, and necessary dependencies',
    status: 'done',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Implement authentication flow',
    description: 'Create login page with mock authentication and protected routes',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Design task dashboard',
    description: 'Build a responsive dashboard with task list and CRUD operations',
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock user credentials
const MOCK_USER = {
  username: 'prerna',
  password: 'saxena',
};

// Generate a fake JWT token
const generateToken = () => {
  return `mock.jwt.${btoa(JSON.stringify({ username: MOCK_USER.username, exp: Date.now() + 86400000 }))}`;
};

export const handlers = [
  // Login endpoint
  http.post('/api/login', async ({ request }) => {
    await delay(500); // Simulate network delay
    
    const body = await request.json() as { username: string; password: string };
    
    if (body.username === MOCK_USER.username && body.password === MOCK_USER.password) {
      return HttpResponse.json({
        success: true,
        token: generateToken(),
        user: {
          username: MOCK_USER.username,
        },
      });
    }
    
    return HttpResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Get all tasks
  http.get('/api/tasks', async () => {
    await delay(300);
    return HttpResponse.json({ tasks });
  }),

  // Create task
  http.post('/api/tasks', async ({ request }) => {
    await delay(400);
    
    const body = await request.json() as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
    
    const newTask: Task = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    tasks.push(newTask);
    
    return HttpResponse.json({ task: newTask });
  }),

  // Update task
  http.put('/api/tasks/:id', async ({ request, params }) => {
    await delay(400);
    
    const { id } = params;
    const body = await request.json() as Partial<Task>;
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      );
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({ task: tasks[taskIndex] });
  }),

  // Delete task
  http.delete('/api/tasks/:id', async ({ params }) => {
    await delay(300);
    
    const { id } = params;
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      );
    }
    
    tasks.splice(taskIndex, 1);
    
    return HttpResponse.json({ success: true });
  }),
];
