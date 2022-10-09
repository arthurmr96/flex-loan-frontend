import { LoadingOutlined } from '@ant-design/icons'
import { useQuery, useReactiveVar } from '@apollo/client'
import { LOAN_QUERY, LoanData, LoanVars } from '../../graphql/query/LoanQuery'
import { walletAccountVar } from '../../graphql/variables/walletVariable'
import MyLoanCard from './myLoansCard'

function MyLeansContainer() {
  const walletAccount = useReactiveVar(walletAccountVar)
  const { data, loading: loadingLoan } = useQuery<LoanData, LoanVars>(LOAN_QUERY, {
    variables: {
      borrower: walletAccount?.toLowerCase()
    },
    skip: !walletAccount
  })

  return (
    <>
      {loadingLoan && <LoadingOutlined />}
      {!loadingLoan && data?.loans.map((loan: any) => <MyLoanCard data={loan} />)}
    </>
  )
}

export default MyLeansContainer
