import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Segment, List, Icon, Label, Input, Dropdown } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function Events() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState('');
    const [completedCount, setCompletedCount] = useState(0);
    const [ecoFriendlyCount, setEcoFriendlyCount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');
    const [selectedAmPm, setSelectedAmPm] = useState('');

    useEffect(() => {
        // Load events from localStorage
        const savedEvents = localStorage.getItem('userEvents');
        if (savedEvents) {
            const parsedEvents = JSON.parse(savedEvents);
            setEvents(parsedEvents);
            // Calculate completed events
            const completed = parsedEvents.filter(event => event.completed).length;
            setCompletedCount(completed);
            // Calculate eco-friendly events
            const ecoFriendly = parsedEvents.filter(event => event.ecoFriendly).length;
            setEcoFriendlyCount(ecoFriendly);
        }
    }, []);

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEvent.trim() || !selectedMonth || !selectedDay || !selectedYear || !selectedHour || !selectedMinute || !selectedAmPm) return;

        // Convert 12-hour time to 24-hour format
        let hour24 = parseInt(selectedHour);
        if (selectedAmPm === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (selectedAmPm === 'AM' && hour24 === 12) {
            hour24 = 0;
        }
        const time24 = `${hour24.toString().padStart(2, '0')}:${selectedMinute}`;

        // Create date string in ISO format
        const date = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, parseInt(selectedDay));
        const dateISO = date.toISOString();

        const newEventObj = {
            id: Date.now(),
            text: newEvent.trim(),
            date: dateISO,
            time: time24,
            completed: false,
            ecoFriendly: false,
            createdAt: new Date().toISOString()
        };

        const updatedEvents = [...events, newEventObj];
        setEvents(updatedEvents);
        setNewEvent('');
        setSelectedMonth('');
        setSelectedDay('');
        setSelectedYear('');
        setSelectedHour('');
        setSelectedMinute('');
        setSelectedAmPm('');
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents));
    };

    const handleToggleEvent = (eventId) => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId) {
                const newCompleted = !event.completed;
                setCompletedCount(prev => newCompleted ? prev + 1 : prev - 1);
                return { ...event, completed: newCompleted };
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents));
    };

    const handleToggleEcoFriendly = (eventId) => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId) {
                const newEcoFriendly = !event.ecoFriendly;
                setEcoFriendlyCount(prev => newEcoFriendly ? prev + 1 : prev - 1);
                return { ...event, ecoFriendly: newEcoFriendly };
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents));
    };

    const handleDeleteEvent = (eventId) => {
        const eventToDelete = events.find(event => event.id === eventId);
        const updatedEvents = events.filter(event => event.id !== eventId);

        if (eventToDelete.completed) {
            setCompletedCount(prev => prev - 1);
        }
        if (eventToDelete.ecoFriendly) {
            setEcoFriendlyCount(prev => prev - 1);
        }

        setEvents(updatedEvents);
        localStorage.setItem('userEvents', JSON.stringify(updatedEvents));
    };

    const handleBack = () => {
        navigate('/home');
    };

    // Generate month options
    const monthOptions = [
        { key: '1', text: 'January', value: '1' },
        { key: '2', text: 'February', value: '2' },
        { key: '3', text: 'March', value: '3' },
        { key: '4', text: 'April', value: '4' },
        { key: '5', text: 'May', value: '5' },
        { key: '6', text: 'June', value: '6' },
        { key: '7', text: 'July', value: '7' },
        { key: '8', text: 'August', value: '8' },
        { key: '9', text: 'September', value: '9' },
        { key: '10', text: 'October', value: '10' },
        { key: '11', text: 'November', value: '11' },
        { key: '12', text: 'December', value: '12' }
    ];

    // Generate year options for the next 5 years
    const today = new Date();
    const yearOptions = Array.from({ length: 5 }, (_, i) => ({
        key: (today.getFullYear() + i).toString(),
        text: (today.getFullYear() + i).toString(),
        value: (today.getFullYear() + i).toString()
    }));

    // Generate day options based on selected month and year
    const getDayOptions = () => {
        if (!selectedMonth || !selectedYear) return [];

        const daysInMonth = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
        const today = new Date();
        const isCurrentMonth = selectedMonth === (today.getMonth() + 1).toString() &&
            selectedYear === today.getFullYear().toString();

        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isPastDate = isCurrentMonth && day < today.getDate();

            return {
                key: day.toString(),
                text: day.toString(),
                value: day.toString(),
                disabled: isPastDate
            };
        });
    };

    // Generate hour options (1-12)
    const hourOptions = Array.from({ length: 12 }, (_, i) => ({
        key: (i + 1).toString(),
        text: (i + 1).toString(),
        value: (i + 1).toString()
    }));

    // Generate minute options (00, 30)
    const minuteOptions = [
        { key: '00', text: '00', value: '00' },
        { key: '30', text: '30', value: '30' }
    ];

    // AM/PM options
    const ampmOptions = [
        { key: 'AM', text: 'AM', value: 'AM' },
        { key: 'PM', text: 'PM', value: 'PM' }
    ];

    // Function to convert 24-hour time to 12-hour format with AM/PM
    const formatTime = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${hour12}:${minutes} ${ampm}`;
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
                            Event Management
                            <div style={{ display: 'flex', gap: '1em', marginTop: '0.5em' }}>
                                <Label color='teal' size='large'>
                                    Completed: {completedCount}/{events.length}
                                </Label>
                                <Label color='green' size='large'>
                                    <Icon name='leaf' /> Eco-friendly: {ecoFriendlyCount}
                                </Label>
                            </div>
                        </Header>
                        <div style={{ width: '120px' }}></div>
                    </div>

                    <Form onSubmit={handleAddEvent}>
                        <Form.Field>
                            <Input
                                placeholder="Enter a new event..."
                                value={newEvent}
                                onChange={(e) => setNewEvent(e.target.value)}
                                style={{ marginBottom: '1em' }}
                            />
                        </Form.Field>
                        <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
                            <Form.Field style={{ flex: 1 }}>
                                <Dropdown
                                    placeholder="Month"
                                    fluid
                                    selection
                                    options={monthOptions}
                                    value={selectedMonth}
                                    onChange={(e, { value }) => {
                                        setSelectedMonth(value);
                                        setSelectedDay(''); // Reset day when month changes
                                    }}
                                />
                            </Form.Field>
                            <Form.Field style={{ flex: 1 }}>
                                <Dropdown
                                    placeholder="Day"
                                    fluid
                                    selection
                                    options={getDayOptions()}
                                    value={selectedDay}
                                    onChange={(e, { value }) => setSelectedDay(value)}
                                    disabled={!selectedMonth || !selectedYear}
                                />
                            </Form.Field>
                            <Form.Field style={{ flex: 1 }}>
                                <Dropdown
                                    placeholder="Year"
                                    fluid
                                    selection
                                    options={yearOptions}
                                    value={selectedYear}
                                    onChange={(e, { value }) => {
                                        setSelectedYear(value);
                                        setSelectedDay(''); // Reset day when year changes
                                    }}
                                />
                            </Form.Field>
                        </div>
                        <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
                            <Form.Field style={{ flex: 1 }}>
                                <Dropdown
                                    placeholder="Hour"
                                    fluid
                                    selection
                                    options={hourOptions}
                                    value={selectedHour}
                                    onChange={(e, { value }) => setSelectedHour(value)}
                                />
                            </Form.Field>
                            <Form.Field style={{ flex: 1 }}>
                                <Dropdown
                                    placeholder="Minutes"
                                    fluid
                                    selection
                                    options={minuteOptions}
                                    value={selectedMinute}
                                    onChange={(e, { value }) => setSelectedMinute(value)}
                                />
                            </Form.Field>
                            <Form.Field style={{ flex: 1 }}>
                                <Dropdown
                                    placeholder="AM/PM"
                                    fluid
                                    selection
                                    options={ampmOptions}
                                    value={selectedAmPm}
                                    onChange={(e, { value }) => setSelectedAmPm(value)}
                                />
                            </Form.Field>
                        </div>
                        <Button type="submit" color='teal'>
                            Add Event
                        </Button>
                    </Form>

                    <List divided relaxed style={{ marginTop: '2em' }}>
                        {events.map(event => (
                            <List.Item key={event.id}>
                                <List.Content>
                                    <List.Header>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                                <Icon
                                                    name={event.completed ? 'check circle' : 'circle outline'}
                                                    color={event.completed ? 'green' : 'grey'}
                                                    size='large'
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleToggleEvent(event.id)}
                                                />
                                                <Icon
                                                    name='leaf'
                                                    color={event.ecoFriendly ? 'green' : 'grey'}
                                                    size='large'
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleToggleEcoFriendly(event.id)}
                                                />
                                                <div>
                                                    <span style={{
                                                        textDecoration: event.completed ? 'line-through' : 'none',
                                                        color: event.completed ? '#999' : '#000'
                                                    }}>
                                                        {event.text}
                                                    </span>
                                                    <div style={{ fontSize: '0.9em', color: '#666' }}>
                                                        {new Date(event.date).toLocaleDateString()} at {formatTime(event.time)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Icon
                                                name='trash'
                                                color='red'
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDeleteEvent(event.id)}
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

export default Events; 