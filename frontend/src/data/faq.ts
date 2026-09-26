import type { FaqCategory } from '@/types'

export const faqCategories: FaqCategory[] = [
  {
    title: 'Getting started',
    items: [
      {
        question: 'How do I open an account?',
        answer:
          'You can start the account-opening process online in a few minutes. You\'ll need to provide some personal details and identification documents as part of standard verification checks before you can fund your account and start trading.',
      },
      {
        question: 'What is a demo account?',
        answer:
          'A demo account lets you practise trading with virtual funds in a live market environment, so you can explore platforms and features risk-free before committing real capital.',
      },
      {
        question: 'What is the minimum deposit?',
        answer:
          'Minimum deposit requirements can vary by account type, region and payment method. Check the account opening flow for details relevant to your location.',
      },
    ],
  },
  {
    title: 'Trading & products',
    items: [
      {
        question: 'What is the difference between CFDs and spread betting?',
        answer:
          'Both let you speculate on price movements without owning the underlying asset and both use leverage. Spread betting profits are typically tax-free in the UK and Ireland (subject to individual circumstances and current tax law), while CFDs are more widely available internationally and losses may be usable for tax purposes.',
      },
      {
        question: 'Can I trade outside of standard market hours?',
        answer:
          'Many markets, including forex and some indices, are available to trade almost around the clock. Others, like individual shares, generally follow the hours of their listed exchange, with extended hours available on selected markets.',
      },
      {
        question: 'What is leverage?',
        answer:
          'Leverage lets you gain market exposure for a fraction of the full trade value, known as margin. It magnifies both potential profits and potential losses, so it should be used with care.',
      },
    ],
  },
  {
    title: 'Account & security',
    items: [
      {
        question: 'How is my money protected?',
        answer:
          'Client funds are typically held in segregated accounts, separate from company funds, in line with regulatory requirements in each jurisdiction IG operates.',
      },
      {
        question: 'Is IG regulated?',
        answer:
          'IG is regulated by multiple financial authorities across the jurisdictions in which it operates, including the Financial Conduct Authority (FCA) in the UK.',
      },
      {
        question: 'How do I reset my password?',
        answer:
          'You can reset your password from the login page using the "Forgotten your details?" link, which will guide you through identity verification and a secure reset process.',
      },
    ],
  },
  {
    title: 'Costs & payments',
    items: [
      {
        question: 'What fees does IG charge?',
        answer:
          'Costs vary by product and market, and can include spreads, overnight funding charges on leveraged positions, and commission on certain products like share dealing. Full details are available in the trading conditions section.',
      },
      {
        question: 'What payment methods are accepted?',
        answer:
          'Accepted payment methods vary by region and typically include bank transfer and debit card, among others. Available options are shown during the deposit process.',
      },
    ],
  },
]
