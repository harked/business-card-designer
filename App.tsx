
import React, { useState } from 'react';
import DesignerPanel from './components/DesignerPanel';
import CardPreview from './components/CardPreview';
import { CardData, DesignOptions } from './types';
import { LAYOUT_OPTIONS, COLOR_SCHEMES, FONT_OPTIONS } from './constants';
import { LogoPlaceholderIcon } from './components/Icons';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: 'Tan Pang',
    title: 'Chef',
    company: 'Harked Inc.',
    phone: '+6289012345',
    email: 'tan.pang@google.com',
    website: 'harked.name',
    tagline: 'Beat Yesterday',
    logoUrl: 'https://pbs.twimg.com/profile_images/1927224205302538240/FZaAxocL_400x400.jpg',
  });

  const [designOptions, setDesignOptions] = useState<DesignOptions>({
    layout: LAYOUT_OPTIONS[0],
    colorScheme: COLOR_SCHEMES[0],
    font: FONT_OPTIONS[0],
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center space-x-3">
            <div className="w-8 h-8 text-sky-600">
                <LogoPlaceholderIcon />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Business Card Designer
            </h1>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:col-span-1">
            <DesignerPanel
              cardData={cardData}
              setCardData={setCardData}
              designOptions={designOptions}
              setDesignOptions={setDesignOptions}
            />
          </div>
          <div className="lg:col-span-2">
             <div className="sticky top-10">
                <h2 className="text-lg font-medium text-gray-600 mb-4">Live Preview</h2>
                <CardPreview cardData={cardData} designOptions={designOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
