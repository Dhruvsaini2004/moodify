const imagekit = require("@imagekit/nodejs").default

const client = new imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

export async function uploadFile({buffer,fileName,folder=""}){

    const file = await client.files.upload({
        file:buffer,
        fileName,
        folder:folder
    })

    return file
}