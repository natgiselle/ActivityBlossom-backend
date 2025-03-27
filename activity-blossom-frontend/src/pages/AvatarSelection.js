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
    const [selectedColor, setSelectedColor] = useState(colors[0].value);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        localStorage.setItem('userAvatarColor', color);
        // Dispatch custom event for same-window updates
        window.dispatchEvent(new CustomEvent('avatarColorChange', { detail: color }));
    };

    const handleContinue = () => {
        localStorage.setItem('userAvatarColor', selectedColor);
        navigate('/home');
    };

    const handleBack = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 600 }}>
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
                            content='Previous Page'
                            onClick={handleBack}
                        />
                        <Header as='h2' color='teal'>
                            🐝 Choose Your Bee's Color
                        </Header>
                        <div style={{ width: '120px' }}></div>
                    </div>

                    <div style={{
                        margin: '2em 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            src="/bee-avatar.png"
                            size="medium"
                            style={{
                                backgroundColor: selectedColor,
                                padding: '1em',
                                borderRadius: '50%',
                                margin: '0 auto',
                                width: '150px',
                                height: '150px',
                                objectFit: 'contain',
                                transition: 'all 0.3s ease-in-out'
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
                                        border: selectedColor === color.value ? '3px solid #21BA45' : 'none',
                                        marginBottom: '10px'
                                    }}
                                    onClick={() => handleColorSelect(color.value)}
                                >
                                    {color.name}
                                </Button>
                            </Grid.Column>
                        ))}
                    </Grid>

                    <div style={{
                        marginTop: '2em',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            color='teal'
                            size='large'
                            onClick={handleContinue}
                            style={{ width: '200px' }}
                        >
                            Continue to Dashboard
                        </Button>
                    </div>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default AvatarSelection; 