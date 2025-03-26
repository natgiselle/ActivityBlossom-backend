import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            if (userData && userData.token) {
                localStorage.setItem('token', userData.token);
                navigate('/avatar-selection');
            } else {
                setErrors({ general: 'Login failed. Please try again.' });
            }
        },
        onError(err) {
            if (err.graphQLErrors && err.graphQLErrors[0]) {
                setErrors(err.graphQLErrors[0].extensions?.errors || {});
            } else {
                setErrors({ general: 'An error occurred. Please try again.' });
            }
        },
        variables: values
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        // Basic validation
        if (!values.username.trim()) {
            setErrors({ username: 'Username is required' });
            return;
        }
        if (!values.password) {
            setErrors({ password: 'Password is required' });
            return;
        }

        loginUser();
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        // Clear error when user starts typing
        if (errors[event.target.name]) {
            setErrors({ ...errors, [event.target.name]: undefined });
        }
    };

    return (
        <Grid textAlign='center' style={{ height: '60vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    🌸 Log in to your account
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
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password ? true : false}
                        />
                        <Button color='teal' fluid size='large'>
                            Login
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
                    New to us? <Link to="/register">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login; 