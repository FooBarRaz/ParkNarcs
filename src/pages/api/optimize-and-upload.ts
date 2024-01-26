// File: pages/api/optimize-and-upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import multer from 'multer';
// import sharp from 'sharp'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("s3 config:", s3.config);
  if (req.method === 'POST') {
    upload.single('image')(req, res, async (error) => {
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      
      const file = req.body.image as Express.Multer.File;
      try {
        console.log('attempting to optimize image...');
        const optimizedImage = file.buffer; //await sharp(file.buffer).resize(800).toBuffer();

        const params = {
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key: `${Date.now()}_${file.originalname}`,
          Body: optimizedImage,
          ContentType: file.mimetype,
          ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.status(200).send({ message: 'Image uploaded successfully!', data });
        });
      } catch (error) {
        res.status(500).send({ error: (error as Error).message });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
