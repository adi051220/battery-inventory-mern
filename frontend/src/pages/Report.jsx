import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Report = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            const res = await axios.get('http://localhost:5000/api/batteries/report', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setReport(res.data);
        };
        fetchReport();
    }, []);

    return (
        <div className="container mx-auto px-4 max-w-3xl pt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Battery Status Report</h2>
                <Link to="/dashboard" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">⬅️ Back to Dashboard</Link>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Status</th>
                            <th className="px-6 py-3 font-semibold">Count</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {report.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{row.status}</td>
                                <td className="px-6 py-4 text-gray-700 font-semibold">{row.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Report;