import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
    const emailRef = useRef();
// pulling signup function from useAuth
    const { resetPassword } = useAuth();
// error state
    const [error, setError] = useState('');
// loading state
const [loading, setLoading] = useState(false);
// message state 
const [message, setMessage] = useState('')


// handleSubmit function
const handleSubmit = async (e) => {
e.preventDefault()
// no validation check needed

try {
    setError('')
    setLoading(true)
   await resetPassword(emailRef.current.value)
   setMessage('Email Sent! Check Your Inbox for Instructions.')

} catch {
    setError('Failed to Reset Password')
}
setLoading(false)
}

  return (
    <div className='signup'>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                {message && <Alert variant='success'>{message}</Alert> }
                <Form onSubmit={handleSubmit} >
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Reset Password</Button>
                </Form>
                <div className="w100 text-center mt-3">
                    <Link to={"/login"}>Or Back to Log In</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w100 text-center mt-2">
        Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
        </div>

    </div>
  )
}
