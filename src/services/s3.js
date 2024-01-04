import crypt from "crypto";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKey = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const generateFileName = (bytes = 32) =>
  crypt.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const getSignedImageUrl = async (image) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: image,
  });
  const url = await getSignedUrl(s3, command);
  return url;
};

export {
  s3,
  PutObjectCommand,
  bucketName,
  generateFileName,
  getSignedImageUrl,
};
