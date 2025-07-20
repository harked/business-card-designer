
import React from 'react';
import { CardData, DesignOptions } from '../types';
import { PhoneIcon, EmailIcon, WebsiteIcon, LogoPlaceholderIcon } from './Icons';

interface CardPreviewProps {
  cardData: CardData;
  designOptions: DesignOptions;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardData, designOptions }) => {
  const { layout, colorScheme, font } = designOptions;
  const { name, title, company, phone, email, website, tagline } = cardData;

  const getLogo = () => {
    if (cardData.logoUrl) {
      return <img src={cardData.logoUrl} alt="logo" className="w-16 h-16 object-contain"/>
    }
    return (
        <div className={`w-14 h-14 ${colorScheme.accent}`}>
            <LogoPlaceholderIcon />
        </div>
    );
  }

  return (
    <div className={`aspect-[10/6] w-full max-w-lg mx-auto rounded-xl shadow-2xl p-8 flex flex-col justify-between transition-all duration-300 ${layout.className} ${colorScheme.bg} ${font.className}`}>
      {/* Top Section: Logo & Company */}
      <div className={`flex flex-col gap-4 ${layout.className}`}>
        <div className="flex items-center gap-4">
          {getLogo()}
          <div>
            <h2 className={`text-2xl font-bold ${colorScheme.accent}`}>{company}</h2>
            {tagline && <p className={`text-sm italic ${colorScheme.secondaryText}`}>{tagline}</p>}
          </div>
        </div>
      </div>

      {/* Middle Section: Name & Title */}
      <div className={`flex flex-col ${layout.className}`}>
        <h1 className={`text-4xl font-bold ${colorScheme.text}`}>{name}</h1>
        <p className={`text-xl ${colorScheme.secondaryText}`}>{title}</p>
      </div>
      
      {/* Bottom Section: Contact Info */}
      <div className={`flex flex-col gap-2 text-sm ${layout.className} ${colorScheme.secondaryText}`}>
        <div className="flex items-center gap-3">
          <PhoneIcon />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <EmailIcon />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3">
          <WebsiteIcon />
          <span>{website}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
