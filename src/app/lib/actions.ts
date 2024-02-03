"use server";
import { generateClient } from "aws-amplify/api/server";
import { cookies } from "next/headers";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";
import { post } from "aws-amplify/api";

export async function fetchPosts() {
  const listPostsQuery = `query ListPosts {
    listPosts {
      items {
        id
        title
        image
      }
    }
  }
    `

  const response = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (context) => {
      const client = generateClient({
        config: {
        },
        authMode: "userPool",
        authToken: context.token.value.toString()
      });

      return client.graphql(context, {
        query: listPostsQuery
      }) as any
    },
  });
  console.log('received data: ', response.data.listPosts.items);
  const imagePrefix = "https://d2r7le5mwpiers.cloudfront.net/resized_public/";
  return response.data.listPosts.items.map((post: any) => {

    return {
      ...post,
      image: `${imagePrefix}${post.image}`
    }
  });
}

// export async function handleImageUpload(formData: FormData) {
//   console.log("handleImageUpload");
//   const image = formData.get("image");
//   if (image) {
//     const extension = "png";
//     const filename = `${Date.now()}-${formData.get("title")}.${extension}`;

//     try {
//       const response = await runWithAmplifyServerContext({
//         nextServerContext: { cookies },
//         operation: (context) => {
//           const encodedFormData = btoa(JSON.stringify(formData));
//           return post(context, {
//             apiName: "parkNarcsREST",
//             path: "/posts",
//             options: {
//               body: encodedFormData,
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             },
//           }).response;
//         },
//       });
//       await response.body.json().then((data) => console.log(data));
//     } catch (error) {
//       console.log("Error : ", error);
//     }
//     revalidatePath("/posts/create");
//     redirect("/");
//   } else {
//     console.log("No image");
//   }
// }
