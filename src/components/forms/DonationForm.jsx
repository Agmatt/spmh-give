import { useState } from 'react';

const PRESETS = [500, 1000, 5000, 10000, 50000];

export default function DonationForm({ campaigns }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const [form, setForm] = useState({
    amount: 5000,
    customAmount: '',
    frequency: 'one-time',
    name: '',
    email: '',
    phone: '',
    country: 'Kenya',
    designation: 'general',
    consent: false,
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const finalAmount = form.customAmount
    ? Number(form.customAmount)
    : form.amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      setError('Please agree to the privacy policy.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: finalAmount,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setSuccessData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className='bg-white border border-line p-8 md:p-12 text-center'>
        <div className='inline-flex items-center justify-center w-16 h-16 bg-green-50 text-green-700 rounded-full mb-6'>
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'></path>
          </svg>
        </div>
        <h2 className='font-display text-3xl font-semibold text-ink mb-4'>
          Thank you.
        </h2>
        <p className='text-lg text-ink-soft mb-8'>
          Your pledge of <strong>KES {finalAmount.toLocaleString()}</strong> has
          been recorded.
        </p>

        <div className='bg-surface-2 border border-line p-6 max-w-sm mx-auto mb-8'>
          <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
            Your Reference Code
          </p>
          <p className='font-mono text-3xl font-bold text-primary tracking-widest'>
            {successData.reference}
          </p>
        </div>

        <div className='text-left max-w-md mx-auto space-y-4 text-sm text-ink-soft mb-8'>
          <p className='font-bold text-ink'>To complete your gift:</p>
          <ol className='list-decimal pl-5 space-y-2'>
            <li>Go to M-Pesa → Lipa na M-Pesa → Buy Goods.</li>
            <li>
              Enter Till Number: <strong className='text-ink'>123456</strong>.
            </li>
            <li>
              Enter Amount:{' '}
              <strong className='text-ink'>
                KES {finalAmount.toLocaleString()}
              </strong>
              .
            </li>
            <li>
              Forward your M-Pesa SMS to{' '}
              <strong className='text-ink'>giving@spmh.co.ke</strong> with your
              reference code.
            </li>
          </ol>
        </div>

        <p className='text-sm text-ink-soft'>
          A confirmation email with these instructions has been sent to{' '}
          {form.email}.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white border border-line'>
      {/* Progress Bar */}
      <div className='flex border-b border-line'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 ${step >= i ? 'bg-primary' : 'bg-surface-2'}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className='p-6 md:p-10'>
        {/* STEP 1: Amount */}
        {step === 1 && (
          <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <div>
              <p className='eyebrow-gold mb-2'>Step 1 of 4</p>
              <h2 className='display text-2xl md:text-3xl mb-6'>
                Choose your amount.
              </h2>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {PRESETS.map((amt) => (
                <button
                  type='button'
                  key={amt}
                  onClick={() => {
                    update('amount', amt);
                    update('customAmount', '');
                  }}
                  className={`py-3 px-4 border text-center font-mono font-semibold transition-colors ${form.amount === amt && !form.customAmount ? 'border-primary bg-primary text-white' : 'border-line text-ink hover:border-primary'}`}>
                  KES {amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div>
              <label className='block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
                Or enter custom amount (KES)
              </label>
              <input
                type='number'
                placeholder='e.g. 15000'
                value={form.customAmount}
                onChange={(e) => update('customAmount', e.target.value)}
                className='w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-xl font-mono text-ink focus:border-primary focus:ring-0 outline-none'
              />
            </div>

            <div>
              <label className='block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
                Frequency
              </label>
              <select
                value={form.frequency}
                onChange={(e) => update('frequency', e.target.value)}
                className='w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-ink focus:border-primary focus:ring-0 outline-none'>
                <option value='one-time'>One-time gift</option>
                <option value='monthly'>Monthly (via standing order)</option>
              </select>
            </div>

            <button
              type='button'
              onClick={handleNext}
              className='btn-primary w-full !py-3'>
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: Designation */}
        {step === 2 && (
          <div className='space-y-8 animate-in fade-in slide-in-from-right-4 duration-500'>
            <div>
              <p className='eyebrow-gold mb-2'>Step 2 of 4</p>
              <h2 className='display text-2xl md:text-3xl mb-6'>
                Where should it go?
              </h2>
            </div>

            <div className='space-y-3'>
              <label
                className={`block border p-4 cursor-pointer transition-colors ${form.designation === 'general' ? 'border-primary bg-surface-2' : 'border-line hover:border-primary'}`}>
                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='designation'
                    value='general'
                    checked={form.designation === 'general'}
                    onChange={() => update('designation', 'general')}
                    className='text-primary focus:ring-primary'
                  />
                  <div>
                    <p className='font-semibold text-ink'>
                      General Fund (Most needed)
                    </p>
                    <p className='text-sm text-ink-soft'>
                      Allows the hospital to direct funds to the most urgent
                      clinical need.
                    </p>
                  </div>
                </div>
              </label>

              {campaigns.map((c) => (
                <label
                  key={c.slug}
                  className={`block border p-4 cursor-pointer transition-colors ${form.designation === c.slug ? 'border-primary bg-surface-2' : 'border-line hover:border-primary'}`}>
                  <div className='flex items-center gap-3'>
                    <input
                      type='radio'
                      name='designation'
                      value={c.slug}
                      checked={form.designation === c.slug}
                      onChange={() => update('designation', c.slug)}
                      className='text-primary focus:ring-primary'
                    />
                    <div>
                      <p className='font-semibold text-ink'>{c.name}</p>
                      <p className='text-sm text-ink-soft'>{c.summary}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className='flex gap-4'>
              <button
                type='button'
                onClick={handlePrev}
                className='btn-secondary flex-1 !py-3'>
                Back
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='btn-primary flex-1 !py-3'>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Details */}
        {step === 3 && (
          <div className='space-y-6 animate-in fade-in slide-in-from-right-4 duration-500'>
            <div>
              <p className='eyebrow-gold mb-2'>Step 3 of 4</p>
              <h2 className='display text-2xl md:text-3xl mb-6'>
                Your details.
              </h2>
            </div>

            <div>
              <label className='block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
                Full name
              </label>
              <input
                type='text'
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className='w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-ink focus:border-primary focus:ring-0 outline-none'
              />
            </div>
            <div>
              <label className='block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
                Email address
              </label>
              <input
                type='email'
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className='w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-ink focus:border-primary focus:ring-0 outline-none'
              />
            </div>
            <div>
              <label className='block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
                Phone number
              </label>
              <input
                type='tel'
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className='w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-ink focus:border-primary focus:ring-0 outline-none'
              />
            </div>
            <div>
              <label className='block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2'>
                Country
              </label>
              <input
                type='text'
                required
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
                className='w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-ink focus:border-primary focus:ring-0 outline-none'
              />
            </div>

            <div className='flex gap-4 pt-4'>
              <button
                type='button'
                onClick={handlePrev}
                className='btn-secondary flex-1 !py-3'>
                Back
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='btn-primary flex-1 !py-3'
                disabled={!form.name || !form.email || !form.phone}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review */}
        {step === 4 && (
          <div className='space-y-8 animate-in fade-in slide-in-from-right-4 duration-500'>
            <div>
              <p className='eyebrow-gold mb-2'>Step 4 of 4</p>
              <h2 className='display text-2xl md:text-3xl mb-6'>
                Confirm your gift.
              </h2>
            </div>

            <div className='bg-surface border border-line p-6 space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-ink-soft'>Amount</span>
                <span className='font-mono font-semibold text-ink'>
                  KES {finalAmount.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-ink-soft'>Frequency</span>
                <span className='capitalize text-ink'>{form.frequency}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-ink-soft'>Designation</span>
                <span className='capitalize text-ink'>
                  {form.designation === 'general'
                    ? 'General Fund'
                    : form.designation}
                </span>
              </div>
              <div className='flex justify-between border-t border-line pt-3'>
                <span className='text-ink-soft'>Donor</span>
                <span className='text-ink'>
                  {form.name} ({form.email})
                </span>
              </div>
            </div>

            <label className='flex items-start gap-3 text-sm text-ink-soft cursor-pointer'>
              <input
                type='checkbox'
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                className='mt-1 w-4 h-4 text-primary border-line rounded'
              />
              <span>
                I agree to the{' '}
                <a href='/terms-of-giving' className='text-primary underline'>
                  Terms of Giving
                </a>{' '}
                and{' '}
                <a href='/privacy' className='text-primary underline'>
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {error && (
              <p className='text-red-600 text-sm font-medium'>{error}</p>
            )}

            <div className='flex gap-4'>
              <button
                type='button'
                onClick={handlePrev}
                className='btn-secondary flex-1 !py-3'
                disabled={loading}>
                Back
              </button>
              <button
                type='submit'
                className='btn-primary flex-1 !py-3'
                disabled={!form.consent || loading}>
                {loading ? 'Processing...' : 'Confirm & Get Reference'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
