import React, { useState, useRef } from 'react';
import DesignerPanel from './components/DesignerPanel';
import CardPreview from './components/CardPreview';
import { CardData, DesignOptions } from './types';
import { LAYOUT_OPTIONS, COLOR_SCHEMES, FONT_OPTIONS } from './constants';
import { LogoPlaceholderIcon } from './components/Icons';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadIcon } from './components/Icons';

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

  const [isLoading, setIsLoading] = useState(false);
  const [exportName, setExportName] = useState('business-card');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: 'png' | 'pdf') => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const dataUrl = await toPng(previewRef.current!, {
        backgroundColor: '#ffffff',
        pixelRatio: 2, // Higher quality
      });

      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `${exportName}.png`;
        link.href = dataUrl;
        link.click();
        toast.success('Business card exported as PNG!');
      } else {
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        // Add metadata to PDF
        pdf.setProperties({
          title: 'Business Card',
          subject: 'Business Card Design',
          author: cardData.name,
          keywords: 'business card, design, export',
          creator: 'Business Card Designer'
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${exportName}.pdf`);
        toast.success('Business card exported as PDF!');
      }
    } catch (error) {
      console.error('Error exporting:', error);
      toast.error('Failed to export the business card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <ToastContainer position="top-right" />
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
              <div className="mb-4 space-y-4">
                <div>
                  <label htmlFor="exportName" className="block text-sm font-medium text-gray-700 mb-1">
                    Export Filename
                  </label>
                  <input
                    type="text"
                    id="exportName"
                    value={exportName}
                    onChange={(e) => setExportName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter filename (without extension)"
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleExport('png')}
                    disabled={isLoading}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    {isLoading ? 'Exporting...' : 'Export as PNG'}
                  </button>
                  <button 
                    onClick={() => handleExport('pdf')}
                    disabled={isLoading}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    {isLoading ? 'Exporting...' : 'Export as PDF'}
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-medium text-gray-600 mb-4">Live Preview</h2>
              <div ref={previewRef}>
                <CardPreview cardData={cardData} designOptions={designOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
