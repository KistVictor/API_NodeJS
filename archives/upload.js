import fs from 'fs'

fs.createReadStream('caminho onde esta')
  .pipe(fs.createWriteStream('caminho a salvar'))
  .on('finish', () => {})