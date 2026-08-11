import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddBattery = () => {
    const [batteryType, setBatteryType] = useState('');
    const [status, setStatus] = useState('Available');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:5000/api/batteries', 
                { battery_type: batteryType, status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            navigate('/dashboard');
        } catch (error) {
            console.error("Failed to add battery:", error);
            alert("Could not add battery. Please check your connection or login again.");
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mt-16 border border-gray-200">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Battery</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Battery Type</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
                            placeholder="e.g. Lithium-ion" 
                            value={batteryType} 
                            onChange={(e) => setBatteryType(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)} 
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="In-Use">In-Use</option>
                            <option value="Charged">Charged</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors mt-4">
                        Add Battery
                    </button>
                </form>
                <div className="text-center mt-6">
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 font-medium text-sm">⬅️ Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

export default AddBattery;