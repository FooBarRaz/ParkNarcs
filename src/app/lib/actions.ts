"use server";
import { uploadData } from "aws-amplify/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleImageUpload(formData: FormData) {
  console.log("handleImageUpload");
  const image = formData.get("image");
  if (image) {
    // const imageData = new FormData();
    // imageData.append('image', image);
    // imageData.append("title", formData.title);
    // imageData.append("description", formData.description);

    // compress image
    // const compressedImage = await sharp(await image.arrayBuffer())
    //   .resize(800)
    //   .toBuffer();

    // generate filename
    const extension = "png";
    const filename = `${Date.now()}-${formData.get("title")}.${extension}`;
    // const imageData = new FormData();
    // imageData.append('image', compressedImage);
    // imageData.append("title", formData.title);
    // imageData.append("description", formData.description);

    try {
      const result = await uploadData({
        key: filename,
        data: image,
        options: {
          accessLevel: "protected",
        },
      }).result;
      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }

    revalidatePath("/posts/create");
    redirect("/");
  } else {
    console.log("No image");
  }
}
