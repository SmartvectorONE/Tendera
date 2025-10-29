export interface Tender {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  description: string;
  details: {
    publishedBy: string;
    status: 'Gesloten' | 'Openbaar';
    publishedOn: string;
    closingDate: string;
    sourcePlatform: string;
    sourcePlatformUrl: string;
    category: string;
    procedureType: string;
    keywords: string[];
    cpvCode: string;
    location: string;
    pb_s_number: string;
    scope: string;
    awardCriteria: string;
  };
}
