import React, { useState } from 'react';
import {
    Button,
    Card,
    Form,
    Grid,
    Icon,
    Modal,
} from 'semantic-ui-react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        category: '',
    });

    const categories = [
        { key: 'personal', text: 'Personal', value: 'personal' },
        { key: 'work', text: 'Work', value: 'work' },
        { key: 'errands', text: 'Errands', value: 'errands' },
        { key: 'growth', text: 'Growth Projects', value: 'growth' },
        { key: 'nurturing', text: 'Nurturing Tasks', value: 'nurturing' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTask) {
            setTasks(tasks.map(task =>
                task.id === editingTask.id ? { ...formData, id: task.id } : task
            ));
            setEditingTask(null);
        } else {
            setTasks([...tasks, { ...formData, id: Date.now() }]);
        }
        setFormData({ title: '', description: '', dueDate: '', category: '' });
        setOpen(false);
    };

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData(task);
        setOpen(true);
    };

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Button
                        primary
                        onClick={() => {
                            setEditingTask(null);
                            setFormData({ title: '', description: '', dueDate: '', category: '' });
                            setOpen(true);
                        }}
                    >
                        Add New Task
                    </Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Card.Group>
                        {tasks.map(task => (
                            <Card key={task.id}>
                                <Card.Content>
                                    <Card.Header>{task.title}</Card.Header>
                                    <Card.Meta>{task.category}</Card.Meta>
                                    <Card.Description>{task.description}</Card.Description>
                                    <Card.Meta>Due: {task.dueDate}</Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button
                                        icon
                                        color="blue"
                                        onClick={() => handleEdit(task)}
                                    >
                                        <Icon name="edit" />
                                    </Button>
                                    <Button
                                        icon
                                        color="red"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <Icon name="delete" />
                                    </Button>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>
                    {editingTask ? 'Edit Task' : 'Add New Task'}
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                placeholder="Task title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <textarea
                                placeholder="Task description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Due Date</label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                required
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.text}
                                    </option>
                                ))}
                            </select>
                        </Form.Field>
                        <Button type="submit" primary>
                            {editingTask ? 'Update Task' : 'Add Task'}
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </Grid>
    );
};

export default TaskList; 