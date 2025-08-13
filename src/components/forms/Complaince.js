

'use client';

import React, { useEffect } from 'react';
import { useOnboarding } from '../../app/context/onboardingContext';

const ComplianceSettingsForm = () => {
  const { formData, updateMultipleFields } = useOnboarding();

  const fields = [
    {
      key: 'gdpr_compliance_required',
      label: 'GDPR Compliance Required',
      type: 'checkbox',
      colSpan: 'md:col-span-1',
      defaultValue: false
    },
    {
      key: 'ccpa_compliance_required',
      label: 'CCPA Compliance Required',
      type: 'checkbox',
      colSpan: 'md:col-span-1',
      defaultValue: false
    },
    {
      key: 'consent_requirements',
      label: 'Consent Requirements',
      placeholder: 'e.g. Explicit user consent required',
      type: 'text',
      colSpan: 'md:col-span-1',
      defaultValue: ''
    },
    {
      key: 'data_usage_policies',
      label: 'Data Usage Policies',
      placeholder: 'e.g. Data is anonymized',
      type: 'text',
      colSpan: 'md:col-span-1',
      defaultValue: ''
    },
    {
      key: 'financial_compliance_rules',
      label: 'Financial Compliance Rules',
      placeholder: 'e.g. ISO 27001',
      type: 'text',
      colSpan: 'md:col-span-1',
      defaultValue: ''
    },
    {
      key: 'healthcare_compliance_rules',
      label: 'Healthcare Compliance Rules',
      placeholder: 'e.g. HIPAA',
      type: 'text',
      colSpan: 'md:col-span-1',
      defaultValue: ''
    },
    {
      key: 'other_industry_compliance',
      label: 'Other Industry Compliance',
      placeholder: 'e.g. SOC 2, None',
      type: 'text',
      colSpan: 'md:col-span-1',
      defaultValue: ''
    },
    {
      key: 'compliance_notes',
      label: 'Compliance Notes',
      placeholder: 'e.g. Audited quarterly',
      type: 'text',
      colSpan: 'md:col-span-1',
      defaultValue: ''
    },
  ];

  useEffect(() => {
    if (!formData.complianceSettingsData) {
      const initialData = {};
      fields.forEach(field => {
        initialData[field.key] = field.defaultValue;
      });
      updateMultipleFields({ complianceSettingsData: initialData });
    }
  }, []);

  const handleInputChange = (key, value) => {
    const currentValue = formData.complianceSettingsData?.[key];
    let newValue = value;
    
    if (typeof currentValue === 'boolean') {
      newValue = typeof value === 'boolean' ? value : Boolean(value);
    }
    else if (value === null || value === undefined) {
      newValue = '';
    }

    updateMultipleFields({
      complianceSettingsData: {
        ...formData.complianceSettingsData,
        [key]: newValue
      },
    });
  };

  const getFieldValue = (key, defaultValue) => {
    return formData.complianceSettingsData?.[key] ?? defaultValue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black">
      {fields.map((field, index) => (
        <div
          key={field.key}
          className={`${field.colSpan} transition-all duration-300 animate-fade-in-up`}
          style={{ animationDelay: `${index * 100 + 600}ms` }}
        >
          <label className="block text-sm mb-2">
            {field.label}
          </label>

          {field.type === 'checkbox' ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={getFieldValue(field.key, field.defaultValue)}
                onChange={(e) => handleInputChange(field.key, e.target.checked)}
                className="w-5 h-5 text-xs"
              />
              <span className="text-xs">{field.label}</span>
            </div>
          ) : (
            <input
              type="text"
              value={getFieldValue(field.key, field.defaultValue)}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 text-xs placeholder:text-sm backdrop-blur-sm border border-slate-600/50 rounded-xl transition-all duration-300 resize-none"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplianceSettingsForm;