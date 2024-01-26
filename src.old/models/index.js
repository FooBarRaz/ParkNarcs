// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Narc } = initSchema(schema);

export {
  Narc
};