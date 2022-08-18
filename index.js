const slsk = require('slsk-client')
const music = require('./music.json')
const util = require('util')
// https://zellwk.com/blog/converting-callbacks-to-promises/
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
let currentIndex = 1

async function searchForMusic(m) {
  const search = util.promisify(client.search)
  const download = util.promisify(client.download)
  const length = m.length
  console.log(length)
  do {
    console.log('About to search')
    let res
    try {
      res = await search({
        req: m[currentIndex].track.name,
        timeout: 5000
      })
    } catch (e) {
      console.log('Error', e)
    }

    const files = res.filter((item) => item.slots && item.bitrate === 320)
    if (files.length === 0) {
      console.log('No files found')
      continue
    }
    console.log(files)
    console.log(files.length, `Got the search: ${files[0]}`)
    console.log('About to download')
    let data
    try {
      data = await download({
        file: files[0]
      })
    } catch (e) {
      console.log('Error: ', e)
    }
    console.log('Downloaded!')
    console.log(data)

    // step into debugger, log stuff out.

    currentIndex++
  } while (currentIndex < length)
}
