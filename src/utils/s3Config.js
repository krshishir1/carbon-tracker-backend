const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { Upload } = require("@aws-sdk/lib-storage");
const path = require("path");

const region = process.env.AWS_REGION || "us-east-1";
const bucketName = process.env.AWS_BUCKET_NAME;

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error("AWS credentials are not defined in environment variables!");
}
if (!bucketName) {
    console.error("AWS_BUCKET_NAME is not defined in environment variables!");
}

console.log(`Initializing S3 Client in region: ${region} for bucket: ${bucketName}`);

const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
    }
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    }
});

const uploadToS3 = async (file, folder = "posts") => {
    const fileName = `${folder}/${Date.now()}-${path.basename(file.originalname)}`;

    const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        },
    });

    const result = await parallelUploads3.done();
    return result.Location; // Returns the public URL
};

module.exports = { upload, uploadToS3 };
