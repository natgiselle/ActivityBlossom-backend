import React, { useState } from 'react';
import {
    Button,
    Container,
    Form,
    Grid,
    Header,
    Icon,
    Segment,
    Dropdown,
} from 'semantic-ui-react';

const Settings = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        bio: '',
        theme: 'light',
    });

    const themeOptions = [
        { key: 'light', text: 'Light', value: 'light' },
        { key: 'dark', text: 'Dark', value: 'dark' },
        { key: 'green', text: 'Green', value: 'green' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement profile update logic
        console.log('Profile updated:', profile);
    };

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" color="green">
                            <Icon name="settings" />
                            <Header.Content>
                                Settings
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label>Name</label>
                                    <input
                                        placeholder="Your name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Bio</label>
                                    <textarea
                                        placeholder="Tell us about yourself"
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Theme</label>
                                    <Dropdown
                                        placeholder="Select Theme"
                                        fluid
                                        selection
                                        options={themeOptions}
                                        value={profile.theme}
                                        onChange={(e, { value }) => setProfile({ ...profile, theme: value })}
                                    />
                                </Form.Field>

                                <Button type="submit" primary>
                                    Save Changes
                                </Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Settings; 