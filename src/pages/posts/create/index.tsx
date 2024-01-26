import ImageUploadForm from '../../../components/ImageUploadForm.server';
import { Amplify } from 'aws-amplify';
import awsmobile from '../../../aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsmobile);

const CreatePost = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-5 text-2xl font-bold text-blue-700">Upload Image</h1>
      <div className="w-64 p-5 bg-white rounded shadow">
        <ImageUploadForm />
      </div>
    </div>
  );
};

export default withAuthenticator(CreatePost);