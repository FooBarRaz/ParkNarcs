/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNarcInput = {
  id?: string | null,
  comment: string,
  date: string,
  location: string,
  licensePlate: string,
  state: string,
  postedBy: string,
  _version?: number | null,
};

export type ModelNarcConditionInput = {
  comment?: ModelStringInput | null,
  date?: ModelStringInput | null,
  location?: ModelStringInput | null,
  licensePlate?: ModelStringInput | null,
  state?: ModelStringInput | null,
  postedBy?: ModelIDInput | null,
  and?: Array< ModelNarcConditionInput | null > | null,
  or?: Array< ModelNarcConditionInput | null > | null,
  not?: ModelNarcConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Narc = {
  __typename: "Narc",
  id: string,
  comment: string,
  date: string,
  location: string,
  licensePlate: string,
  state: string,
  postedBy: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNarcInput = {
  id: string,
  comment?: string | null,
  date?: string | null,
  location?: string | null,
  licensePlate?: string | null,
  state?: string | null,
  postedBy?: string | null,
  _version?: number | null,
};

export type DeleteNarcInput = {
  id: string,
  _version?: number | null,
};

export type ModelNarcFilterInput = {
  id?: ModelIDInput | null,
  comment?: ModelStringInput | null,
  date?: ModelStringInput | null,
  location?: ModelStringInput | null,
  licensePlate?: ModelStringInput | null,
  state?: ModelStringInput | null,
  postedBy?: ModelIDInput | null,
  and?: Array< ModelNarcFilterInput | null > | null,
  or?: Array< ModelNarcFilterInput | null > | null,
  not?: ModelNarcFilterInput | null,
};

export type ModelNarcConnection = {
  __typename: "ModelNarcConnection",
  items?:  Array<Narc | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateNarcMutationVariables = {
  input: CreateNarcInput,
  condition?: ModelNarcConditionInput | null,
};

export type CreateNarcMutation = {
  createNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNarcMutationVariables = {
  input: UpdateNarcInput,
  condition?: ModelNarcConditionInput | null,
};

export type UpdateNarcMutation = {
  updateNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNarcMutationVariables = {
  input: DeleteNarcInput,
  condition?: ModelNarcConditionInput | null,
};

export type DeleteNarcMutation = {
  deleteNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SyncNarcsQueryVariables = {
  filter?: ModelNarcFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncNarcsQuery = {
  syncNarcs?:  {
    __typename: "ModelNarcConnection",
    items?:  Array< {
      __typename: "Narc",
      id: string,
      comment: string,
      date: string,
      location: string,
      licensePlate: string,
      state: string,
      postedBy: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetNarcQueryVariables = {
  id: string,
};

export type GetNarcQuery = {
  getNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNarcsQueryVariables = {
  filter?: ModelNarcFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNarcsQuery = {
  listNarcs?:  {
    __typename: "ModelNarcConnection",
    items?:  Array< {
      __typename: "Narc",
      id: string,
      comment: string,
      date: string,
      location: string,
      licensePlate: string,
      state: string,
      postedBy: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateNarcSubscription = {
  onCreateNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNarcSubscription = {
  onUpdateNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNarcSubscription = {
  onDeleteNarc?:  {
    __typename: "Narc",
    id: string,
    comment: string,
    date: string,
    location: string,
    licensePlate: string,
    state: string,
    postedBy: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
