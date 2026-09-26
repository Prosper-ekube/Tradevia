import type { NavItem } from '@/types'

export const primaryNav: NavItem[] = [
  {
    label: 'Markets',
    to: '/markets',
    children: [
      { label: 'All markets', to: '/markets', description: 'Browse every market IG offers' },
      { label: 'Forex', to: '/markets/forex', description: 'Trade 80+ currency pairs' },
      { label: 'Indices', to: '/markets/indices', description: 'Major global stock indices' },
      { label: 'Shares', to: '/markets/shares', description: 'Thousands of listed companies' },
      { label: 'Commodities', to: '/markets/commodities', description: 'Metals, energy and agriculture' },
      { label: 'Cryptocurrencies', to: '/markets/crypto', description: 'Trade crypto price movements' },
    ],
  },
  {
    label: 'Trading',
    to: '/trading',
    children: [
      { label: 'Platforms', to: '/trading/platforms', description: 'Web, desktop and mobile platforms' },
      { label: 'Account types', to: '/trading/accounts', description: 'CFD, spread betting and share dealing' },
      { label: 'Charges & spreads', to: '/trading/fees', description: 'Transparent trading costs' },
      { label: 'Trading conditions', to: '/trading/conditions', description: 'Leverage, hours and execution' },
      { label: 'Tools & features', to: '/trading/tools', description: 'Charting, alerts and risk management' },
    ],
  },
  {
    label: 'Education',
    to: '/education',
  },
  {
    label: 'Company',
    children: [
      { label: 'About IG', to: '/about', description: 'Our history and global presence' },
      { label: 'Why IG', to: '/why-ig', description: 'What sets us apart' },
      { label: 'Contact us', to: '/contact', description: 'Get in touch with our team' },
      { label: 'FAQs', to: '/faq', description: 'Answers to common questions' },
    ],
  },
]

export const footerColumns = [
  {
    title: 'Products',
    links: [
      { label: 'CFD trading', to: '/trading/accounts' },
      { label: 'Spread betting', to: '/trading/accounts' },
      { label: 'Share dealing', to: '/trading/accounts' },
      { label: 'Demo account', to: '/demo-account' },
    ],
  },
  {
    title: 'Markets',
    links: [
      { label: 'Forex', to: '/markets/forex' },
      { label: 'Indices', to: '/markets/indices' },
      { label: 'Shares', to: '/markets/shares' },
      { label: 'Commodities', to: '/markets/commodities' },
      { label: 'Cryptocurrencies', to: '/markets/crypto' },
    ],
  },
  {
    title: 'Trading',
    links: [
      { label: 'Platforms', to: '/trading/platforms' },
      { label: 'Account types', to: '/trading/accounts' },
      { label: 'Charges & spreads', to: '/trading/fees' },
      { label: 'Trading tools', to: '/trading/tools' },
    ],
  },
  {
    title: 'Education',
    links: [
      { label: 'All articles', to: '/education' },
      { label: 'Beginner guides', to: '/education?level=Beginner' },
      { label: 'Trading strategies', to: '/education?category=Strategy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About IG', to: '/about' },
      { label: 'Why IG', to: '/why-ig' },
      { label: 'Contact us', to: '/contact' },
      { label: 'FAQs', to: '/faq' },
    ],
  },
]
