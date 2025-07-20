
import React, { useState } from 'react';
import { CardData, DesignOptions, LayoutOption, ColorScheme, FontOption } from '../types';
import { LAYOUT_OPTIONS, COLOR_SCHEMES, FONT_OPTIONS } from '../constants';
import { SparklesIcon, SpinnerIcon } from './Icons';
import { suggestTagline } from '../services/geminiService';

interface DesignerPanelProps {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  designOptions: DesignOptions;
  setDesignOptions: React.Dispatch<React.SetStateAction<DesignOptions>>;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

interface CustomRadioGroupProps<T> {
  options: T[];
  selected: T;
  onChange: (option: T) => void;
  renderOption: (option: T) => React.ReactNode;
  keyExtractor: (option: T) => string;
}

const CustomRadioGroup = <T,>({ options, selected, onChange, renderOption, keyExtractor }: CustomRadioGroupProps<T>) => (
  <div className="grid grid-cols-3 gap-2">
    {options.map(option => (
      <button
        key={keyExtractor(option)}
        type="button"
        onClick={() => onChange(option)}
        className={`text-center text-sm py-2 px-3 rounded-md transition-all duration-200 ${
          keyExtractor(selected) === keyExtractor(option)
            ? 'bg-sky-600 text-white shadow-md'
            : 'bg-white hover:bg-sky-50 text-gray-700'
        }`}
      >
        {renderOption(option)}
      </button>
    ))}
  </div>
);

const DesignerPanel: React.FC<DesignerPanelProps> = ({ cardData, setCardData, designOptions, setDesignOptions }) => {
  const [isSuggesting, setIsSuggesting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSuggestTagline = async () => {
    setIsSuggesting(true);
    const suggestion = await suggestTagline(cardData.company, cardData.title);
    setCardData(prev => ({ ...prev, tagline: suggestion }));
    setIsSuggesting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
      <Section title="Content">
        <input type="text" name="name" value={cardData.name} onChange={handleInputChange} placeholder="Name" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
        <input type="text" name="title" value={cardData.title} onChange={handleInputChange} placeholder="Title" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
        <input type="text" name="company" value={cardData.company} onChange={handleInputChange} placeholder="Company" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
        <input type="text" name="phone" value={cardData.phone} onChange={handleInputChange} placeholder="Phone" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
        <input type="email" name="email" value={cardData.email} onChange={handleInputChange} placeholder="Email" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
        <input type="text" name="website" value={cardData.website} onChange={handleInputChange} placeholder="Website" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
        <div className="relative">
          <input type="text" name="tagline" value={cardData.tagline} onChange={handleInputChange} placeholder="Tagline" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
          <button onClick={handleSuggestTagline} disabled={isSuggesting} className="absolute inset-y-0 right-0 flex items-center pr-3 text-sky-600 hover:text-sky-800 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSuggesting ? <SpinnerIcon /> : <SparklesIcon className="w-5 h-5" />}
          </button>
        </div>
      </Section>
      
      <div className="border-t border-gray-200"></div>

      <Section title="Layout">
        <CustomRadioGroup<LayoutOption>
          options={LAYOUT_OPTIONS}
          selected={designOptions.layout}
          onChange={option => setDesignOptions(prev => ({ ...prev, layout: option }))}
          renderOption={option => <>{option.name}</>}
          keyExtractor={option => option.id}
        />
      </Section>
      
      <div className="border-t border-gray-200"></div>

      <Section title="Color Scheme">
         <div className="grid grid-cols-5 gap-2">
            {COLOR_SCHEMES.map(scheme => (
              <button
                key={scheme.id}
                type="button"
                onClick={() => setDesignOptions(prev => ({ ...prev, colorScheme: scheme }))}
                className={`h-10 w-10 rounded-full ${scheme.bg} border-2 transition-transform duration-200 ${designOptions.colorScheme.id === scheme.id ? 'border-sky-500 scale-110' : 'border-transparent'}`}
                title={scheme.name}
              ></button>
            ))}
        </div>
      </Section>

      <div className="border-t border-gray-200"></div>
      
      <Section title="Font">
        <CustomRadioGroup<FontOption>
          options={FONT_OPTIONS}
          selected={designOptions.font}
          onChange={option => setDesignOptions(prev => ({ ...prev, font: option }))}
          renderOption={option => <span className={option.className}>{option.name}</span>}
          keyExtractor={option => option.id}
        />
      </Section>
    </div>
  );
};

export default DesignerPanel;
