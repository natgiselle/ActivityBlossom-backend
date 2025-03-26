import React from 'react';
import { Card, Grid, Header, Icon, Segment } from 'semantic-ui-react';

const SustainabilityIdeas = () => {
    const sustainabilitySections = [
        {
            title: 'Gardening for Sustainability',
            icon: 'leaf',
            tips: [
                'Plant native species to support local ecosystems',
                'Create a pollinator-friendly garden with flowers that attract bees and butterflies',
                'Use companion planting to naturally deter pests',
                'Implement water-saving techniques like mulching and drip irrigation',
            ],
        },
        {
            title: 'Eco-Friendly Floral Arrangements',
            icon: 'flower',
            tips: [
                'Use locally grown flowers to reduce carbon footprint',
                'Choose seasonal blooms that don\'t require artificial growing conditions',
                'Repurpose containers and avoid single-use plastics',
                'Consider dried flowers for long-lasting arrangements',
            ],
        },
        {
            title: 'Composting and Waste Reduction',
            icon: 'recycle',
            tips: [
                'Start a compost bin for garden and kitchen waste',
                'Use fallen leaves and grass clippings as natural mulch',
                'Repurpose plant containers and garden tools',
                'Implement a zero-waste approach to garden maintenance',
            ],
        },
        {
            title: 'Nature Connection for Well-being',
            icon: 'heart',
            tips: [
                'Create a meditation space in your garden',
                'Practice mindful gardening techniques',
                'Use natural materials for garden structures',
                'Incorporate sensory plants for therapeutic benefits',
            ],
        },
    ];

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h2" textAlign="center" color="green">
                        <Icon name="leaf" />
                        <Header.Content>
                            Sustainable Living Ideas
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
                {sustainabilitySections.map((section, index) => (
                    <Grid.Column key={index}>
                        <Segment raised>
                            <Header as="h3" color="green">
                                <Icon name={section.icon} />
                                <Header.Content>
                                    {section.title}
                                </Header.Content>
                            </Header>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Description>
                                        <ul>
                                            {section.tips.map((tip, tipIndex) => (
                                                <li key={tipIndex}>{tip}</li>
                                            ))}
                                        </ul>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>
                ))}
            </Grid.Row>
        </Grid>
    );
};

export default SustainabilityIdeas; 