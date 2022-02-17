import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
// pulling signup function from useAuth
    const { login } = useAuth();
// error state
    const [error, setError] = useState('');
// loading state
const [loading, setLoading] = useState(false);

// navigate = useNavigate - for login redirect
const navigate = useNavigate();

// handleSubmit function
const handleSubmit = async (e) => {
e.preventDefault()
// no validation check needed

try {
    setError('')
    setLoading(true)
   await login(emailRef.current.value, passwordRef.current.value)
   navigate('/')

} catch {
    setError('Login Failed! Something went wrong...')
}
setLoading(false)
}

  return (
    <div className='signup'>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <Form onSubmit={handleSubmit} >
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w100 text-center mt-2">
        Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
        </div>

    </div>
  )
}
