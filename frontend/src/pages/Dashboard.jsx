import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [batteries, setBatteries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBatteries = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5000/api/batteries', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBatteries(res.data);
                setError('');
            } catch (err) {
                setError('Failed to load inventory data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBatteries();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this battery?')) {
            try {
                await axios.delete(`http://localhost:5000/api/batteries/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBatteries(batteries.filter(battery => battery._id !== id));
            } catch (err) {
                alert('Failed to delete battery.');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <Navbar />
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

            <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                {loading ? (
                    <div className="text-center p-8 text-gray-500">Loading inventory...</div>
                ) : batteries.length === 0 ? (
                    <div className="text-center p-8 text-gray-500">No batteries found in the inventory. Add one to get started.</div>
                ) : (
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Tracking ID</th>
                                <th className="px-6 py-3 font-semibold">Battery Type</th>
                                <th className="px-6 py-3 font-semibold">Current Status</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {batteries.map((battery) => (
                                <tr key={battery._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500">{battery._id.substring(0, 8)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{battery.battery_type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                            ${battery.status === 'Available' ? 'bg-green-100 text-green-800' : 
                                              battery.status === 'Under Maintenance' ? 'bg-red-100 text-red-800' : 
                                              'bg-gray-100 text-gray-800'}`}>
                                            {battery.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link to={`/edit/${battery._id}`} className="inline-block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1 rounded text-sm font-medium transition-colors">✏️ Edit</Link>
                                        <button onClick={() => handleDelete(battery._id)} className="inline-block border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-medium transition-colors">🗑️ Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;