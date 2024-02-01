import { uploadData } from "aws-amplify/storage";
import { ChangeEvent, useState } from "react";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";

interface FormData {
  title: string;
  description: string;
}

const client = generateClient();

const ImageUploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (image) {
      console.log("gonna upload this here file right here now..");
      const fileName = `${Date.now()}-${formData.title}.png`;
      await uploadData({
        data: image,
        key: fileName,
        options: {
          accessLevel: "guest",
        },
      }).result.then((result) => {
        return client.graphql({
          query: mutations.createPost,
          variables: {
            input: {
              title: formData.title,
              image: result.key,
            },
          },
        });
      });
      console.log('uploaded and updated the db');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-bold">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          className="border p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-bold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </form>
  );
};

export default ImageUploadForm;
