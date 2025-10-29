import React from 'react';
import { Tender } from '../types';
import { 
  DocumentTextIcon, 
  CalendarDaysIcon, 
  ClipboardDocumentCheckIcon, 
  ScaleIcon, 
  ArrowLeftIcon,
  PaperClipIcon
} from './icons';

interface TenderDetailProps {
  tender: Tender;
  onBack: () => void;
}

const DetailRow: React.FC<{ label: string; value: string | string[]; link?: string, preWrap?: boolean }> = ({ label, value, link, preWrap }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className={`mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 ${preWrap ? 'whitespace-pre-wrap' : ''}`}>
      {Array.isArray(value) ? value.join(', ') : (
        link ? <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a> : value
      )}
    </dd>
  </div>
);

const TenderDetail: React.FC<TenderDetailProps> = ({ tender, onBack }) => {
  const [activeTab, setActiveTab] = React.useState('Details');

  const tabs = [
    { name: 'Details', icon: DocumentTextIcon },
    { name: 'Documenten', icon: PaperClipIcon },
    { name: 'Agenda', icon: CalendarDaysIcon },
    { name: 'Contract', icon: ClipboardDocumentCheckIcon },
    { name: 'Winnende inschrijver', icon: ScaleIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex space-x-2">
          <li className="flex items-center">
            <button onClick={onBack} className="text-blue-600 hover:underline">Home</button>
          </li>
          <li className="flex items-center">
            <span className="text-slate-400">/</span>
            <button onClick={onBack} className="ml-2 text-blue-600 hover:underline">Aanbestedingen</button>
          </li>
          <li className="flex items-center">
            <span className="text-slate-400">/</span>
            <span className="ml-2 text-slate-500 truncate">{tender.title}</span>
          </li>
        </ol>
      </nav>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
        <button onClick={onBack} className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Terug naar overzicht
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{tender.title} - {tender.organization}</h1>
        <p className="text-slate-600 leading-relaxed mb-6">{tender.description}</p>
        
        <div className="border-b border-slate-200 mb-6">
            <div className="flex flex-wrap -mb-px">
                {tabs.map(tab => (
                    <button 
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`inline-flex items-center justify-center px-4 py-3 mr-2 border-b-2 font-semibold transition-colors duration-200
                            ${activeTab === tab.name 
                                ? 'text-blue-600 border-blue-600' 
                                : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <tab.icon className="w-5 h-5 mr-2" />
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Aanbesteding details</h2>
          <dl className="divide-y divide-slate-200">
              <DetailRow label="Gepubliceerd door" value={tender.details.publishedBy} />
              <DetailRow label="Status" value={tender.details.status} />
              <DetailRow label="Gepubliceerd op" value={tender.details.publishedOn} />
              <DetailRow label="Sluitingsdatum" value={tender.details.closingDate} />
              <DetailRow label="Bron / Platform" value={tender.details.sourcePlatform} link={tender.details.sourcePlatformUrl} />
              <DetailRow label="Categorie" value={tender.details.category} />
              <DetailRow label="Type opdracht" value="Diensten" />
              <DetailRow label="Procedure" value={tender.details.procedureType} />
              <DetailRow label="Trefwoorden" value={tender.details.keywords} />
              <DetailRow label="CPV code" value={tender.details.cpvCode} />
              <DetailRow label="Plaats van uitvoering" value={tender.details.location} />
              <DetailRow label="PB/S nummer" value={tender.details.pb_s_number} />
              <DetailRow label="Europees / nationaal" value={tender.details.scope} />
              <DetailRow label="Hoofdpunten / Gunningscriteria" value={tender.details.awardCriteria} preWrap={true} />
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
