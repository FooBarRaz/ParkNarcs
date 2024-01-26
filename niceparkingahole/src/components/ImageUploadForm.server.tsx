// File: components/ImageUploadForm.server.tsx

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  title: string;
  description: string;
}

const ImageUploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (image) {
      const imageData = new FormData();
      // imageData.append('image', image);
      imageData.append('title', formData.title);
      imageData.append('description', formData.description);

      try {
        const response = await fetch('/api/optimize-and-upload', {
          method: 'POST',
          body: imageData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
          // Handle success
        } else {
          // Handle error
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;
