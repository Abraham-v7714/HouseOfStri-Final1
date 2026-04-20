import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CloudinaryUploader Component (Supports Multiple Uploads - Max 5)
 * @param {Function} onImagesChange - Callback passing the array of image URLs
 * @param {Array} initialImages - Initial array of image URLs
 */
const CloudinaryUploader = ({ onImagesChange, initialImages = [] }) => {
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_IMAGES = 5;

  const handleUpload = async (file) => {
    if (!file) return;
    if (images.length >= MAX_IMAGES) {
      setError(`Maximum limit of ${MAX_IMAGES} images reached.`);
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Connects to our bespoke Node.js server via proxy
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newUrl = response.data.secure_url;
      const updatedImages = [...images, newUrl];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (err) {
      console.error('Upload Error:', err);
      const errorMessage = err.response?.data?.error || 'Connection failed. Please ensure the backend server is running.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onImagesChange(updatedImages);
    if (updatedImages.length < MAX_IMAGES) setError('');
  };

  return (
    <div className="space-y-4">
      {/* Scrollable Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <AnimatePresence>
          {images.map((url, idx) => (
            <motion.div
              key={url + idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group"
            >
              <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 p-1.5 bg-white/90 backdrop-blur rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-white/60 backdrop-blur-sm py-1 px-2 text-[8px] font-bold text-charcoal uppercase tracking-tighter">
                Image {idx + 1}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Upload Trigger (Only show if under limit) */}
        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => !loading && fileInputRef.current?.click()}
            disabled={loading}
            className={`relative aspect-[3/4] border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
              dragActive 
                ? 'border-charcoal bg-gray-50 shadow-inner' 
                : 'border-gray-200 bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(e.dataTransfer.files[0]); }}
          >
            {loading ? (
              <Loader2 size={24} className="text-charcoal animate-spin" />
            ) : (
              <>
                <Upload size={20} className="text-gray-400 mb-1" />
                <span className="text-[10px] font-medium text-gray-500">Add More</span>
                <span className="text-[8px] text-gray-400">{images.length}/{MAX_IMAGES}</span>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              disabled={loading}
            />
          </button>
        )}
      </div>

      {/* Connection / Limit Errors */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 font-medium"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dropzone (Shown only when empty for emphasis) */}
      {images.length === 0 && !loading && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
        >
           <Upload size={32} className="text-gray-300 mb-2" />
           <p className="text-sm font-medium text-gray-500">Drag & Drop Product Portraits</p>
           <p className="text-[10px] text-gray-400">Up to 5 high-resolution images</p>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploader;
