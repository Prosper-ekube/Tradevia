import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Markets from '@/pages/Markets'
import MarketCategoryPage from '@/pages/MarketCategoryPage'
import MarketInstrument from '@/pages/MarketInstrument'
import Trading from '@/pages/Trading'
import TradingPlatforms from '@/pages/TradingPlatforms'
import TradingAccounts from '@/pages/TradingAccounts'
import TradingFees from '@/pages/TradingFees'
import TradingConditions from '@/pages/TradingConditions'
import TradingTools from '@/pages/TradingTools'
import Education from '@/pages/Education'
import EducationArticle from '@/pages/EducationArticle'
import About from '@/pages/About'
import WhyIg from '@/pages/WhyIg'
import Contact from '@/pages/Contact'
import Faq from '@/pages/Faq'
import Login from '@/pages/Login'
import OpenAccount from '@/pages/OpenAccount'
import DemoAccount from '@/pages/DemoAccount'
import NotFound from '@/pages/NotFound'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />

      <Route path="/markets" element={<Markets />} />
      <Route path="/markets/:categorySlug" element={<MarketCategoryPage />} />
      <Route path="/markets/:categorySlug/:instrumentSlug" element={<MarketInstrument />} />

      <Route path="/trading" element={<Trading />} />
      <Route path="/trading/platforms" element={<TradingPlatforms />} />
      <Route path="/trading/accounts" element={<TradingAccounts />} />
      <Route path="/trading/fees" element={<TradingFees />} />
      <Route path="/trading/conditions" element={<TradingConditions />} />
      <Route path="/trading/tools" element={<TradingTools />} />

      <Route path="/education" element={<Education />} />
      <Route path="/education/:slug" element={<EducationArticle />} />

      <Route path="/about" element={<About />} />
      <Route path="/why-ig" element={<WhyIg />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />

      <Route path="/login" element={<Login />} />
      <Route path="/open-account" element={<OpenAccount />} />
      <Route path="/demo-account" element={<DemoAccount />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)

export default AppRoutes
