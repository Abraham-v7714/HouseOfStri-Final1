import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Search, Package, ArrowRight, Loader2, Calendar } from 'lucide-react';

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch for Orders (backend integration ready structure)
    const fetchOrders = async () => {
      try {
        // Fallback to empty array to show the beautiful empty state
        // In a real scenario: await fetch('/api/orders/mine', { headers: { Authorization: `Bearer ${token}` } })
        setTimeout(() => {
          setOrders([]); 
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center pt-24 pb-32">
        <Loader2 size={40} className="animate-spin text-charcoal mb-4" />
        <p className="font-light text-gray-500 tracking-wider uppercase text-sm">Loading Your History</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-light tracking-tight text-charcoal mb-3">Order History</h1>
          <p className="text-gray-500 font-light tracking-wide text-sm">
            Review your past purchases, track current shipments, and view custom tailoring requests.
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm text-center px-4">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Package size={36} className="text-gray-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-light text-charcoal mb-3 tracking-wide">No orders found</h2>
            <p className="text-gray-500 font-light mb-8 max-w-sm mx-auto text-[15px]">
              You haven't placed any orders yet. When you do, they will securely appear here along with their tracking status.
            </p>
            <Link 
              to="/shop" 
              className="px-8 py-3.5 bg-charcoal text-white rounded text-sm uppercase tracking-widest font-medium hover:bg-black transition-colors duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Active Orders Flow (UI ready for when data exists) */
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-0.5">Order ID</p>
                      <p className="text-sm font-medium text-charcoal">{order.id}</p>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-gray-400" />
                       <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-charcoal tracking-wide">
                      ₹{(order.total || 0).toLocaleString('en-IN')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                      order.status === 'Delivered' ? 'bg-sage/10 text-sage' : 
                      order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Order Items Mock Layout */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                       <img src={order.thumbnail} alt="Item" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{order.itemsQuantity} {order.itemsQuantity === 1 ? 'Item' : 'Items'}</p>
                      <button className="text-sm font-medium custom-underline hover:text-sage transition-colors flex items-center gap-1">
                        View Order Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
