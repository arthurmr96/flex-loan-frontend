import axios from 'axios'

interface CollectionServiceProps {
  getCollectionData(): Promise<void>
}

const collectionService = (): CollectionServiceProps => {
  return {
    getCollectionData: async () => {
      const options = {
        method: 'GET',
        url: 'https://goerli.ethereum.coinbasecloud.net/api/nft/v2/contracts/0x46bEF163D6C470a4774f9585F3500Ae3b642e751',
        params: { networkName: 'goerli' },
        headers: {
          accept: 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        auth: {
          username: 'N2WUPUFJRCR6INQTFC3I',
          password: 'YLDLYWAYE6Q3X5XSLHRDSV4EE5SU2ZO7GSUXZC3F'
        },
        mode: 'no-cors'
      }

      axios
        .request(options)
        .then(function (response) {
          console.log('resposta', response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }
}

export default collectionService
