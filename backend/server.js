const express = require("express")
const multer = require("multer")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
destination: "uploads",
filename: (req, file, cb) => {
cb(null, Date.now() + "-" + file.originalname)
}
})

const upload = multer({ storage })

const DB = "data/songs.json"

if (!fs.existsSync(DB)) {
fs.writeFileSync(DB, "[]")
}

function readSongs() {
return JSON.parse(fs.readFileSync(DB))
}

function saveSongs(data) {
fs.writeFileSync(DB, JSON.stringify(data, null, 2))
}

app.get("/songs", (req, res) => {
res.json(readSongs())
})

app.post("/upload", upload.single("song"), (req, res) => {

let songs = readSongs()

songs.push({
name: req.body.name || req.file.originalname,
artist: req.body.artist || "",
file: req.file.filename
})

saveSongs(songs)

res.json({ success: true })

})

app.listen(3000, () => {
console.log("Server running on port 3000")
})