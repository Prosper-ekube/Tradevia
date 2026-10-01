import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { markets } from '@/data/markets'
import PriceChangeTag from '@/components/markets/PriceChangeTag'

const tickerMarkets = markets.slice(0, 5)

const Hero: React.FC = () => (
  <div className="relative overflow-hidden bg-ink-950 text-white">
    <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />
    <div className="container-page relative py-16 sm:py-24 lg:py-28">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <p className="text-sm font-medium text-brand-300 mb-4">Established 1974 &middot; London Stock Exchange: IGG</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-display font-semibold leading-[1.08] tracking-tight text-white">
            Trade the world&rsquo;s markets, on a platform built for it.
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
            Forex, indices, shares, commodities and crypto &mdash; spread betting and CFDs on thousands
            of instruments, with tools built for how you actually trade.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/open-account"
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-6 py-3.5 font-semibold hover:bg-white/90 transition-colors"
            >
              Open an account
              <FiArrowRight />
            </Link>
            <Link
              to="/demo-account"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold hover:border-white/50 transition-colors"
            >
              Try a free demo
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5">
            <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-3">Live watchlist</p>
            <ul className="divide-y divide-white/10">
              {tickerMarkets.map((m) => (
                <li key={m.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="text-xs text-white/40 font-mono">{m.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm tabular-nums">{m.price}</p>
                    <PriceChangeTag value={m.changePercent} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
)

export default Hero
