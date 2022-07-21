const slsk = require('slsk-client')
slsk.connect(
  {
    user: '',
    pass: ''
  },
  (err, client) => {
    client.search(
      {
        req: 'random',
        timeout: 2000
      },
      (err, res) => {
        if (err) return console.log(err)
        console.log('about to dl')
        client.download(
          {
            file: res[0],
            path: __dirname + '/random.mp3'
          },
          (err, data) => {
            //can res.send(data.buffer) if you use express
          }
        )
      }
    )
  }
)
