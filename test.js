const fs = require('fs')

fs.readdir('./notes', (err, files) => {
  if (err) return
  console.log('files', files)
  // - [name](./notes/name.md)
  if (Array.isArray(files)) {
    files = files.sort((a, b) => +a.slice(0,1) - (+b.slice(0,1)) )
    async function getItem() {
      for (let i = 0; i<files.length; i++) {
        await fs.appendFileSync('./readme.txt', `- [${files[i].slice(0, -3)}](./notes/${files[i]}) \n`, { encoding: 'utf8'}, (err) => {
          if (err) {
            console.log(err)
          }
        })
       }
    }
    getItem()
  }
})