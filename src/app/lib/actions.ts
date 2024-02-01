"use server";
import { generateClient } from "aws-amplify/api/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";

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
  return response.data.listPosts.items;
}

export async function fetchFakeData() {
  console.log('fetchFakeData');
  return Promise.resolve([
    {
      id: '9225e700-7e3f-47fb-b181-14b139c6a39c',
      title: 'threefer',
      image: '1706493409592-parking_three_deep_to_a_row_in_a_wide_open_parking_lot__wedding_party__.jpg.png'
    },
    {
      id: 'e0b14bba-3d27-4b73-be8b-4dce852c4f22',
      title: 'nice',
      image: '1706498642782-Bad+parking+jobs_00d02f_7704829.jpg.png'
    },
    {
      id: '5EfuULoLiSgbNnjZA5yBuC',
      title: 'Anon a-hole',
      image: '5EfuULoLiSgbNnjZA5yBuC.png'
    },
    {
      id: '045bafe5-b66f-472c-9b68-34e28e48a655',
      title: 'foof',
      image: '1706551106513-foof.png'
    },
    {
      id: '6bf753a8-dbe4-4fd8-b6e5-524f414592f8',
      title: 'another three at a time',
      image: '1706495621143-parking_three_deep_to_a_row_in_a_wide_open_parking_lot__wedding_party__.jpg.png'
    },
    {
      id: 'mz1fC6asazqGpMg7RUVxjW',
      title: 'Monday Morning',
      image: 'mz1fC6asazqGpMg7RUVxjW.png'
    },
    {
      id: 'de28e89c-1ddb-4b4f-a473-bf2ea58f2a84',
      title: 'anon',
      image: '1706494276293-don_t_even_have_to_blur_the_license_plate_.jpg.png'
    },
    {
      id: 'hAXQPZUGRHZLBAmmBMrLB9',
      title: 'Space Needle',
      image: 'https://parknarcsimagesuseast1234533-dev.s3.us-east-1.amazonaws.com/hAXQPZUGRHZLBAmmBMrLB9.png'
    },
    {
      id: '205f29e7-3427-41ff-a9b2-bb8b2a327d7d',
      title: 'threefer',
      image: '1706495381537-parking_three_deep_to_a_row_in_a_wide_open_parking_lot__wedding_party__.jpg.png'
    },
    {
      id: 'oHzKg4EK42m9yRfqBkaGMp',
      title: 'Selfish',
      image: 'oHzKg4EK42m9yRfqBkaGMp.png'
    },
    {
      id: '23011602-fa7a-4d04-891b-08d1abd50fa4',
      title: 'wtf',
      image: '1706483516174-monday_morning_moron.jpg.png'
    },
    {
      id: '5db03f06-1375-47ce-b0d5-42c0f51ef264',
      title: 'Foo',
      image: '1706499527601-IMG_2844.jpeg.png'
    }
  ]).then((data) => {
    console.log('received fake data');
    return data;
  })
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
