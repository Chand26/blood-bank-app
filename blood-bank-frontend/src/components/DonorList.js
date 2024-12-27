//bank-bank-frontend/src/components/DonorList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDonor from './EditDonor';

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [editDonor, setEditDonor] = useState(null);

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/donors');
            setDonors(response.data);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    // Updated handleDelete function with confirmation
    const handleDelete = async (donorId) => {
        if (window.confirm('Are you sure you want to delete this donor?')) {
            try {
                await axios.delete(`http://localhost:5000/api/donors/${donorId}`);
                fetchDonors(); // Refresh the donor list after deletion
            } catch (error) {
                console.error('Error deleting donor:', error);
            }
        }
    };


    const handleEdit = (donor) => {
        setEditDonor(donor);
    };

    const handleUpdate = async (updatedDonor) => {
        try {
            await axios.put(`http://localhost:5000/api/donors/${updatedDonor.donor_id}`, updatedDonor);
            fetchDonors(); // Refresh the donor list after updating
        } catch (error) {
            console.error('Error updating donor:', error);
        }
        setEditDonor(null);
    };

    return (
       
        <div>
           
            <h1> Donor List </h1> 
            {editDonor ? (
                <EditDonor donor={editDonor} onUpdate={handleUpdate} />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blood Type</th>
                            <th>Contact Info</th>
                            <th>Donation Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor) => (
                            <tr key={donor.donor_id}>
                                <td>{donor.name}</td>
                                <td>{donor.blood_type}</td>
                                <td>{donor.contact_info}</td>
                                <td>{new Date(donor.donation_date).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleDelete(donor.donor_id)}>Delete</button>
                                    <button onClick={() => handleEdit(donor)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              
            )}
            
        </div>
        
        
    );
};

export default DonorList;
