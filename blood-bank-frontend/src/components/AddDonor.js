//bank-bank-frontend/src/components/AddDonor.js

import React, { useState } from 'react';
import axios from 'axios';

const AddDonor = ({ onAddDonor }) => {
    const [name, setName] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [donationDate, setDonationDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if fields are filled
        if (!name || !bloodType || !contactInfo || !donationDate) {
            alert("Please fill in all fields.");
            return;
        }

        const donor = { name, blood_type: bloodType, contact_info: contactInfo, donation_date: donationDate }; // Ensure the keys match your backend

        try {
            const response = await axios.post('http://localhost:5000/api/donors', donor);
            onAddDonor(response.data); // Use response data for the new donor
            // Reset form fields
            setName('');
            setBloodType('');
            setContactInfo('');
            setDonationDate('');
        } catch (error) {
            console.error('Error adding donor', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Donor</h1>
            <input
                type="text"
                placeholder="Donor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
            >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>
            <input
                type="text"
                placeholder="Contact Info"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
            />
            <input
                type="date"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
                required
            />
            <button type="submit">Add Donor</button>
        </form>
    );
};

export default AddDonor;
