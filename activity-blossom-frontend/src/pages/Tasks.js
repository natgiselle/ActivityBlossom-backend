import React, { useState } from 'react';
import { Container, Grid, Tab } from 'semantic-ui-react';
import TaskList from '../components/TaskList';
import SustainabilityIdeas from '../components/SustainabilityIdeas';

const Tasks = () => {
    const [activeTab, setActiveTab] = useState(0);

    const panes = [
        {
            menuItem: 'Task List',
            render: () => (
                <Tab.Pane>
                    <TaskList />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Sustainability Ideas',
            render: () => (
                <Tab.Pane>
                    <SustainabilityIdeas />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Tab
                            panes={panes}
                            activeIndex={activeTab}
                            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Tasks; 