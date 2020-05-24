const fs = require('fs')
const path = require('path')

const PICTURES_DIRECTORY = path.join(
  __dirname,
  '..',
  'public',
  'static',
  'pictures'
)
const VIDEOS_FILE = path.join(__dirname, '..', 'public', 'static', 'videos.txt')
const TEXTS_FILE = path.join(__dirname, '..', 'public', 'static', 'texts.txt')
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'assets.json')

// https://stackoverflow.com/questions/1484506/random-color-generator
const getRandomColor = (hash) =>
  `#${Math.abs(hash)
    .toString(16)
    .split('')
    .reverse()
    .join('')
    .slice(0, 6)}`

const hashCode = (s) =>
  s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)

const buildAssets = (array) =>
  array
    .map((item) => ({ item, hash: hashCode(JSON.stringify(item)) }))
    .sort((a, b) => a.hash - b.hash)
    .map(({ item, hash }) => ({
      ...item,
      backgroundColor: getRandomColor(hash)
    }))

const images = fs
  .readdirSync(PICTURES_DIRECTORY)
  .filter((file) => file.indexOf('.') !== 0)
  .map((file) => path.join('static', 'pictures', file))

const videos = fs
  .readFileSync(VIDEOS_FILE, { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean) // removes empty lines
const texts = fs
  .readFileSync(TEXTS_FILE, { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean) // removes empty lines
  .map((line) => {
    const match = line.match(/(.*?);;(.*)/)
    if (!match) return { text: line }
    return { text: match[1].trim(), href: match[2].trim() }
  })

const assets = buildAssets([
  ...images.map((path) => ({ path, type: 'IMAGE' })),
  ...videos.map((url) => ({ url, type: 'VIDEO' })),
  ...texts.map(({ text, href }) => ({ text, href, type: 'TEXT' }))
])

const outputFileContent = JSON.stringify(assets, null, '\t')

fs.writeFile(OUTPUT_FILE, outputFileContent, 'utf8', (err) => {
  if (err) throw err
  console.log('The file has been saved!')
})
