import logo from '@assets/logo.svg'
import { Col, Image, Layout, Menu, Row, Space, Typography } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import WalletButton from '../../components/WalletButton'

const { Header: AntHeader } = Layout
const { Title } = Typography

interface HeaderProps {
  network: string
  title: string
  items: ItemType[]
}

export function Header({ title, items, network }: HeaderProps) {
  const router = useRouter()
  const [selectedKey, setSelectedKey] = useState<string>('')
  const screens = useBreakpoint()
  const isSmallDevices = (screens.xs || screens.sm) && !screens.md && !screens.lg

  useEffect(() => {
    setSelectedKey(router.route)
  }, [router.route])

  return (
    <AntHeader>
      <Row align='middle'>
        <Col span={8}>
          <a href={`/${network}`}>
            <Space align='center' wrap size={12}>
              <Image preview={false} height={27} src={logo.src} alt='logo' />

              <Title style={{ fontWeight: '400' }} level={5}>
                {title}
              </Title>
            </Space>
          </a>
        </Col>
        <Col span={16}>
          <Row align='middle' justify='end' gutter={8}>
            <Col span={18} flex='200px'>
              <Menu
                selectedKeys={[selectedKey]}
                mode='horizontal'
                style={{ minWidth: '0', flex: `${!isSmallDevices ? '1 0 auto' : ''}` }}
                items={items}
              />
            </Col>
            <Col>
              <WalletButton />
            </Col>
          </Row>
        </Col>
      </Row>
    </AntHeader>
  )
}
