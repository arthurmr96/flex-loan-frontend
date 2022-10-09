import { gql } from '@apollo/client'

export interface LenderBalanceQueryVars {
  lender: string
}

export interface LenderBalanceQueryData {
  lender: {
    amount: string
  }
}

export const LENDER_BALANCE_QUERY = gql`
  query LenderBalance($lender: String!) {
    lender(id: $lender) {
      amount
    }
  }
`
