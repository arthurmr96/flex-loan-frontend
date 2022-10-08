import { PageHeader as AntPageHeader, RowProps } from 'antd'
import { ReactNode } from 'react'

export interface PageHeaderProps {
  pageHeaderProps?: RowProps
  pageHeaderAfter?: ReactNode
  pageHeaderTitle?: ReactNode
}

export function PageHeader({ pageHeaderProps, pageHeaderAfter, pageHeaderTitle }: PageHeaderProps) {
  return <AntPageHeader title={pageHeaderTitle} extra={pageHeaderAfter} {...pageHeaderProps} />
}
