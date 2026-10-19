export const site = {
  name: "St. Paul's Mission Hospital",
  shortName: "St. Paul's Mission Hospital",
  legalName: "St. Paul's Mission Hospital — Homa Bay",
  url: 'https://give.spmh.co.ke',
  mainSite: 'https://www.spmh.co.ke',
  trainingSite: 'https://training-and-research.spmh.co.ke',

  // Contact
  givingEmail: ' giving@spmh.co.ke',
  outreachEmail: 'outreach@spmh.co.ke',
  phone: '+254-111-817447', // TODO: confirm

  address: {
    physical: 'Homa Bay, Kenya',
    postal: 'P.O. Box 46, Homa Bay',
    email: 'info@spmh.co.ke', // TODO: confirm
    country: 'KE',
  },

  // Compliance
  kraPin: 'P000000000X', // TODO: confirm with Finance
  dpoEmail: 'dpo@spmh.co.ke', // TODO: confirm

  bank: {
    accountName: "St. Paul's Mission Hospital",
    bankName: 'Co-operative Bank',
    branch: 'Homa Bay',
    accountNumber: '011125678900',
    swift: 'K223344',
  },

    mpesaTill: '123456',
  
  // Social
  social: {
    facebook: '', // TODO
    twitter: '',
    linkedin: '',
    youtube: '',
  },

  // Meta
  defaultOgImage: '/og/default.jpg',
  locale: 'en_KE',
} as const;

export type Site = typeof site;
