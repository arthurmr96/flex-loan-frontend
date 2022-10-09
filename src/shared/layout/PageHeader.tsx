import { PageHeader as AntPageHeader, RowProps } from 'antd'
import { ReactNode } from 'react'

export interface PageHeaderProps {
  pageHeaderProps?: RowProps
  subtitle?: ReactNode
  pageHeaderAfter?: ReactNode
  pageHeaderTitle?: ReactNode
}

export function PageHeader({ pageHeaderProps, pageHeaderAfter, pageHeaderTitle, subtitle }: PageHeaderProps) {
  return <AntPageHeader subTitle={subtitle} title={pageHeaderTitle} extra={pageHeaderAfter} {...pageHeaderProps} />
}
