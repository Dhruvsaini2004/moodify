const songModel = require("../models/song.model")
const id3 = require("node-id3");
const { uploadFile } = require("../services/storage.service");


async function uploadSong(req, res) {
    const songBuffer = req.file.songBuffer;
    const tags = id3.read(songBuffer)

    const {mood} = req.body 

    const [songFile, posterFile] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            fileName: tags.title + ".mp3",
            folder: "moodify/songs"
        }),
        uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: tags.title + ".jpeg",
            folder: "moodify/posters"
        })
    ])

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood
    })

    res.status(201).json({
        message: "Song uploaded",
        song
    })
}

module.exports = { uploadSong }