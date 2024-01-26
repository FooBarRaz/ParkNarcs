/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createNarc = /* GraphQL */ `mutation CreateNarc(
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
    image
    postedBy
    _version
    _deleted
    _lastChangedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNarcMutationVariables,
  APITypes.CreateNarcMutation
>;
export const updateNarc = /* GraphQL */ `mutation UpdateNarc(
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
    image
    postedBy
    _version
    _deleted
    _lastChangedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNarcMutationVariables,
  APITypes.UpdateNarcMutation
>;
export const deleteNarc = /* GraphQL */ `mutation DeleteNarc(
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
    image
    postedBy
    _version
    _deleted
    _lastChangedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNarcMutationVariables,
  APITypes.DeleteNarcMutation
>;
