import { Gig, GigCategory } from './types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:4000';

export async function fetchGigs(): Promise<Gig[]> {
  const response = await fetch(`${API_BASE_URL}/api/gigs`);

  if (!response.ok) {
    throw new Error('Failed to fetch gigs');
  }

  return response.json();
}

export async function createGig(payload: {
  title: string;
  description: string;
  budget: number;
  city: string;
  category: GigCategory;
}): Promise<Gig> {
  const response = await fetch(`${API_BASE_URL}/api/gigs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to create gig');
  }

  return response.json();
}

export async function takeGig(id: string): Promise<Gig> {
  const response = await fetch(`${API_BASE_URL}/api/gigs/${id}/take`, {
    method: 'PATCH'
  });

  if (!response.ok) {
    throw new Error('Failed to take gig');
  }

  return response.json();
}
