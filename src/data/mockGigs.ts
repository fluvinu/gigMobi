import { Gig } from '../types';

export const mockGigs: Gig[] = [
  {
    id: 'g1',
    title: 'Airport drop at 7 PM',
    description: 'Need a reliable cab from downtown to airport.',
    budget: 35,
    city: 'Austin',
    category: 'Travel',
    status: 'Open'
  },
  {
    id: 'g2',
    title: 'Kitchen sink leakage fix',
    description: 'Plumber needed for quick repair this evening.',
    budget: 55,
    city: 'Austin',
    category: 'Plumber',
    status: 'In Progress'
  },
  {
    id: 'g3',
    title: 'Pick up parcel and deliver',
    description: 'Walk and deliver a small package across 1.5 miles.',
    budget: 22,
    city: 'Austin',
    category: 'Walker',
    status: 'Open'
  }
];
