import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';
import { Plus, Search, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import CloudinaryUploader from './CloudinaryUploader';

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  // Product Form State
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Bridal');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [addOns, setAddOns] = useState([]);
  
  // UI Feedback State
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleImagesChange = (urls) => {
    setProductImages(urls);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Bridal');
    setDescription('');
    setBasePrice('');
    setQuantity('');
    setProductImages([]);
    setAddOns([]);
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch(`${API_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'info', message: 'Saving product...' });

    const productData = {
      name,
      category,
      description,
      basePrice: Number(basePrice),
      quantity: Number(quantity),
      images: Array.isArray(productImages) ? productImages : [],
      addOns: addOns.filter(a => a.name.trim() !== '').map(a => ({ name: a.name, price: Number(a.price) }))
    };

    console.log("📦 SENDING DATA:", productData);

    try {
      const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'save'} product`);
      }

      setSubmitStatus({ type: 'success', message: `Product ${editingId ? 'Updated' : 'Saved'} Successfully!` });
      fetchProducts(); // Refresh inventory list with the new product
      
      setTimeout(() => {
        setIsModalOpen(false);
        resetForm();
        setSubmitStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitStatus({ type: 'error', message: error.message || 'An error occurred while saving' });
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setCategory(product.category || 'Bridal');
    setDescription(product.description || '');
    setBasePrice(product.basePrice || '');
    setQuantity(product.quantity || 0);
    setProductImages(product.images || []);
    setAddOns(product.addOns ? product.addOns.map(a => ({ id: crypto.randomUUID(), ...a })) : []);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOnChange = (index, field, value) => {
    const updated = [...addOns];
    updated[index][field] = field === 'price' ? Number(value) : value;
    setAddOns(updated);
  };

  const handleRemoveAddOn = (index) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  const handleAddNewAddOn = () => {
    setAddOns([...addOns, { id: crypto.randomUUID(), name: '', price: 0 }]);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all shadow-sm"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button 
          onClick={() => {
            setProductImages([]);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-center">Quantity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loadingProducts ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    <Loader2 className="animate-spin mx-auto mb-2 text-charcoal" />
                    Loading inventory...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    No products found. Click "Add New Product" to create one.
                  </td>
                </tr>
              ) : (
                products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={product.images && product.images.length > 0 ? product.images[0] : ''} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">₹{(product.basePrice || 0).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${product.quantity > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 text-gray-400">
                        <button onClick={() => handleEdit(product)} className="hover:text-charcoal transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(product._id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar relative">
            <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-800">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button 
                onClick={() => { setIsModalOpen(false); resetForm(); setSubmitStatus({ type: '', message: '' }); }} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {submitStatus.message && (
              <div className={`m-6 p-4 rounded-lg text-sm font-medium ${
                submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                submitStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form className="px-6 pb-6 space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Basic Info */}
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Product Name</label>
                        <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white transition-colors" placeholder="e.g. Royal Silk Saree" />
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white transition-colors">
                          <option value="Bridal">Bridal</option>
                          <option value="Saree">Saree</option>
                          <option value="Western Wear">Western Wear</option>
                          <option value="Semi-Bridal">Semi-Bridal</option>
                        </select>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white transition-colors resize-none" placeholder="Product description..."></textarea>
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Base Price (₹)</label>
                        <input required value={basePrice} onChange={e => setBasePrice(e.target.value)} type="number" min="0" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white transition-colors" placeholder="0" />
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Quantity Available</label>
                        <input required value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="0" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white transition-colors" placeholder="0" />
                      </div>
                    </div>
                  </section>

                  <section className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 className="text-sm font-semibold tracking-wider text-charcoal uppercase mb-4">Add-On Configuration</h3>
                    <div className="space-y-3">
                      {addOns.length === 0 ? (
                        <div className="text-center py-6 bg-white rounded-lg border border-gray-200 border-dashed">
                          <p className="text-sm text-gray-500 font-medium">No add-ons configured. Click below to add one.</p>
                        </div>
                      ) : (
                        addOns.map((addon, idx) => (
                          <div key={addon.id || idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3 transition-all filter text-sm">
                            <div className="flex-1">
                              <input 
                                type="text" 
                                value={addon.name} 
                                onChange={(e) => handleAddOnChange(idx, 'name', e.target.value)} 
                                placeholder="Add-on Name (e.g. Scallop Embroidery)" 
                                className="w-full bg-gray-50 border border-gray-100 rounded px-3 py-2 text-charcoal focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all placeholder:text-gray-400"
                              />
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded px-3 py-2 focus-within:ring-1 focus-within:ring-sage focus-within:border-sage transition-all">
                              <span className="text-gray-400 font-medium">₹</span>
                              <input 
                                type="number" 
                                min="0" 
                                value={addon.price || ''} 
                                onChange={(e) => handleAddOnChange(idx, 'price', e.target.value)} 
                                placeholder="0"
                                className="w-20 bg-transparent border-none focus:outline-none text-charcoal p-0"
                              />
                            </div>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveAddOn(idx)} 
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                              title="Delete Add-on"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                      
                      <button 
                        type="button" 
                        onClick={handleAddNewAddOn}
                        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:bg-white hover:border-sage hover:text-sage transition-colors"
                      >
                        <Plus size={16} /> Add New Add-on
                      </button>
                    </div>
                  </section>
                </div>

                {/* Right Side: Image Uploader */}
                <div className="lg:col-span-1 border-l border-gray-100 lg:pl-8">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-4">Product Gallery</h3>
                  <p className="text-[10px] text-gray-500 mb-4">Upload up to 5 high-resolution portraits. The first image will be the primary thumbnail.</p>
                  
                  <CloudinaryUploader 
                    onImagesChange={handleImagesChange} 
                    initialImages={productImages}
                  />

                  <div className="mt-8 pt-8 border-t border-gray-100">
                     <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Upload Progress</span>
                        <span>{productImages.length}/5</span>
                     </div>
                     <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sage transition-all duration-500" 
                          style={{ width: `${(productImages.length / 5) * 100}%` }}
                        ></div>
                     </div>
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-8 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={submitStatus.type === 'info'} className="px-8 py-2.5 rounded-lg text-sm font-medium bg-charcoal text-white hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
