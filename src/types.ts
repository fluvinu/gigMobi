export type GigCategory = 'Travel' | 'Plumber' | 'Walker' | 'Delivery' | 'Other';

export type GigStatus = 'Open' | 'In Progress' | 'Completed';

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  city: string;
  category: GigCategory;
  status: GigStatus;
}
