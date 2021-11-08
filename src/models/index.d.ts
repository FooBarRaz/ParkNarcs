import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NarcMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Narc {
  readonly id: string;
  readonly comment: string;
  readonly date: string;
  readonly location: string;
  readonly licensePlate: string;
  readonly state: string;
  readonly image: string;
  readonly postedBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Narc, NarcMetaData>);
  static copyOf(source: Narc, mutator: (draft: MutableModel<Narc, NarcMetaData>) => MutableModel<Narc, NarcMetaData> | void): Narc;
}