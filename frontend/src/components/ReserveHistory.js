import React, { useState } from 'react';
import API from '../services/api';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [nicNo, setNicNo] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await API.post('/users/register', {
                name,
                email,
                password,
                contactNo,
                nicNo,
            });
            const { token } = response.data;
            localStorage.setItem('userToken', token);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => (window.location.href = '/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold text-darkBlue mb-4">Sign Up</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    placeholder="Contact Number"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={nicNo}
                    onChange={(e) => setNicNo(e.target.value)}
                    placeholder="NIC Number"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                />
            </div>
            <button
                onClick={handleSignUp}
                className="w-full bg-primaryBlue text-white p-2 rounded hover:bg-darkBlue"
            >
                Sign Up
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
            <p className="mt-2 text-darkBlue">
                Already have an account? <a href="/login" className="text-secondaryGreen">Login</a>
            </p>
        </div>
    );
};

export default SignUp;