

'use client';

import React, { useEffect } from 'react';
import { useOnboarding } from '../../app/context/onboardingContext';
import { Trash2Icon } from 'lucide-react';

const ProductServicesForm = () => {
  const { formData, updateMultipleFields } = useOnboarding();
  
  const fields = [
    {key:'product_name',label:'Product Name',placeholder:'e.g. cards'},
    { key: 'product_services_description', label: 'Product/Service Description', placeholder: 'e.g. GPT and Codex APIs' },
    { key: 'key_features', label: 'Key Features', placeholder: 'e.g. Text generation, Code writing' },
    { key: 'key_benefits', label: 'Key Benefits', placeholder: 'e.g. Productivity, Speed' },
    { key: 'differentiators', label: 'Differentiators', placeholder: 'e.g. Scale, Quality' },
    { key: 'pricing_tiers', label: 'Pricing Tiers', placeholder: 'e.g. Free, Pro, Enterprise' },
    { key: 'customer_persona', label: 'Customer Persona', placeholder: 'e.g. Developers, Businesses' },
  ];

  const createEmptyEntry = () => {
    return fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!formData.productServicesData || formData.productServicesData.length === 0) {
      updateMultipleFields({ productServicesData: [createEmptyEntry()] });
    } else {
      const updatedData = formData.productServicesData.map(entry => ({
        ...createEmptyEntry(),
        ...entry
      }));
      updateMultipleFields({ productServicesData: updatedData });
    }
  }, []);

  const productServicesData = formData.productServicesData || [createEmptyEntry()];

  const handleInputChange = (index, key, value) => {
    const updated = [...productServicesData];
    updated[index] = {
      ...createEmptyEntry(), 
      ...updated[index],    
      [key]: value || ""   
    };
    updateMultipleFields({ productServicesData: updated });
  };

  const handleAddEntry = () => {
    updateMultipleFields({ 
      productServicesData: [...productServicesData, createEmptyEntry()] 
    });
  };

  const handleDeleteEntry = (index) => {
    const updated = productServicesData.filter((_, i) => i !== index);
    updateMultipleFields({ 
      productServicesData: updated.length > 0 ? updated : [createEmptyEntry()] 
    });
  };

  return (
    <div className="space-y-6 text-black">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Product & Services</h2>
        <button
          onClick={handleAddEntry}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="max-h-[350px] overflow-y-auto space-y-6 pr-2">
        {productServicesData.map((entry, idx) => (
          <div
            key={idx}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-slate-300 rounded-xl bg-white"
          >
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs mb-2">{field.label}</label>
                <input
                  type="text"
                  value={entry[field.key] || ''}
                  onChange={(e) => handleInputChange(idx, field.key, e.target.value)}
                  onBlur={(e) => handleInputChange(idx, field.key, e.target.value || "")}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 placeholder:text-sm border border-slate-600/50 rounded-xl"
                />
              </div>
            ))}

            {idx > 0 && (
              <button
                onClick={() => handleDeleteEntry(idx)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100"
              >
                <Trash2Icon size={16} color='red'/>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductServicesForm;