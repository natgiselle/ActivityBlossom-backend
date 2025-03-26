import React, { useState } from 'react';
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const colors = [
    { name: 'Blue', value: '#4A90E2' },
    { name: 'Red', value: '#E24A4A' },
    { name: 'Yellow', value: '#E2D44A' },
    { name: 'Green', value: '#4AE24A' },
    { name: 'Purple', value: '#9B4AE2' },
    { name: 'Pink', value: '#E24A9B' },
    { name: 'Orange', value: '#E2A44A' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' }
];

function AvatarSelection() {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState('#4A90E2'); // Default to blue

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleContinue = () => {
        // Save the selected color to localStorage or your user profile
        localStorage.setItem('userAvatarColor', selectedColor);
        navigate('/home');
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 600 }}>
                <Segment>
                    <Header as='h2' color='teal' textAlign='center'>
                        🐝 Choose Your Bee's Color
                    </Header>

                    <div style={{ margin: '2em 0' }}>
                        <Image
                            src="/bee-avatar.png" // You'll need to add this image to your public folder
                            size="medium"
                            style={{
                                backgroundColor: selectedColor,
                                padding: '1em',
                                borderRadius: '50%',
                                margin: '0 auto'
                            }}
                        />
                    </div>

                    <Grid columns={3} stackable>
                        {colors.map((color) => (
                            <Grid.Column key={color.name}>
                                <Button
                                    fluid
                                    style={{
                                        backgroundColor: color.value,
                                        color: color.value === '#FFFFFF' ? '#000000' : '#FFFFFF',
                                        border: selectedColor === color.value ? '3px solid #21BA45' : 'none'
                                    }}
                                    onClick={() => handleColorSelect(color.value)}
                                >
                                    {color.name}
                                </Button>
                            </Grid.Column>
                        ))}
                    </Grid>

                    <Button
                        color='teal'
                        size='large'
                        style={{ marginTop: '2em' }}
                        onClick={handleContinue}
                    >
                        Continue to Dashboard
                    </Button>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default AvatarSelection; 