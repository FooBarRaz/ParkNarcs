import { InsultsFetcher } from "@/ui/InsultsFetcher";
import { Amplify } from "aws-amplify";
import { Suspense } from "react";
import amplifyconfig from "../../amplifyconfiguration.json";

Amplify.configure(amplifyconfig, { ssr: true });

const ImageList = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <InsultsFetcher />
      </Suspense>
    </div>
  );
};

export default ImageList;
