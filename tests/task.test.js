const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/taskModel');

// Mock the Task model
jest.mock('../src/models/taskModel');

describe('Task API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new task successfully', async () => {
    const mockTask = { id: 1, title: 'Test Task', description: 'Test Desc', completed: false };
    Task.create.mockResolvedValue(mockTask);

    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Desc' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockTask);
    expect(Task.create).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Desc',
      dueDate: undefined,
      category: undefined,
    });
  });

  it('should fail to create a task with empty title', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: '', description: 'Test Desc' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(Task.create).not.toHaveBeenCalled();
  });

  it('should fetch all tasks', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    Task.findAll.mockResolvedValue(mockTasks);

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockTasks);
    expect(Task.findAll).toHaveBeenCalled();
  });

  it('should prevent marking an already completed task as complete', async () => {
    Task.findById.mockResolvedValue({ id: 1, title: 'Task', completed: true });

    const res = await request(app).patch('/tasks/1/complete');

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Task is already marked as completed');
    expect(Task.markCompleted).not.toHaveBeenCalled();
  });

  it('should mark an incomplete task as complete', async () => {
    Task.findById.mockResolvedValue({ id: 1, title: 'Task', completed: false });
    Task.markCompleted.mockResolvedValue({ id: 1, completed: true });

    const res = await request(app).patch('/tasks/1/complete');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Task marked as complete');
    expect(Task.markCompleted).toHaveBeenCalledWith('1');
  });

  it('should delete a task safely', async () => {
    Task.findById.mockResolvedValue({ id: 1, title: 'Task', completed: false });
    Task.delete.mockResolvedValue(true);

    const res = await request(app).delete('/tasks/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Task deleted successfully');
    expect(Task.delete).toHaveBeenCalledWith('1');
  });
});
