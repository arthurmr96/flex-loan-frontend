import { gql } from '@apollo/client'

export interface LoanVars {
  borrower: string
}

export interface LoanData {
  loans: any
}

export const LOAN_QUERY = gql`
  query loans($borrower: String!) {
    loans(first: 5, where: { borrower: $borrower }) {
      id
      borrower
      collateralTargetAddress
      collateralTargetTokenId
      amount
      liquidatedAmount
      liquidatedAmount
      interestRate
      status
    }
  }
`
