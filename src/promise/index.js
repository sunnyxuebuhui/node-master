const path = require('path')
const fs = require('fs')

const getFileContent = fileName => {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
}

module.exports = {
  getFileContent
}