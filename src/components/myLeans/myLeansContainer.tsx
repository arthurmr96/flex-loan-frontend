import { LoadingOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { LoanData, LoanVars, LOAN_QUERY } from '../../graphql/query/LoanQuery'
import { walletAccountVar } from '../../graphql/variables/walletVariable'
import MyLoanCard from './myLoansCard'

function MyLeansContainer() {
  const walletAccount = walletAccountVar()
  const { data, loading: loadingLoan } = useQuery<LoanData, LoanVars>(LOAN_QUERY, {
    variables: {
      borrower: walletAccount?.toLowerCase()
    },
    skip: !walletAccount
  })
  console.log(walletAccount)
  console.log(data)
  return (
    <>
      {loadingLoan && <LoadingOutlined />}
      {!loadingLoan && data?.loans.map((loan: any) => <MyLoanCard data={loan} />)}
    </>
  )
}

export default MyLeansContainer
