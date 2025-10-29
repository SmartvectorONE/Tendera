import { Tender } from '../types';

// Raw data structure from the webhook
interface WebhookTender {
  Titel: string;
  Organisatie: string;
  Omschrijving: string;
  Hoofdpunten: string;
  LinkTenderned: string;
  Tendernummer: string;
  Einddatum: string;
  Max_bedrag: string | null;
}

const WEBHOOK_URL = 'https://n8n.smrt1.nl/webhook/587f5345-ca4c-43c0-8892-a5033e8c87cb';
let cachedTenders: Tender[] | null = null;

// Helper to map webhook data to our internal Tender type
const mapWebhookTenderToTender = (webhookTender: WebhookTender): Tender => {
  return {
    id: webhookTender.Tendernummer,
    title: webhookTender.Titel,
    organization: webhookTender.Organisatie,
    deadline: webhookTender.Einddatum,
    description: webhookTender.Omschrijving,
    details: {
      publishedBy: webhookTender.Organisatie,
      status: 'Openbaar', // Default value
      publishedOn: 'N/A', // Not available in webhook data
      closingDate: webhookTender.Einddatum,
      sourcePlatform: 'TenderNed', // Default value
      sourcePlatformUrl: webhookTender.LinkTenderned.trim(),
      category: 'Diensten', // Default value
      procedureType: 'Openbaar', // Default value
      keywords: [], // Not available in webhook data
      cpvCode: 'N/A', // Not available in webhook data
      location: 'NEDERLAND (NL)', // Default value
      pb_s_number: webhookTender.Tendernummer,
      scope: 'Europees', // Default value
      awardCriteria: webhookTender.Hoofdpunten, // Map Hoofdpunten
    },
  };
};

// Fetches all tenders from the webhook and caches them
const fetchAllTenders = async (): Promise<Tender[]> => {
  if (cachedTenders) {
    return cachedTenders;
  }

  try {
    const response = await fetch(WEBHOOK_URL);
    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }
    const data: WebhookTender[] = await response.json();
    cachedTenders = data.map(mapWebhookTenderToTender);
    return cachedTenders;
  } catch (error) {
    console.error("Failed to fetch tenders from webhook:", error);
    return [];
  }
};


// Simulate a paginated API call using the fetched data
export const getTenders = async (page: number, limit: number): Promise<{ tenders: Tender[]; hasMore: boolean }> => {
  const allTenders = await fetchAllTenders();
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedTenders = allTenders.slice(start, end);
  const hasMore = end < allTenders.length;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return { tenders: paginatedTenders, hasMore };
};

export const getTenderById = async (id: string): Promise<Tender> => {
  const allTenders = await fetchAllTenders();
  const tender = allTenders.find((t) => t.id === id);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));

  if (tender) {
    return tender;
  } else {
    throw new Error('Tender not found');
  }
};