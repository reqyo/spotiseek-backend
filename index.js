const slsk = require('slsk-client')
const music = require('./music.json')
require('dotenv').config()

let downloaded = true

slsk.connect(
  {
    user: process.env.USER,
    pass: process.env.PASS
  },
  (err, client) => {
    console.log(err)
    if (client) {
      console.log(client)
      // console.log(err)
      for (
        let index = 0;
        index < music.length;
        index = downloaded ? index + 1 : index
      ) {
        downloaded = false
        console.log('About to search')
        client.search(
          {
            req: music[index].track.name,
            timeout: 5000
          },
          (err, res) => {
            if (err) return console.log(err)
            client.download(
              {
                file: res[0],
                path: `${__dirname}/${track.track.name}.mp3`
              },
              (err, data) => {
                if (data) {
                  downloaded = true
                }
              }
            )
          }
        )
      }
    }
  }
)
