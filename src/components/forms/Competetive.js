
'use client';

import React, { useEffect } from 'react';
import { useOnboarding } from '../../app/context/onboardingContext';
import { Trash2Icon } from 'lucide-react';

const CompetitiveContextForm = () => {
  const { formData, updateMultipleFields } = useOnboarding();

  const fields = [
    { key: 'competitor_names', label: 'Competitor Names', placeholder: 'e.g. Anthropic, Google DeepMind' },
    { key: 'competitor_urls', label: 'Competitor URLs', placeholder: 'e.g. https://anthropic.com, https://deepmind.google' },
    { key: 'valuable_links', label: 'Valuable Research/Reference Links', placeholder: 'e.g. https://arxiv.org' },
  ];

  const createEmptyEntry = () => {
    return fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!formData.competitiveContextData || formData.competitiveContextData.length === 0) {
      updateMultipleFields({ competitiveContextData: [createEmptyEntry()] });
    } else {
      const updatedData = formData.competitiveContextData.map(entry => ({
        ...createEmptyEntry(),
        ...entry
      }));
      updateMultipleFields({ competitiveContextData: updatedData });
    }
  }, []);

  const competitiveContextData = formData.competitiveContextData || [createEmptyEntry()];

  const handleInputChange = (index, key, value) => {
    const updated = [...competitiveContextData];
    updated[index] = {
      ...updated[index],
      [key]: value || "",
    };
    updateMultipleFields({ competitiveContextData: updated });
  };

  const handleAddEntry = () => {
    updateMultipleFields({
      competitiveContextData: [...competitiveContextData, createEmptyEntry()]
    });
  };

  const handleDeleteEntry = (index) => {
    const updated = competitiveContextData.filter((_, i) => i !== index);
    updateMultipleFields({
      competitiveContextData: updated.length > 0 ? updated : [createEmptyEntry()]
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">Competitive Context</h2>
        <button
          onClick={handleAddEntry}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="max-h-[350px] overflow-y-auto space-y-6 pr-2">
        {competitiveContextData.map((entry, idx) => (
          <div
            key={idx}
            className="relative grid grid-cols-1 gap-3 p-4 border border-slate-300 rounded-xl bg-white w-full md:w-full"
          >
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm mb-2">{field.label}</label>
                <input
                  type="text"
                  value={entry[field.key] || ''}
                  onChange={(e) => handleInputChange(idx, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 text-sm placeholder:text-sm border border-slate-600/50 rounded-xl"
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

export default CompetitiveContextForm;