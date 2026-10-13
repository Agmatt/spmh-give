export interface ImpactNumber {
  value: string;
  label: string;
  context?: string;
}

/** The hospital at a glance — used in the "reality" strip on homepage. */
export const institutionalNumbers: ImpactNumber[] = [
  {
    value: '250,000',
    label: 'people',
    context: 'depend on SPMH as their closest hospital',
  },
  {
    value: '3,699',
    label: 'admissions',
    context: 'in the last year alone — and rising',
  },
  {
    value: '604',
    label: 'mothers',
    context: 'delivered safely at SPMH last year',
  },
  {
    value: '0',
    label: 'ICU beds',
    context: 'in a catchment of a quarter of a million people',
  },
];

export interface ImpactTeaser {
  amount: string;
  amountNumber: number;
  impact: string;
}

/** Every tier is grounded in an actual service SPMH provides. */
export const impactTeasers: ImpactTeaser[] = [
  {
    amount: 'KES 500',
    amountNumber: 500,
    impact:
      'Covers a full antenatal visit for an expectant mother — screening, counselling, and a plan for a safe delivery.',
  },
  {
    amount: 'KES 2,000',
    amountNumber: 2000,
    impact:
      'Provides a day of oxygen therapy for a critically ill child or mother fighting for breath.',
  },
  {
    amount: 'KES 10,000',
    amountNumber: 10000,
    impact:
      'Funds the surgical consumables that make an emergency caesarean possible — saving two lives at once.',
  },
  {
    amount: 'KES 50,000',
    amountNumber: 50000,
    impact:
      'Sponsors a full community outreach clinic — screening, treating, and referring over 100 people who would otherwise go without care.',
  },
];

export interface AllocationSlice {
  label: string;
  percentage: number;
  description: string;
}

export const allocation: AllocationSlice[] = [
  {
    label: 'Patient care & programmes',
    percentage: 82,
    description:
      'Directly funds clinical services, drugs, supplies, outreach, and equipment.',
  },
  {
    label: 'Administration',
    percentage: 12,
    description:
      'Utilities, systems, governance, and the compliance that keeps donations safe.',
  },
  {
    label: 'Fundraising',
    percentage: 6,
    description:
      'Payment processing, receipting, and donor communication.',
  },
];

export interface TrustSignal {
  icon: 'shield' | 'eye' | 'location' | 'cross';
  title: string;
  description: string;
}

export const trustSignals: TrustSignal[] = [
  {
    icon: 'cross',
    title: 'Mission-grounded',
    description:
      'A faith-based hospital under the Catholic Diocese of Homa Bay. Care here is a calling, not a transaction.',
  },
  {
    icon: 'eye',
    title: 'Openly accountable',
    description:
      'Audited annual accounts, published reports, and a receipt for every single gift.',
  },
  {
    icon: 'location',
    title: 'Rooted in Homa Bay',
    description:
      'Your gift stays in this community — treating the families, neighbours, and patients we serve every day.',
  },
];

export interface Report {
  year: number;
  title: string;
  summary: string;
  pdfUrl: string;
}

export const reports: Report[] = [
  // Populate as reports are published by Finance.
];