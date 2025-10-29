import React from 'react';
import { Tender } from '../types';
import { CalendarIcon, BuildingOfficeIcon } from './icons';

interface TenderCardProps {
  tender: Tender;
  onSelectTender: (id: string) => void;
}

const TenderCard: React.FC<TenderCardProps> = ({ tender, onSelectTender }) => {
  return (
    <div
      onClick={() => onSelectTender(tender.id)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer border border-slate-200"
    >
      <h2 className="text-xl font-bold text-slate-800 mb-2">{tender.title}</h2>
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full">
          {tender.organization}
        </span>
      </div>
      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
        {tender.description}
      </p>
      <div className="flex items-center text-sm text-slate-500 space-x-6 border-t border-slate-100 pt-4 mt-4">
        <div className="flex items-center">
           <CalendarIcon className="w-4 h-4 mr-2" />
           <span>Deadline: {tender.deadline}</span>
        </div>
         <div className="flex items-center">
           <BuildingOfficeIcon className="w-4 h-4 mr-2" />
           <span>{tender.details.category}</span>
        </div>
      </div>
    </div>
  );
};

export default TenderCard;
