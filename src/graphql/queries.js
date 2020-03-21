/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
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
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        name
        balance
        image
        payment {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPayments = /* GraphQL */ `
  query GetPayments($id: ID!) {
    getPayments(id: $id) {
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
export const listPaymentss = /* GraphQL */ `
  query ListPaymentss(
    $filter: ModelPaymentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
      }
      nextToken
    }
  }
`;
export const getTargetValue = /* GraphQL */ `
  query GetTargetValue($id: ID!) {
    getTargetValue(id: $id) {
      id
      value
    }
  }
`;
export const listTargetValues = /* GraphQL */ `
  query ListTargetValues(
    $filter: ModelTargetValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTargetValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
      }
      nextToken
    }
  }
`;
