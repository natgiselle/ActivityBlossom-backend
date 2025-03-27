import React, { useState, useEffect } from 'react';
import { Button, Grid, Header, Segment, Form, List, Icon, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function Goals() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [goalType, setGoalType] = useState('short-term');
    const [isEcoFriendly, setIsEcoFriendly] = useState(false);

    useEffect(() => {
        const savedGoals = localStorage.getItem('goals');
        if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
        }
    }, []);

    const handleAddGoal = () => {
        if (newGoal.trim()) {
            const goal = {
                id: Date.now(),
                text: newGoal.trim(),
                type: goalType,
                isEcoFriendly,
                completed: false
            };
            const updatedGoals = [...goals, goal];
            setGoals(updatedGoals);
            localStorage.setItem('goals', JSON.stringify(updatedGoals));
            setNewGoal('');
            setIsEcoFriendly(false);
        }
    };

    const handleToggleGoal = (id) => {
        const updatedGoals = goals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        );
        setGoals(updatedGoals);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
    };

    const handleDeleteGoal = (id) => {
        const updatedGoals = goals.filter(goal => goal.id !== id);
        setGoals(updatedGoals);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
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
                            content='Back to Dashboard'
                            onClick={handleBack}
                        />
                        <Header as='h2' color='teal'>
                            🎯 Goals
                        </Header>
                        <div style={{ width: '120px' }}></div>
                    </div>

                    <Form onSubmit={handleAddGoal}>
                        <Form.Field>
                            <label>New Goal</label>
                            <input
                                placeholder='Enter your goal...'
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Goal Type</label>
                            <select
                                value={goalType}
                                onChange={(e) => setGoalType(e.target.value)}
                                style={{ width: '100%', padding: '0.5em' }}
                            >
                                <option value="short-term">Short-term</option>
                                <option value="long-term">Long-term</option>
                            </select>
                        </Form.Field>

                        <Form.Field>
                            <div className="ui checkbox">
                                <input
                                    type="checkbox"
                                    checked={isEcoFriendly}
                                    onChange={(e) => setIsEcoFriendly(e.target.checked)}
                                />
                                <label>Eco-friendly Goal</label>
                            </div>
                        </Form.Field>

                        <Button
                            type='submit'
                            color='yellow'
                            style={{ width: '100%' }}
                        >
                            Add Goal
                        </Button>
                    </Form>

                    <div style={{ marginTop: '2em' }}>
                        <Header as='h3' color='teal'>
                            Your Goals
                        </Header>
                        <List divided relaxed>
                            {goals.map(goal => (
                                <List.Item key={goal.id}>
                                    <List.Content>
                                        <List.Header>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                                <Icon
                                                    name={goal.completed ? 'check circle' : 'circle outline'}
                                                    color={goal.completed ? 'green' : 'grey'}
                                                    onClick={() => handleToggleGoal(goal.id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <span style={{ textDecoration: goal.completed ? 'line-through' : 'none' }}>
                                                    {goal.text}
                                                </span>
                                                {goal.isEcoFriendly && (
                                                    <Label color='green' horizontal>
                                                        Eco-friendly
                                                    </Label>
                                                )}
                                                <Label color={goal.type === 'long-term' ? 'blue' : 'orange'} horizontal>
                                                    {goal.type}
                                                </Label>
                                                <Icon
                                                    name='trash'
                                                    color='red'
                                                    onClick={() => handleDeleteGoal(goal.id)}
                                                    style={{ cursor: 'pointer', marginLeft: 'auto' }}
                                                />
                                            </div>
                                        </List.Header>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </div>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default Goals; 