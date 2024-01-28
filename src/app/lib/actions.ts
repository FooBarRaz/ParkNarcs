"use server";
import { post } from "aws-amplify/api/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";
import { cookies } from "next/headers";

export async function handleImageUpload(formData: FormData) {
  console.log("handleImageUpload");
  const image = formData.get("image");
  if (image) {
    const extension = "png";
    const filename = `${Date.now()}-${formData.get("title")}.${extension}`;

    try {
      const response = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (context) => {
          const encodedFormData = btoa(JSON.stringify(formData));
          return post(context, {
            apiName: "parkNarcsREST",
            path: "/posts",
            options: {
              body: encodedFormData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          }).response;
        },
      });
      await response.body.json().then((data) => console.log(data));
    } catch (error) {
      console.log("Error : ", error);
    }
    revalidatePath("/posts/create");
    redirect("/");
  } else {
    console.log("No image");
  }
}
