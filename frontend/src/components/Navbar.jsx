import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex justify-between items-center mb-6 pt-6"> 
            <Link to="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                Battery Inventory
            </Link>
            
            <div className="space-x-2">
                <Link to="/add" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">➕ Add New</Link>
                <Link to="/report" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">📊 View Report</Link>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">🚪 Logout</button>
            </div>
        </div>
    );
};

export default Navbar;