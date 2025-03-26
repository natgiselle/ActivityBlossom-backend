import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';

const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            if (userData && userData.token) {
                localStorage.setItem('token', userData.token);
                navigate('/avatar-selection');
            } else {
                setErrors({ general: 'Registration failed. Please try again.' });
            }
        },
        onError(err) {
            if (err.graphQLErrors && err.graphQLErrors[0]) {
                setErrors(err.graphQLErrors[0].extensions?.errors || {});
            } else {
                setErrors({ general: 'An error occurred. Please try again.' });
            }
        },
        variables: {
            registerInput: {
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        // Basic validation
        if (!values.username.trim()) {
            setErrors({ username: 'Username is required' });
            return;
        }
        if (!values.email.trim()) {
            setErrors({ email: 'Email is required' });
            return;
        }
        if (!values.password) {
            setErrors({ password: 'Password is required' });
            return;
        }
        if (values.password.length < 6) {
            setErrors({ password: 'Password must be at least 6 characters long' });
            return;
        }
        if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        registerUser();
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        // Clear error when user starts typing
        if (errors[event.target.name]) {
            setErrors({ ...errors, [event.target.name]: undefined });
        }
    };

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    🌱 Create your account
                </Header>
                <Form size='large' onSubmit={handleSubmit} loading={loading} error={Object.keys(errors).length > 0}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            error={errors.username ? true : false}
                        />
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email ? true : false}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password ? true : false}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                            name='confirmPassword'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword ? true : false}
                        />
                        <Button color='teal' fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                    {Object.keys(errors).length > 0 && (
                        <Message error>
                            <ul className="list">
                                {Object.values(errors).map((value, index) => (
                                    <li key={index}>{value}</li>
                                ))}
                            </ul>
                        </Message>
                    )}
                </Form>
                <Message>
                    Already have an account? <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Register; 