const fs = require('fs')
const path = require('path')
const { forFile, mkdir } = require('san-webkit/scripts/utils')
const sass = require('node-sass')

let ROOT = path.resolve(__dirname, '..')
const SRC = path.resolve(ROOT, 'src')
const LIB = path.resolve(ROOT, 'lib')

async function main() {
  let i = 0
  await forFile(['src/**'], (entry) => {
    // console.log(entry)
    const filePath = entry.replace('src/', '')

    const srcFilePath = path.resolve(SRC, filePath)
    let libFilePath = path.resolve(LIB, filePath)
    let file = fs.readFileSync(srcFilePath)

    if (libFilePath.endsWith('.module.scss')) {
      return
      libFilePath = libFilePath.replace('.scss', '.css')
      file = file.toString()
      file = file.replace(/~@san/g, 'node_modules/@san')

      const result = sass.renderSync({ data: file })
      file = result.css.toString()
    } else if (libFilePath.endsWith('.js')) {
      if (i < 0) {
      }

      return
    } else {
      return
    }

    mkdir(path.dirname(libFilePath))

    fs.writeFileSync(libFilePath, file)
  })
}
main()
