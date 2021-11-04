/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNarc = /* GraphQL */ `
  mutation CreateNarc(
    $input: CreateNarcInput!
    $condition: ModelNarcConditionInput
  ) {
    createNarc(input: $input, condition: $condition) {
      id
      comment
      date
      location
      licensePlate
      state
      postedBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateNarc = /* GraphQL */ `
  mutation UpdateNarc(
    $input: UpdateNarcInput!
    $condition: ModelNarcConditionInput
  ) {
    updateNarc(input: $input, condition: $condition) {
      id
      comment
      date
      location
      licensePlate
      state
      postedBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteNarc = /* GraphQL */ `
  mutation DeleteNarc(
    $input: DeleteNarcInput!
    $condition: ModelNarcConditionInput
  ) {
    deleteNarc(input: $input, condition: $condition) {
      id
      comment
      date
      location
      licensePlate
      state
      postedBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
