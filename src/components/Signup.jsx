import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
// pulling signup function from useAuth
    const { signup } = useAuth();
// error state
    const [error, setError] = useState('');
// loading state
const [loading, setLoading] = useState(false);


// handleSubmit function
const handleSubmit = async (e) => {
e.preventDefault()

// validation checks
if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    return setError('Passwords do not match!')
}
try {
    setError('')
    setLoading(true)
    await signup(emailRef.current.value, passwordRef.current.value)

} catch {
    setError('Failed to create an account!')
}
setLoading(false)
}

  return (
    <div className='signup'>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
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
                    <Form.Group id='password-confirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Log In!</Link>
        </div>

    </div>
  )
}
