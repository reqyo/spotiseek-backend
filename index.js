const slsk = require('slsk-client')
const music = require('./music.json')
require('dotenv').config()

let client

slsk.connect(
  {
    user: process.env.USER,
    pass: process.env.PASS
  },
  (err, c) => {
    if (err) {
      throw new Error(err)
    }
    if (c) console.log("I'm in.")
    client = c
    searchForMusic(music)
  }
)
let downloaded = true

function searchForMusic(m) {
  const length = m.length
  console.log(length)
  let currentIndex = 4

  do {
    downloaded = false
    console.log(`Current Song Number ${currentIndex}`)
    console.log('About to search')
    client.search(
      {
        req: m[currentIndex].track.name,
        timeout: 5000
      },
      (err, res) => {
        if (err) return console.log(err)
        const files = res.filter((item) => item.slots && item.bitrate === 320)
        if (files.length === 0) return
        console.log(files)
        console.log(files.length, `Got the search: ${files[0]}`)
        console.log('About to download')
        client.download(
          {
            file: files[0]
          },
          (err, data) => {
            console.log('Downloaded!')
            currentIndex++
            downloaded = true
          }
        )
      }
    )
  } while (currentIndex < length && downloaded)
}
