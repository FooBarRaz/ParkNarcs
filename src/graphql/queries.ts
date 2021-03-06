/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNarc = /* GraphQL */ `
  query GetNarc($id: ID!) {
    getNarc(id: $id) {
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
    }
  }
`;
export const listNarcs = /* GraphQL */ `
  query ListNarcs(
    $filter: ModelNarcFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNarcs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNarcs = /* GraphQL */ `
  query SyncNarcs(
    $filter: ModelNarcFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNarcs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
