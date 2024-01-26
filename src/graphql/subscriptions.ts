/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateNarc = /* GraphQL */ `subscription OnCreateNarc {
  onCreateNarc {
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
` as GeneratedSubscription<
  APITypes.OnCreateNarcSubscriptionVariables,
  APITypes.OnCreateNarcSubscription
>;
export const onUpdateNarc = /* GraphQL */ `subscription OnUpdateNarc {
  onUpdateNarc {
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
` as GeneratedSubscription<
  APITypes.OnUpdateNarcSubscriptionVariables,
  APITypes.OnUpdateNarcSubscription
>;
export const onDeleteNarc = /* GraphQL */ `subscription OnDeleteNarc {
  onDeleteNarc {
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
` as GeneratedSubscription<
  APITypes.OnDeleteNarcSubscriptionVariables,
  APITypes.OnDeleteNarcSubscription
>;
