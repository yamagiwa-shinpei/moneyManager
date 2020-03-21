/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
      id
      type
      name
      balance
      image
      payment {
        items {
          id
          genre
          pay
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
      id
      type
      name
      balance
      image
      payment {
        items {
          id
          genre
          pay
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
      id
      type
      name
      balance
      image
      payment {
        items {
          id
          genre
          pay
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const createPayments = /* GraphQL */ `
  mutation CreatePayments(
    $input: CreatePaymentsInput!
    $condition: ModelPaymentsConditionInput
  ) {
    createPayments(input: $input, condition: $condition) {
      id
      genre
      pay
      createdAt
      card {
        id
        type
        name
        balance
        image
        payment {
          nextToken
        }
      }
    }
  }
`;
export const updatePayments = /* GraphQL */ `
  mutation UpdatePayments(
    $input: UpdatePaymentsInput!
    $condition: ModelPaymentsConditionInput
  ) {
    updatePayments(input: $input, condition: $condition) {
      id
      genre
      pay
      createdAt
      card {
        id
        type
        name
        balance
        image
        payment {
          nextToken
        }
      }
    }
  }
`;
export const deletePayments = /* GraphQL */ `
  mutation DeletePayments(
    $input: DeletePaymentsInput!
    $condition: ModelPaymentsConditionInput
  ) {
    deletePayments(input: $input, condition: $condition) {
      id
      genre
      pay
      createdAt
      card {
        id
        type
        name
        balance
        image
        payment {
          nextToken
        }
      }
    }
  }
`;
export const createTargetValue = /* GraphQL */ `
  mutation CreateTargetValue(
    $input: CreateTargetValueInput!
    $condition: ModelTargetValueConditionInput
  ) {
    createTargetValue(input: $input, condition: $condition) {
      id
      value
    }
  }
`;
export const updateTargetValue = /* GraphQL */ `
  mutation UpdateTargetValue(
    $input: UpdateTargetValueInput!
    $condition: ModelTargetValueConditionInput
  ) {
    updateTargetValue(input: $input, condition: $condition) {
      id
      value
    }
  }
`;
export const deleteTargetValue = /* GraphQL */ `
  mutation DeleteTargetValue(
    $input: DeleteTargetValueInput!
    $condition: ModelTargetValueConditionInput
  ) {
    deleteTargetValue(input: $input, condition: $condition) {
      id
      value
    }
  }
`;
