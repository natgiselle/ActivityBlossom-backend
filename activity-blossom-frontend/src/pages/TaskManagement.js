import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Segment, List, Icon, Label, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function TaskManagement() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        // Load tasks from localStorage
        const savedTasks = localStorage.getItem('userTasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            setTasks(parsedTasks);
            // Calculate completed tasks
            const completed = parsedTasks.filter(task => task.completed).length;
            setCompletedCount(completed);
        }
    }, []);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const newTaskObj = {
            id: Date.now(),
            text: newTask.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        const updatedTasks = [...tasks, newTaskObj];
        setTasks(updatedTasks);
        setNewTask('');
        localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    };

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                const newCompleted = !task.completed;
                setCompletedCount(prev => newCompleted ? prev + 1 : prev - 1);
                return { ...task, completed: newCompleted };
            }
            return task;
        });

        setTasks(updatedTasks);
        localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);
        const updatedTasks = tasks.filter(task => task.id !== taskId);

        if (taskToDelete.completed) {
            setCompletedCount(prev => prev - 1);
        }

        setTasks(updatedTasks);
        localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    };

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 800 }}>
                <Segment raised>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2em'
                    }}>
                        <Button
                            color='grey'
                            icon='arrow left'
                            content='Back to Home'
                            onClick={handleBack}
                        />
                        <Header as='h2' color='teal'>
                            Task Management
                            <Label color='teal' size='large' style={{ marginLeft: '1em' }}>
                                {completedCount}/{tasks.length}
                            </Label>
                        </Header>
                        <div style={{ width: '120px' }}></div>
                    </div>

                    <Form onSubmit={handleAddTask}>
                        <Form.Field>
                            <Input
                                action={{ color: 'teal', content: 'Add Task' }}
                                placeholder="Enter a new task..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </Form.Field>
                    </Form>

                    <List divided relaxed style={{ marginTop: '2em' }}>
                        {tasks.map(task => (
                            <List.Item key={task.id}>
                                <List.Content>
                                    <List.Header>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Icon
                                                    name={task.completed ? 'check circle' : 'circle outline'}
                                                    color={task.completed ? 'green' : 'grey'}
                                                    size='large'
                                                    style={{ cursor: 'pointer', marginRight: '1em' }}
                                                    onClick={() => handleToggleTask(task.id)}
                                                />
                                                <span style={{
                                                    textDecoration: task.completed ? 'line-through' : 'none',
                                                    color: task.completed ? '#999' : '#000'
                                                }}>
                                                    {task.text}
                                                </span>
                                            </div>
                                            <Icon
                                                name='trash'
                                                color='red'
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDeleteTask(task.id)}
                                            />
                                        </div>
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default TaskManagement; 