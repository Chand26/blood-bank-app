import React from 'react';
import AddDonor from './components/AddDonor';
import DonorList from './components/DonorList';
import './App.css'; // Import CSS for additional styling
import bloodbankpic from '../src/image.png';

const App = () => {
    return (
        <div className="container">
            <header>
                <h1>Blood Bank Management System</h1>
                <img src={bloodbankpic} alt="bloodbankpic" className="bloodbankpic"></img>
            </header>
            <AddDonor />
            <DonorList />
        
        </div>
    );
};

export default App;
