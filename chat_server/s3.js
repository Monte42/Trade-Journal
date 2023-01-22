const aws = require('aws-sdk')
const dotenv = require('dotenv')

const s3 = new aws.S3({
    region: dotenv.AWS_REGION,
    accessKeyId: dotenv.AWS_ACCESS_KEY,
    secretAccessKey: dotenv.AWS_SECRET_ACCESS_KEY,
    signatureVersion: '4',
})

const generateSecureURL = async () => {
    const imgName = `${Math.floor((Math.random() * 900)+100)}-${Math.floor((Math.random() * 8)+1)}-${Math.floor((Math.random() * 90)+10)}`

    const params = ({
        Bucket: dotenv.AWS_BUCKET_NAME,
        Key: imgName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject',params)
    return uploadURL
}
