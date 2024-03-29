import { PostsFetcher } from "@/ui/PostsFetcher";
import { Amplify } from "aws-amplify";
import { Suspense } from "react";
import config from '@/amplifyconfiguration.json';

Amplify.configure(config, { ssr: true });

const ImageList = async () => {
  return (
    <div>
      <h1>Image List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsFetcher />
      </Suspense>
    </div>
  );
};

export default ImageList;
