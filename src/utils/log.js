const fs = require('fs')
const path = require('path')

/**
 * 写日志
 * @param writeStream
 * @param log
 */
const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n')
}

/**
 * 生成writeStream
 * @param fileName
 * @returns {WriteStream}
 */
const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  return fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
}

/**
 * 访问access日志
 * @param log
 * @type {WriteStream}
 */
const accessWriteStream = createWriteStream('access.log')
const access = log => {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}