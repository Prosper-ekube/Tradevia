import type { ReactNode } from 'react'
import { classNames } from '@/utils/format'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={classNames('container-page', className)}>{children}</div>
)

export default Container
