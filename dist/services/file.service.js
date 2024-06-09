"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const mime_types_1 = require("mime-types");
let FileService = class FileService {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            forcePathStyle: true,
            endpoint: process.env.S3_ENDPOINT,
            region: "eu-west-1",
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadImage(file, options) {
        return this.upload(file, process.env.S3_IMAGES_BUCKET, options);
    }
    async upload(file, bucket, options) {
        const res = await new lib_storage_1.Upload({
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
            type: (0, mime_types_1.lookup)(file.originalname) || "",
            path: `/storage/${bucket}/${res.Key}`,
            prefix: "/storage",
            eTag: res.ETag,
        };
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map