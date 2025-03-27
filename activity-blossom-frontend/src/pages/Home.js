import React, { useEffect } from 'react';
import { Container, Grid, Header, Segment, Icon, Statistic, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Home component mounted');
        // Check if we have both token and avatar color
        const token = localStorage.getItem('token');
        const avatarColor = localStorage.getItem('userAvatarColor');

        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/login', { replace: true });
            return;
        }

        if (!avatarColor) {
            console.log('No avatar color found, redirecting to avatar selection');
            navigate('/avatar-selection', { replace: true });
            return;
        }
    }, [navigate]);

    const handlePreviousPage = () => {
        console.log('Navigating to avatar selection');
        navigate('/avatar-selection', { replace: true });
    };

    const handleLogout = () => {
        console.log('Logging out');
        localStorage.removeItem('token');
        localStorage.removeItem('userAvatarColor');
        navigate('/login', { replace: true });
    };

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em' }}>
                <div style={{ display: 'flex', gap: '1em' }}>
                    <Button
                        color='grey'
                        icon='arrow left'
                        content='Previous Page'
                        onClick={handlePreviousPage}
                    />
                    <Button
                        color='red'
                        icon='sign out'
                        content='Logout'
                        onClick={handleLogout}
                    />
                </div>
                <Header as='h1' color='teal'>
                    🌸 Welcome to ActivityBlossom
                </Header>
                <div style={{ width: '200px' }}></div> {/* Spacer for alignment */}
            </div>

            <Grid stackable columns={3} textAlign='center'>
                <Grid.Row>
                    <Grid.Column>
                        <Segment padded circular style={{ backgroundColor: '#E8F5E9' }}>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='leaf' color='green' /> 0
                                </Statistic.Value>
                                <Statistic.Label>Eco-friendly Tasks</Statistic.Label>
                            </Statistic>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment padded circular style={{ backgroundColor: '#E3F2FD' }}>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='calendar check' color='blue' /> 0
                                </Statistic.Value>
                                <Statistic.Label>Events Planned</Statistic.Label>
                            </Statistic>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment padded circular style={{ backgroundColor: '#FFF3E0' }}>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='star' color='yellow' /> 0
                                </Statistic.Value>
                                <Statistic.Label>Goals Set</Statistic.Label>
                            </Statistic>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid stackable columns={2} style={{ marginTop: '2em' }}>
                <Grid.Column>
                    <Segment>
                        <Header as='h3'>
                            <Icon name='tasks' color='teal' />
                            <Header.Content>Recent Tasks</Header.Content>
                        </Header>
                        <p>No tasks yet. Start by adding your first task!</p>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Segment>
                        <Header as='h3'>
                            <Icon name='calendar alternate' color='teal' />
                            <Header.Content>Upcoming Events</Header.Content>
                        </Header>
                        <p>No events scheduled. Plan your first event!</p>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Home; 