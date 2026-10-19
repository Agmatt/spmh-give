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
    description: 'Payment processing, receipting, and donor communication.',
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

export interface FundedService {
  name: string;
  description: string;
  /** Concrete detail — a number, a frequency, a unit */
  detail: string;
}

/** What donations actually pay for, week in and week out. */
export const fundedServices: FundedService[] = [
  {
    name: 'Emergency & casualty care',
    description:
      'Round-the-clock triage, stabilisation, and treatment for the 7,000+ patients who arrive at our door every year with injuries, obstetric emergencies, and acute illness.',
    detail: '24 hours a day, every day',
  },
  {
    name: 'Safe motherhood',
    description:
      'Antenatal care, skilled delivery, emergency caesarean capability, and newborn stabilisation for mothers across Homa Bay County.',
    detail: '604 mothers delivered in the last year',
  },
  {
    name: 'Surgery',
    description:
      'General surgery, obstetric surgery, and minor orthopaedic procedures — over 400 a year, in a theatre complex that is stretched to its limit.',
    detail: '420 procedures in the last year',
  },
  {
    name: 'Diagnostics',
    description:
      'Laboratory testing, X-ray, and ultrasound — the diagnostic backstop for every inpatient, every maternity case, every emergency.',
    detail: 'Over 60,000 lab tests a year',
  },
  {
    name: 'Pharmacy & medicines',
    description:
      'Essential medicines and consumables for inpatients, outpatients, and outreach — dispensed to over 30,000 patient episodes a year.',
    detail: '32,993 dispensing episodes in the last year',
  },
  {
    name: 'Community outreach',
    description:
      'Mobile clinics, screening camps, and maternal-child health programmes that carry care into the communities we serve.',
    detail: 'Reaching villages across the catchment',
  },
];

export interface CapabilityGap {
  name: string;
  consequence: string;
}

/** What we can't yet do — and what it costs our patients. */
export const capabilityGaps: CapabilityGap[] = [
  {
    name: 'No intensive care unit',
    consequence:
      'Critically ill patients are stabilised and referred to Homa Bay County Referral Hospital — over an hour away — or further to Nairobi. Some do not survive the journey.',
  },
  {
    name: 'Limited theatre capacity',
    consequence:
      'Waiting lists stretch into months for elective surgery. Emergency cases compete for a small number of theatre slots.',
  },
  {
    name: 'No advanced imaging',
    consequence:
      'CT scans, echocardiography, and advanced imaging require a referral. Every day spent travelling for a diagnosis is a day without treatment.',
  },
  {
    name: 'No dialysis',
    consequence:
      'Patients with chronic kidney disease travel to Kisumu or Nairobi — sometimes twice a week — at a cost most families cannot sustain. Many stop treatment.',
  },
];

export interface AccountabilityCommitment {
  title: string;
  body: string;
}

export const accountabilityCommitments: AccountabilityCommitment[] = [
  {
    title: 'A receipt for every gift',
    body: 'Every donation is issued an official SPMH receipt with a unique number, the hospital’s KRA details, and the date and amount of your gift. Receipts go out within 48 hours.',
  },
  {
    title: 'Published audited accounts',
    body: 'Our annual report and audited accounts are published on this site and available from the Finance office. You can see exactly what we received and how it was spent.',
  },
  {
    title: 'Source-of-funds for large gifts',
    body: 'Gifts over KES 1,000,000 require confirmation of the source of funds, in line with Kenya’s AML requirements. This protects both you and the hospital.',
  },
  {
    title: 'Consent-first donor recognition',
    body: 'We never publish a donor’s name without explicit, revocable consent. Giving anonymously is always an option.',
  },
  {
    title: 'No data sold, ever',
    body: 'We do not sell, rent, or trade donor data. Your contact details are used only for receipting and for updates you opt into.',
  },
  {
    title: 'Refunds under a published policy',
    body: 'Card and PayPal gifts can be refunded within 14 days. M-Pesa reversals follow Safaricom’s window. Every refund requires documented approval.',
  },
];
