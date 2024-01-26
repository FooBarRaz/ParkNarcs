import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type NarcMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerNarc = {
  readonly id: string;
  readonly comment: string;
  readonly date: string;
  readonly location: string;
  readonly licensePlate: string;
  readonly state: string;
  readonly image: string;
  readonly postedBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNarc = {
  readonly id: string;
  readonly comment: string;
  readonly date: string;
  readonly location: string;
  readonly licensePlate: string;
  readonly state: string;
  readonly image: string;
  readonly postedBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Narc = LazyLoading extends LazyLoadingDisabled ? EagerNarc : LazyNarc

export declare const Narc: (new (init: ModelInit<Narc, NarcMetaData>) => Narc) & {
  copyOf(source: Narc, mutator: (draft: MutableModel<Narc, NarcMetaData>) => MutableModel<Narc, NarcMetaData> | void): Narc;
}