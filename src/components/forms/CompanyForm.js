

'use client';

import React, { useEffect } from 'react';
import { useOnboarding } from '../../app/context/onboardingContext';

const CompanyForm = ({ errors = {} }) => {
  const { formData, updateMultipleFields } = useOnboarding();

  const fields = [
    { key: 'company_name', label: 'Company Name', required: true, placeholder: 'Enter your company name', colSpan: 'md:col-span-1' },
    { key: 'company_website', label: 'Website URL', placeholder: 'https://yourcompany.com', colSpan: 'md:col-span-1' },
    { key: 'industry', label: 'Industry', placeholder: 'e.g. Technology, Healthcare, Finance...', colSpan: 'md:col-span-1' },
    { key: 'company_mission_statement', label: 'Company Mission Statement', placeholder: 'Describe your company mission and values...', colSpan: 'md:col-span-2' },
    { key: 'company_bio', label: 'Company Bio', placeholder: 'Brief description of your company...', colSpan: 'md:col-span-1' },
    { key: 'growth_stages', label: 'Growth Stage', placeholder: 'e.g. startup, scaleup, enterprise...', colSpan: 'md:col-span-1' },
    { key: 'geographic_footprint', label: 'Geographic Footprint', placeholder: 'e.g. local, regional, national, global...', colSpan: 'md:col-span-2' },
    { key: 'geographic_details', label: 'Geographic Details', placeholder: 'Specific regions/countries you operate in...', colSpan: 'md:col-span-2' },
    { key: 'KPIs', label: 'Key Performance Indicators', placeholder: 'What metrics do you track for success?', colSpan: 'md:col-span-1' },
    { key: 'target_industries', label: 'Target Industries', placeholder: 'Which industries do you primarily serve?', colSpan: 'md:col-span-1' },
    { key: 'target_sub_industries', label: 'Target Sub-Industries', placeholder: 'Any specific sub-industries or niches?', colSpan: 'md:col-span-1' },
    { key: 'company_size', label: 'Company Size', placeholder: 'e.g. 1-10, 11-50, 50+', colSpan: 'md:col-span-1' }
  ];

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field.key] = formData.organizationData?.[field.key] || '';
      return acc;
    }, {});

    updateMultipleFields({
      organizationData: initialData
    });
  }, []); 

  const handleInputChange = (key, value) => {
    const sanitizedValue = value === undefined || value === null ? "" : value;
    
    const updatedData = {
      organizationData: {
        ...formData.organizationData,
        [key]: sanitizedValue
      }
    };
    
    updateMultipleFields(updatedData);
  };

  const handleBlur = (key, value) => {
    handleInputChange(key, value || "");
  };

  return (
    <div className='space-y-6'>
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">Competitive Context</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-black">
        {fields.map((field, index) => {
          const value = formData.organizationData?.[field.key] || '';
          const error = errors[field.key];

          return (
            <div
              key={field.key}
              className={`${field.colSpan} transition-all duration-300  animate-fade-in-up`}
              style={{ animationDelay: `${index * 100 + 600}ms` }}
            >
              <label className="block text-sm mb-2">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                onBlur={(e) => handleBlur(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-2 text-xs placeholder:text-sm backdrop-blur-sm border rounded-xl transition-all duration-300 resize-none ${
                  error ? 'border-red-500' : 'border-slate-600/50'
                }`}
              />
              {errors[field.key] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyForm;