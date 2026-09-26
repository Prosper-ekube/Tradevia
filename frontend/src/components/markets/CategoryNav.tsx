import { NavLink } from 'react-router-dom'
import { marketCategories } from '@/data/markets'
import { classNames } from '@/utils/format'

const CategoryNav: React.FC = () => (
  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
    <NavLink
      to="/markets"
      end
      className={({ isActive }) =>
        classNames(
          'shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors',
          isActive ? 'bg-ink-950 text-white border-ink-950' : 'border-ink-900/15 text-ink-900 hover:border-ink-900/30',
        )
      }
    >
      All markets
    </NavLink>
    {marketCategories.map((c) => (
      <NavLink
        key={c.slug}
        to={`/markets/${c.slug}`}
        className={({ isActive }) =>
          classNames(
            'shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors',
            isActive ? 'bg-ink-950 text-white border-ink-950' : 'border-ink-900/15 text-ink-900 hover:border-ink-900/30',
          )
        }
      >
        {c.name}
      </NavLink>
    ))}
  </div>
)

export default CategoryNav
