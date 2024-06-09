import { Injectable } from "@nestjs/common";
import { S3Client, Tag } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { lookup } from "mime-types";

export type StoredFile = {
  name: string;
  path: string;
  prefix: string;
  type: string;
  eTag?: string;
};

@Injectable()
export class FileService {
  private s3Client = new S3Client({
    forcePathStyle: true,
    endpoint: process.env.S3_ENDPOINT,
    region: "eu-west-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  async uploadImage(file: Express.Multer.File, options?: { tags?: Tag[] }) {
    return this.upload(file, process.env.S3_IMAGES_BUCKET, options);
  }

  async upload(
    file: Express.Multer.File,
    bucket: string,
    options?: { tags?: Tag[] },
  ): Promise<StoredFile> {
    const res = await new Upload({
      client: this.s3Client,
      params: {
        ACL: "public-read",
        Bucket: bucket,
        Key: `${Date.now().toString()}-${file.originalname}`,
        Body: file.buffer,
      },
      tags: options?.tags ?? [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    }).done();

    return {
      name: file.originalname,
      type: lookup(file.originalname) || "",
      path: `/storage/${bucket}/${res.Key}`,
      prefix: "/storage",
      eTag: res.ETag,
    };
  }
}
