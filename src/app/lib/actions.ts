"use server";
import { generateClient } from "aws-amplify/api/server";
import { cookies } from "next/headers";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";

export async function fetchInsult() {
  const insultQuery = `query GetInsult {
    insult
  }
  `;

  const response = await runWithAmplifyServerContext({
    nextServerContext: { cookies  },
    operation: (context) => {
      const client = generateClient({
        config: {},
      });

      return client.graphql(context, {
        query: insultQuery,
      }) as any;
    },
  });
  return response.data.insult;
}

export async function fetchPosts() {
  console.log("event=fetchPosts");
  const listPostsQuery = `query ListPosts {
    listPosts {
      items {
        id
        title
        image
      }
    }
  }
    `;

  const response = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (context) => {
      const client = generateClient({
        config: {},
        authMode: "userPool",
        authToken: context.token.value.toString(),
      });

      return client.graphql(context, {
        query: listPostsQuery,
      }) as any;
    },
  });
  console.log("received data: ", response.data.listPosts.items);
  const imagePrefix = "https://d1dt8p2rg7bif8.cloudfront.net/resized_public/";
  return response.data.listPosts.items.map((post: any) => ({
    ...post,
    image: `${imagePrefix}${post.image}`
  }));
}
