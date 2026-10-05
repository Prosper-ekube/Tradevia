import { Link } from 'react-router-dom'
import { FiTwitter, FiLinkedin, FiYoutube, FiFacebook } from 'react-icons/fi'
import { footerColumns } from '@/data/nav'
import Container from '@/components/common/Container'

const igSocials = [
  { icon: FiTwitter, label: 'IG on X (Twitter)', href: 'https://x.com/IGInternational' },
  { icon: FiLinkedin, label: 'IG on LinkedIn', href: 'https://www.linkedin.com/showcase/35901904/admin' },
  { icon: FiYoutube, label: 'IG on YouTube', href: 'https://www.youtube.com/channel/UCZj-ae-S_X-mocAH3xQnpUw' },
  { icon: FiFacebook, label: 'IG on Facebook', href: 'https://web.facebook.com/IGSouthAfrica/?brand_redir=105378087741614' },
]

const Footer: React.FC = () => (
  <footer className="bg-ink-950 text-white">
    <Container className="pt-14 pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <span className="font-display text-2xl font-bold">Tradevia</span>
          <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-[240px]">
            An independent marketing site about IG Group&rsquo;s markets, platforms and products.
            Tradevia is not a broker and does not provide trading accounts or financial services.
          </p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/50">
            Follow IG
          </p>
          <div className="flex gap-3 mt-3">
            {igSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white/90">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-4 text-sm text-white/70 leading-relaxed">
          IG&rsquo;s CFDs and spread betting are complex instruments and come with a high risk of
          losing money rapidly due to leverage. You should consider whether you understand how these
          products work and whether you can afford to take the high risk of losing your money. Trading
          is offered by IG Group, not by Tradevia.
        </div>        
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Tradevia. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/50">
            <Link to="/faq" className="hover:text-white">Risk &amp; legal</Link>            
          </div>
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer