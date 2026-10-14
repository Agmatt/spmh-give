export type CampaignStatus = 'active' | 'planning' | 'completed';

export interface Campaign {
  id: string;
  slug: string;
  name: string;
  /** Short line for cards */
  summary: string;
  /** Full narrative for detail page */
  description: string;
  /** One line, donor-facing — what changes */
  impact: string;
  /** The gap, in one line */
  gap: string;
  target: number;
  raised: number;
  currency: 'KES';
  status: CampaignStatus;
  image: string;
  imageAlt: string;
  /** Ordered — first is flagship */
  order: number;
}

/**
 * `raised` must come from Supabase before launch.
 * While it's 0, the UI shows the goal only — never a fake percentage.
 */
export const campaigns: Campaign[] = [
  {
    id: 'icu-hdu',
    slug: 'icu-hdu',
    name: 'ICU & High Dependency Unit',
    summary:
      'A 24-bed critical care unit, so our sickest patients don’t have to be sent away.',
    description:
      'Every week, patients arrive at SPMH who need intensive care — a mother with severe bleeding after childbirth, a child in respiratory failure, a man with sepsis. Right now, our best option is stabilisation and a referral to Homa Bay County Referral Hospital, over an hour away, or further to Nairobi. Many don’t make it. Building a functional ICU and High Dependency Unit means we can treat them here, where they arrived, with the team who knows them.',
    impact:
      'Keeps critically ill mothers, children, and trauma patients alive at SPMH — instead of losing them to time and distance.',
    gap: '24 combined ICU/HDU beds, ventilators, monitors, and trained critical care staff.',
    target: 60_000_000,
    raised: 0,
    currency: 'KES',
    status: 'active',
    image: '/gallery/22.png',
    imageAlt: 'Intensive care unit at St. Paul’s Mission Hospital',
    order: 1,
  },
  {
    id: 'modern-theatres',
    slug: 'modern-theatres',
    name: 'Modern Surgical Theatres',
    summary:
      'Surgery that keeps pace with the demand — not a waiting list that grows every month.',
    description:
      'Our surgical team performs over 400 procedures a year — emergency caesareans, general surgery, trauma, minor orthopaedics — out of a theatre complex that was built for a fraction of that volume. Waiting lists stretch into months. Some patients can’t wait. Expanding and equipping modern theatres means more surgeries, safer outcomes, and shorter waits for the people who depend on us.',
    impact:
      'Doubles safe surgical capacity — so emergency and elective patients get treated on time.',
    gap: 'Additional equipped theatres, anaesthesia machines, and recovery bays.',
    target: 45_000_000,
    raised: 0,
    currency: 'KES',
    status: 'active',
    image: '/img/13.jpg',
    imageAlt: 'Operating theatre at St. Paul’s Mission Hospital',
    order: 2,
  },
  {
    id: 'safe-motherhood',
    slug: 'safe-motherhood',
    name: 'Safe Motherhood',
    summary:
      'Every mother who walks through our doors should leave with her baby in her arms.',
    description:
      'Over 600 mothers deliver at SPMH every year, and the number is rising. Our maternity team is skilled and dedicated — but they work in a unit that is stretched past capacity, without the neonatal intensive care support that some newborns need in their first hours. This fund strengthens the entire path: better antenatal screening, expanded delivery rooms, a functioning newborn unit with incubators and CPAP, and community follow-up that reaches mothers before complications begin.',
    impact:
      'Fewer preventable maternal and newborn deaths across Homa Bay County.',
    gap: 'Expanded maternity wards, newborn ICU equipment, and midwife recruitment.',
    target: 25_000_000,
    raised: 0,
    currency: 'KES',
    status: 'active',
    image: '/img/49.jpg',
    imageAlt: 'Maternity ward at St. Paul’s Mission Hospital',
    order: 3,
  },
  {
    id: 'advanced-diagnostics',
    slug: 'advanced-diagnostics',
    name: 'Advanced Diagnostics',
    summary:
      'Accurate answers, closer to home — so treatment isn’t delayed by distance.',
    description:
      'Right now, our radiology department has one X-ray and one ultrasound machine. When a patient needs a CT scan, an echocardiogram, or advanced lab work, we refer them to Homa Bay County Referral Hospital or further afield. Every day spent travelling for a diagnosis is a day without treatment. Bringing modern imaging and diagnostic capability into SPMH changes how quickly we can act — and how well we can care.',
    impact:
      'Faster, more accurate diagnosis — meaning earlier treatment and better outcomes.',
    gap: 'CT scanner, digital X-ray, expanded ultrasound, and advanced laboratory capacity.',
    target: 35_000_000,
    raised: 0,
    currency: 'KES',
    status: 'active',
    image: '/gallery/scan.jpg',
    imageAlt: 'Diagnostic imaging equipment',
    order: 4,
  },
  {
    id: 'kidney-care',
    slug: 'kidney-care',
    name: 'Kidney Care & Dialysis',
    summary:
      'Dialysis for the patients in our catchment who currently have to leave Homa Bay to survive.',
    description:
      'Chronic kidney disease is rising across Kenya, and Homa Bay is no exception. Patients who need regular dialysis currently travel to Kisumu or Nairobi — sometimes twice a week — at a cost most families in our catchment cannot sustain. Many stop treatment. A dialysis unit at SPMH keeps these patients close to home, close to their families, and able to stay on treatment long enough to live.',
    impact:
      'Keeps dialysis patients alive, in treatment, and near their families.',
    gap: 'Dialysis machines, water treatment, and trained renal nursing staff.',
    target: 18_000_000,
    raised: 0,
    currency: 'KES',
    status: 'planning',
    image: '/img/59.jpg',
    imageAlt: 'Dialysis unit',
    order: 5,
  },
];

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

export const sortedCampaigns = [...campaigns].sort((a, b) => a.order - b.order);

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export interface Campaign {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  impact: string;
  gap: string;
  target: number;
  raised: number;
  currency: 'KES';
  status: CampaignStatus;
  image: string;
  imageAlt: string;
  /** Optional — a photo of the space or equipment in question for the detail page */
  gapImage?: string;
  gapImageAlt?: string;
  order: number;
}