export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Helps', href: '/how-it-helps' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Donors', href: '/donors' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Diaspora', href: '/diaspora' },
  { label: 'Reports', href: '/annual-reports' },
  { label: 'Contact', href: '/contact-giving' },
];

export const ctaNav: NavItem = {
  label: 'Give Now',
  href: '/donate',
};

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Giving', href: '/terms-of-giving' },
  { label: 'Refund Policy', href: '/refund-policy' },
];