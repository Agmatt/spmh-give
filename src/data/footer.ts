import { primaryNav, legalNav } from './nav';

export const footerColumns = [
  {
    heading: 'Give',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'Campaigns', href: '/campaigns' },
      { label: 'Corporate Giving', href: '/corporate' },
      { label: 'Diaspora Giving', href: '/diaspora' },
      { label: 'Major Gifts & Legacy', href: '/contact-giving' },
    ],
  },
  {
    heading: 'Transparency',
    links: [
      { label: 'How It Helps', href: '/how-it-helps' },
      { label: 'Annual Reports', href: '/annual-reports' },
      { label: 'Wall of Donors', href: '/donors' },
      { label: 'Governance', href: '/governance' },
    ],
  },
  {
    heading: 'About SPMH',
    links: [
      { label: 'Main Site', href: 'https://www.spmh.co.ke' },
      { label: 'Training & Research', href: 'https://training-and-research.spmh.co.ke' },
      { label: 'Strategic Plan 2026–2030', href: '/strategic-plan' },
      { label: 'Contact Giving Team', href: '/contact-giving' },
    ],
  },
];

export const footerLegal = legalNav;

export { primaryNav };