//bank-bank-frontend/src/components/EditDonor.js
import React, { useState } from 'react';

const EditDonor = ({ donor, onUpdate }) => {
    const [name, setName] = useState(donor.name);
    const [bloodType, setBloodType] = useState(donor.blood_type);
    const [contactInfo, setContactInfo] = useState(donor.contact_info);
    const [donationDate, setDonationDate] = useState(donor.donation_date.split('T')[0]); // Format for input

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedDonor = {
            ...donor,
            name,
            blood_type: bloodType,
            contact_info: contactInfo,
            donation_date: donationDate
        };
        onUpdate(updatedDonor);
    };

    return (
        <form onSubmit={handleUpdate}>
            <h1>Edit Donor</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
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
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Contact Info"
                required
            />
            <input
                type="date"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
                required
            />
            <button type="submit">Update Donor</button>
            <button type="button" onClick={() => onUpdate(null)}>Cancel</button> {/* Cancel action */}
        </form>
    );
};

export default EditDonor;
