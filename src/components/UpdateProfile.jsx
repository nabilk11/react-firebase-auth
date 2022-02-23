import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
// pulling currentUser function from useAuth
    const { currentUser, updateEmail, updatePassword } = useAuth();
// error state
    const [error, setError] = useState('');
// loading state
const [loading, setLoading] = useState(false);

// navigate = useNavigate - for login redirect
const navigate = useNavigate();

// handleSubmit function 
const handleSubmit = (e) => {
e.preventDefault()

// validation checks
if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    return setError('Passwords do not match!')
}
// create empty array of promises
const promises = []
setLoading(true)
setError("")
if (emailRef.current.value !== currentUser.email) {
    promises.push(updateEmail(emailRef.current.value))
}
if (passwordRef.current.value) {
    promises.push(updatePassword(passwordRef.current.value))
} 
//Promise
Promise.all(promises).then(() => {
    navigate('/dashboard')
}).catch(() => {  
    setError('Failed to Update Account')
}).finally(() => {
    setLoading(false)
})
}


  return (
    <div className='signup'>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <Form onSubmit={handleSubmit} >
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required 
                        defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef}  
                        placeholder='Leave blank to keep the same' />
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef}  
                        placeholder='Leave blank to keep the same' />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w100 text-center mt-2">
        <Link to={"/dashboard"}>Cancel</Link>
        </div>
    </div>
  )
}
