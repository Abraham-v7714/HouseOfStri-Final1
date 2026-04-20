import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartSubtotal } = useCart();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Checkout flow initiated. In a real app, this would integrate with Razorpay/Stripe.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-light mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Discover our exclusive collection of premium Indian and Western wear.</p>
        <Link to="/lookbook" className="bg-charcoal text-white px-8 py-4 rounded font-medium hover:bg-charcoal/90 transition-colors">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 md:pl-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 mt-4">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-charcoal">Checkout</span>
        </div>

        <h1 className="text-3xl font-light mb-12 tracking-wide">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <section>
                <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors" />
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors" />
                  <input required name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors md:col-span-2" />
                  <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors md:col-span-2" />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="address" value={formData.address} onChange={handleChange} placeholder="Address Line 1" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors md:col-span-2" />
                  <input required name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors" />
                  <input required name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors" />
                  <input required name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-charcoal transition-colors md:col-span-2" />
                </div>
              </section>

              {/* Notes */}
              <section>
                <h2 className="text-xl font-medium mb-6">Custom Measurement Notes or Special Requests</h2>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  placeholder="E.g., Please ensure the blouse length is 15 inches. I would like a deeper back neck." 
                  rows="4"
                  className="w-full border border-gray-200 p-4 rounded bg-transparent focus:outline-none focus:border-charcoal transition-colors resize-none"
                />
              </section>

              <button type="submit" className="w-full bg-charcoal text-white py-4 rounded font-medium tracking-wide uppercase hover:bg-charcoal/90 transition-colors flex justify-center items-center gap-2">
                Continue to Payment <ChevronRight size={18} />
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-gray-50/50 p-8 rounded border border-gray-100 sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={item.product.image || item.product.img || (item.product.images && item.product.images[0])} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-sm">
                      <h3 className="font-medium">{item.product.name}</h3>
                      {item.configuration?.blouse && <p className="text-xs text-gray-500 mt-1">Blouse: {item.configuration.blouse.name}</p>}
                      {item.configuration?.petticoat && <p className="text-xs text-gray-500">Petticoat: {item.configuration.petticoat.name}</p>}
                    </div>
                    <div className="font-medium text-sm">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 bg-white p-4 rounded border border-gray-200">
                <CheckCircle2 size={20} className="text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">100% Secure Payment</p>
                  <p className="text-xs text-gray-500 mt-1">Your payment information is processed securely. We use Razorpay for seamless transactions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
