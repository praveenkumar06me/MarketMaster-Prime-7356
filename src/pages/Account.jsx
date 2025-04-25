import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Account</h2>
          <button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <div className="space-y-3">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Address:</span> {user.address}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
            <div className="space-y-3">
              <p><span className="font-medium">Total Orders:</span> {user.purchaseHistory.length}</p>
              <p>
                <span className="font-medium">Total Spent:</span> $
                {user.purchaseHistory.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}