const RiskBanner: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <div className={compact ? 'text-xs text-ink-700/70' : 'bg-ink-900/5 text-sm text-ink-700 rounded-xl p-4'}>
    IG&rsquo;s CFDs and spread betting are leveraged products and can result in losses that exceed
    your deposits. Please ensure you understand how these products work and whether you can afford
    to take the high risk of losing money. Tradevia is an independent marketing site and does not
    provide brokerage services &mdash; trading is offered by IG Group.
  </div>
)

export default RiskBanner