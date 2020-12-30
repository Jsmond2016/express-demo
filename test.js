const fs = require('fs')

fs.readdir('./notes', (err, files) => {
  if (err) return
  console.log('files', files)
  // - [name](./notes/name.md)
  Array.isArray(files) && files.forEach(item => {

  })
})