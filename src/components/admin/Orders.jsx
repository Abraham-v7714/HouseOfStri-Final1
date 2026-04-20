import React, { useState } from 'react';
import { Search, Eye, X, Mail, Phone, Calendar, MapPin } from 'lucide-react';

const MOCK_ORDERS = [
  { id: '#ORD-7089', customer: 'Ananya Sharma', date: '2026-04-18', total: 24500, status: 'New Request', notes: 'Please ensure the blouse length is 15 inches. I would like a deeper back neck with custom doris.' },
  { id: '#ORD-7088', customer: 'Priya Patel', date: '2026-04-17', total: 42000, status: 'In Production', notes: 'Shapewear petticoat required. Need the standard fluted sleeves slightly longer by 2 inches.' },
  { id: '#ORD-7087', customer: 'Sarah Khan', date: '2026-04-15', total: 18500, status: 'Ready for Trial', notes: 'No special requests, standard processing.' },
  { id: '#ORD-7086', customer: 'Neha Singh', date: '2026-04-14', total: 65000, status: 'Dispatched', notes: 'Bridal rush order. Double check the zardosi work near the waist.' },
  { id: '#ORD-7085', customer: 'Sonia Gupta', date: '2026-04-12', total: 12500, status: 'Pending', notes: 'Requested an additional dupatta styling for the event.' },
];

const STATUS_COLORS = {
  'New Request': 'bg-blue-50 text-blue-700 border-blue-100',
  'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-100',
  'In Production': 'bg-purple-50 text-purple-700 border-purple-100',
  'Ready for Trial': 'bg-orange-50 text-orange-700 border-orange-100',
  'Dispatched': 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = MOCK_ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer Name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer Name</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-charcoal">{order.id}</td>
                  <td className="px-6 py-4 text-gray-800">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    <div className="flex items-center gap-2"><Calendar size={12} /> {order.date}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-medium border ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-sage bg-sage/10 hover:bg-sage/20 px-3 py-1.5 rounded transition-colors"
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar relative">
            
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium text-gray-800 flex items-center gap-3">
                  {selectedOrder.id}
                  <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border ${STATUS_COLORS[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">Placed on {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 border border-gray-100 rounded-xl p-5">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Customer Profile</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    {selectedOrder.customer}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} /> {selectedOrder.customer.toLowerCase().replace(' ','')}@example.com
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone size={14} /> +91 98765 43210
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Shipping Information</h3>
                  <div className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span>Flat 401, Brigade Orchards<br/>Devanahalli, Bangalore<br/>Karnataka 562110</span>
                  </div>
                </div>
              </div>

              {/* CRITICAL: Custom Measurement Notes */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-charcoal uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage"></span> Custom Measurement Notes or Special Requests
                </h3>
                <div className="bg-[#fffdf7] border border-[#f0e6d2] rounded-xl p-5 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap italic">
                    "{selectedOrder.notes}"
                  </p>
                </div>
              </div>

              {/* Action Buttons (Mock) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal flex-1 max-w-[200px]">
                  <option>Update Status...</option>
                  <option>Mark In Production</option>
                  <option>Mark Ready for Trial</option>
                  <option>Mark Dispatched</option>
                </select>
                <button className="px-6 py-2 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors ml-auto shadow-sm">
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
