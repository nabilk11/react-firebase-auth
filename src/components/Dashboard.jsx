import { useAuth } from '../contexts/AuthContext';
import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    // error state hook
    const [error, setError] = useState('');
    // brought currentuser & logout function from authcontext
    const { currentUser, logout } = useAuth();

    // navigate = useNavigate - handles redirects
    const navigate = useNavigate();

    // logout handling
    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('/login')
            
        } catch (error) {
            setError('Logout has Failed!')
            
        }

    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <strong>Email:</strong> {currentUser.email}
                <Link to={'/update-profile'} className='btn btn-primary w-100 mt-3'>
                Update Profile    
                </Link> 
            </Card.Body>
        </Card>
        <div className="w100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>

        </div>
    </>
  )
}
