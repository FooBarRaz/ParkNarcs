// File: components/ImageUploadForm.server.tsx
import { uploadData } from "aws-amplify/storage";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  description: string;
}

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (image) {
      const imageData = new FormData();
      // imageData.append('image', image);
      imageData.append("title", formData.title);
      imageData.append("description", formData.description);

      console.log("ready to upload image...");

      // upload using aws amplify s3
      // generate filename
      const extension = "png";
      const filename = `${Date.now()}-${formData.title}.${extension}`;

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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-md mx-auto"
    >
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-bold">
          Image
        </label>
        <input
          type="file"
          id="image"
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
