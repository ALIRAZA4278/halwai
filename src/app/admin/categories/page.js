'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const { data } = await supabase
        .from('subcategories')
        .select('*, categories(name, display_name)')
        .order('display_order', { ascending: true });
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ is_active: !currentStatus })
        .eq('id', categoryId);

      if (error) throw error;

      setCategories(categories.map(cat =>
        cat.id === categoryId ? { ...cat, is_active: !currentStatus } : cat
      ));
      alert('Category status updated!');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category');
    }
  };

  const toggleSubcategoryStatus = async (subcategoryId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('subcategories')
        .update({ is_active: !currentStatus })
        .eq('id', subcategoryId);

      if (error) throw error;

      setSubcategories(subcategories.map(subcat =>
        subcat.id === subcategoryId ? { ...subcat, is_active: !currentStatus } : subcat
      ));
      alert('Subcategory status updated!');
    } catch (error) {
      console.error('Error updating subcategory:', error);
      alert('Failed to update subcategory');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
          <p className="text-gray-600 mt-1">Manage product categories and subcategories</p>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Main Categories</h3>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading categories...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FDF4E3]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-[#FDF4E3]">
                      <td className="px-6 py-4 text-2xl">
                        {category.icon || '📁'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {category.display_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {category.display_order}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            category.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {category.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleCategoryStatus(category.id, category.is_active)}
                          className={`px-3 py-1 rounded-lg font-medium transition ${
                            category.is_active
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {category.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Subcategories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Subcategories</h3>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading subcategories...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FDF4E3]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subcategories.map((subcategory) => (
                    <tr key={subcategory.id} className="hover:bg-[#FDF4E3]">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {subcategory.categories?.display_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {subcategory.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {subcategory.display_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {subcategory.display_order}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subcategory.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {subcategory.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleSubcategoryStatus(subcategory.id, subcategory.is_active)}
                          className={`px-3 py-1 rounded-lg font-medium transition ${
                            subcategory.is_active
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {subcategory.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2">ℹ️ About Categories</h4>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Categories and subcategories are defined in your database schema</li>
            <li>You can activate/deactivate them to show/hide from the storefront</li>
            <li>Products are organized under these categories</li>
            <li>To add new categories, run the appropriate SQL commands in Supabase</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
