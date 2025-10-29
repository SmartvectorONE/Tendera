import React, { useState, useEffect, useCallback } from 'react';
import { Tender } from './types';
import { getTenders, getTenderById } from './services/tenderService';
import TenderList from './components/TenderList';
import TenderDetail from './components/TenderDetail';
import { LoadingSpinner } from './components/icons';

const App: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTenders = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { tenders: newTenders, hasMore: newHasMore } = await getTenders(pageNum, 10);
      setTenders(prev => pageNum === 1 ? newTenders : [...prev, ...newTenders]);
      setHasMore(newHasMore);
    } catch (err) {
      setError('Failed to fetch tenders. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchTenders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectTender = async (id: string) => {
    setIsLoading(true);
    try {
      const tender = await getTenderById(id);
      setSelectedTender(tender);
    } catch (err) {
      setError('Failed to fetch tender details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedTender(null);
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchTenders(newPage);
  }

  const renderContent = () => {
    if (isLoading && tenders.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      );
    }

    if (error && !selectedTender) {
      return <div className="text-center text-red-500 mt-10">{error}</div>;
    }
    
    if (selectedTender) {
      return <TenderDetail tender={selectedTender} onBack={handleBackToList} />;
    }
    
    return (
      <TenderList 
        tenders={tenders} 
        onSelectTender={handleSelectTender} 
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="min-h-screen text-slate-800">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
