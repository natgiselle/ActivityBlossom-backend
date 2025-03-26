import React from 'react';
import { Container, Grid, Header, Segment, Icon, Statistic } from 'semantic-ui-react';

function Home() {
    return (
        <Container>
            <Header as='h1' textAlign='center' color='teal' style={{ margin: '2em 0' }}>
                🌸 Welcome to ActivityBlossom
            </Header>

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