import fs from 'fs'
import path from 'path'

export default function uploadTratament(imgFolder, fileName, callBack) {

  const type = path.extname(imgFolder)
  const validTypes = ['.jpg', '.png', '.jpeg']
  const isAValidType = validTypes.indexOf(type) !== -1

  if (isAValidType) {
    const newFolder = `./assets/write/${fileName}${type}`
    fs.createReadStream(imgFolder)
    .pipe(fs.createWriteStream(newFolder))
    .on('finish', () => callBack(false, newFolder))
  }
  else {
    const error = 'O tipo da imagem é inválida, tente outro formato!'
    console.log('invalid type')
    callBack(error)
  }
}