"use client";
import React, { useEffect, useState } from "react";
import { list } from "aws-amplify/storage";
import { Amplify } from "aws-amplify";
import amplifyconfig from "../../amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import { PostsFetcher } from "@/ui/PostsFetcher";

Amplify.configure(amplifyconfig, { ssr: true });

const ImageList: React.FC = () => {
  // const [images, setImages] = useState<string[]>([]);

  // useEffect(() => {
  //   // Fetch images from S3 bucket
  //   fetchImagesFromS3Bucket()
  //     .then((imageUrls) => setImages(imageUrls))
  //     .catch((error) => console.error("Error fetching images:", error));
  // }, []);

  // const fetchImagesFromS3Bucket = async (): Promise<string[]> => {
  //   try {
  //     const { items } = await list({
  //       options: {
  //         accessLevel: "guest",
  //       },
  //     });

  //     // Extract image URLs from the result
  //     const cloudfrontUrl = "https://d2r7le5mwpiers.cloudfront.net/public";
  //     const imageUrls = items.map(
  //       (item: any) => `${cloudfrontUrl}/${item.key}`
  //     );
  //     console.log("fetched images", imageUrls);
  //     return imageUrls;
  //   } catch (error) {
  //     throw new Error("Failed to fetch images from S3 bucket");
  //   }
  // };

  return (
    <div>
      <h1>Image List</h1>
      <PostsFetcher/>
      {/* {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Image ${index}`} />
        </div>
      ))} */}
    </div>
  );
};

export default ImageList;
