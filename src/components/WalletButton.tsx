import { UserOutlined } from '@ant-design/icons'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Avatar, Button, Col, Row } from 'antd'
import { providers } from 'ethers'
import { useEffect, useState } from 'react'
import { clearMultiWalletVars, signerProviderVar, walletAccountVar, walletChainIdVar } from '../graphql/variables/walletVariable'
import { getEns } from '../services/UtilService'

function WalletButton() {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const walletAccount = walletAccountVar()
  const signerProvider = signerProviderVar()

  const connectWallet = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          5: 'https://responsive-neat-putty.ethereum-goerli.discover.quiknode.pro/6f3fda4618bcb8e1aa69584e19713e61e21a0502/'
        }
      })
      await provider.enable()
      //  Wrap with Web3Provider from ethers.js
      const web3Provider = new providers.Web3Provider(provider)

      const wallet = await provider.getWalletConnector()
      walletAccountVar(wallet.accounts[0])
      signerProviderVar(web3Provider)
      walletChainIdVar(wallet.chainId)

      provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts[0]) {
          walletAccountVar(accounts[0])
          signerProviderVar(web3Provider)
        } else {
          clearMultiWalletVars()
        }
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: number) => {
        walletChainIdVar(chainId)
      })
    } catch (error) {
      console.error(`error: walletConnect`, error)
    }
  }

  useEffect(() => {
    const handleName = async () => {
      const ens = await getEns(signerProvider, walletAccount)
      setName(ens.name)
      setAvatar(ens.avatar)
    }

    handleName()
  }, [signerProvider, walletAccount])

  useEffect(() => {
    connectWallet()
  }, [])

  return (
    <Row gutter={8} align='middle' justify='end'>
      <Col>{avatar ? <Avatar size={32} shape='circle' src={avatar} /> : <Avatar size={32} shape='circle' icon={<UserOutlined />} />}</Col>
      <Col>
        <>
          {walletAccount && <Button onClick={connectWallet}>{name}</Button>}
          {!walletAccount && <Button onClick={connectWallet}>connect wallet</Button>}
        </>
      </Col>
    </Row>
  )
}

export default WalletButton
