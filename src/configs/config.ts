
export default {
    address : process.env.API_URL ,
    port : 3000,
    imageURL : {
        s3 : `${process.env.AWS_BUCKET_URL}/uploads/`,
        local : `${process.env.API_URL}/uploads/`
    } 
}