/// <reference types="multer" />
import { Tag } from "@aws-sdk/client-s3";
export type StoredFile = {
    name: string;
    path: string;
    prefix: string;
    type: string;
    eTag?: string;
};
export declare class FileService {
    private s3Client;
    uploadImage(file: Express.Multer.File, options?: {
        tags?: Tag[];
    }): Promise<StoredFile>;
    upload(file: Express.Multer.File, bucket: string, options?: {
        tags?: Tag[];
    }): Promise<StoredFile>;
}
