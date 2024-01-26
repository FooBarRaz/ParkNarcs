// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Comment, CreatePostResponse } = initSchema(schema);

export {
  Post,
  Comment,
  CreatePostResponse
};