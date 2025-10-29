import React from 'react';
import { Tender } from '../types';
import TenderCard from './TenderCard';
import { LoadingSpinner } from './icons';

interface TenderListProps {
  tenders: Tender[];
  onSelectTender: (id: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const TenderList: React.FC<TenderListProps> = ({ tenders, onSelectTender, onLoadMore, hasMore, isLoading }) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
        Overzicht van bestedingen
      </h1>
      <div className="space-y-6">
        {tenders.map((tender) => (
          <TenderCard key={tender.id} tender={tender} onSelectTender={onSelectTender} />
        ))}
      </div>
      <div className="mt-10 text-center">
        {hasMore && (
          <button 
            onClick={onLoadMore}
            disabled={isLoading}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Laden...</span>
              </>
            ) : (
              'Laad meer'
            )}
          </button>
        )}
        {!hasMore && tenders.length > 0 && (
          <p className="text-slate-500">Alle tenders zijn geladen.</p>
        )}
      </div>
    </div>
  );
};

export default TenderList;