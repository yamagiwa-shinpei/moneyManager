/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
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
export const onCreatePayments = /* GraphQL */ `
  subscription OnCreatePayments {
    onCreatePayments {
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
export const onUpdatePayments = /* GraphQL */ `
  subscription OnUpdatePayments {
    onUpdatePayments {
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
export const onDeletePayments = /* GraphQL */ `
  subscription OnDeletePayments {
    onDeletePayments {
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
export const onCreateTargetValue = /* GraphQL */ `
  subscription OnCreateTargetValue {
    onCreateTargetValue {
      id
      value
    }
  }
`;
export const onUpdateTargetValue = /* GraphQL */ `
  subscription OnUpdateTargetValue {
    onUpdateTargetValue {
      id
      value
    }
  }
`;
export const onDeleteTargetValue = /* GraphQL */ `
  subscription OnDeleteTargetValue {
    onDeleteTargetValue {
      id
      value
    }
  }
`;
