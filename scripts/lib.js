const fs = require('fs')
const path = require('path')
const { forFile, mkdir } = require('san-webkit/scripts/utils')
const sass = require('node-sass')
const babel = require('@babel/core')

function transpile(code) {
  return babel.transformSync(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          // useBuiltIns: 'usage',
          targets: {
            chrome: '90',
          },
          modules: false,
          // corejs: 2,
        },
      ],

      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-react-jsx',
      [require('@babel/plugin-proposal-class-properties'), { loose: true }],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-optional-chaining',
    ],
  })
}

let ROOT = path.resolve(__dirname, '..')
const SRC = path.resolve(ROOT, 'src')
const LIB = path.resolve(ROOT, 'lib')

fs.rmSync(LIB, { recursive: true, force: true })

async function main() {
  let i = 0
  await forFile(['src/**'], (entry) => {
    // console.log(entry)
    const filePath = entry.replace('src/', '')

    const srcFilePath = path.resolve(SRC, filePath)
    let libFilePath = path.resolve(LIB, filePath)
    let file = fs.readFileSync(srcFilePath)

    if (libFilePath.endsWith('.module.scss')) {
      libFilePath = libFilePath.replace('.scss', '.css')
      file = file.toString()
      file = file.replace(/~@san/g, 'node_modules/@san')

      const result = sass.renderSync({ data: file })
      file = result.css.toString()
    } else if (libFilePath.endsWith('.js')) {
      file = file.toString()
      file = transpile(file).code
      file = file.replace(/\.module\.scss/g, '.module.css')
    }

    mkdir(path.dirname(libFilePath))

    fs.writeFileSync(libFilePath, file)
  })
}
main()
