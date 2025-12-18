'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    base_price: '',
    description: '',
    category: '',
    subcategory: '',
    tag: '',
    image_url: '',
    variants: [],
  });

  const [variant, setVariant] = useState({ size: '', price: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
    } else {
      setSubcategories([]);
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
  }, [formData.category]);

  const fetchCategories = async () => {
    try {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryName) => {
    try {
      console.log('🔍 Fetching subcategories for category:', categoryName);

      const { data: categoryData, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (catError) {
        console.error('❌ Error finding category:', catError);
        return;
      }

      console.log('✅ Found category ID:', categoryData?.id);

      if (categoryData) {
        const { data, error: subError } = await supabase
          .from('subcategories')
          .select('*')
          .eq('category_id', categoryData.id)
          .order('display_order', { ascending: true });

        if (subError) {
          console.error('❌ Error fetching subcategories:', subError);
          return;
        }

        console.log('✅ Subcategories found:', data?.length || 0);
        console.log('Subcategories:', data);
        setSubcategories(data || []);
      }
    } catch (error) {
      console.error('❌ Error fetching subcategories:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      setUploadingImage(true);
      console.log('📤 Starting image upload...');
      console.log('File:', imageFile.name, 'Size:', imageFile.size, 'bytes');

      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading to:', filePath);

      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('❌ Upload Error:', uploadError);
        console.error('Error message:', uploadError.message);
        console.error('Error details:', uploadError);
        throw uploadError;
      }

      console.log('✅ Upload successful!', data);

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log('✅ Public URL:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      alert(`Failed to upload image: ${error.message || 'Unknown error'}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddVariant = () => {
    if (variant.size && variant.price) {
      setFormData({
        ...formData,
        variants: [...formData.variants, { size: variant.size, price: variant.price, available: true }],
      });
      setVariant({ size: '', price: '' });
    }
  };

  const handleRemoveVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image if selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      const productData = {
        name: formData.name,
        base_price: parseFloat(formData.base_price),
        description: formData.description,
        category: formData.category ? formData.category.toUpperCase() : null,
        subcategory: formData.subcategory ? formData.subcategory.toUpperCase() : null,
        tag: formData.tag || null,
        image_url: imageUrl,
        variants: formData.variants,
      };

      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) throw error;

      alert('Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600 mt-1">Fill in the details to add a new product</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price (RS) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag (Optional)
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                  >
                    <option value="">No Tag</option>
                    <option value="NEW">New</option>
                    <option value="BESTSELLER">Bestseller</option>
                    <option value="TRENDING">Trending</option>
                    <option value="SPECIAL">Special</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.display_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory (Optional)
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  disabled={!formData.category || subcategories.length === 0}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none disabled:bg-gray-100"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat.id} value={subcat.name}>
                      {subcat.display_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <div className="w-48 h-48 relative rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Variants (Optional)</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) => setVariant({ ...variant, size: e.target.value })}
                    placeholder="Variant size (e.g., 500g, 1kg)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    step="0.01"
                    value={variant.price}
                    onChange={(e) => setVariant({ ...variant, price: e.target.value })}
                    placeholder="Price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234433] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                  >
                    Add Variant
                  </button>
                </div>
              </div>

              {formData.variants.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Added Variants:</p>
                  <div className="space-y-2">
                    {formData.variants.map((v, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-[#FDF4E3] p-3 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">
                          {v.size} - Rs {v.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="bg-[#234433] hover:bg-[#1a3329] disabled:bg-orange-300 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? 'Adding Product...' : uploadingImage ? 'Uploading Image...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
