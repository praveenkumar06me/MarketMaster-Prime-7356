import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {user.purchaseHistory.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {user.purchaseHistory.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {format(new Date(order.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">{order.status}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                      </div>
                      <div className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}