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
const getRandomColor = () => {
  const num = Math.round(0xffffff * Math.random())
  const r = num >> 16
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgb(${r},${g},${b})`
}

const hashCode = (s) =>
  s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)

const sortArray = (array) =>
  array
    .map((item) => ({ item, hash: hashCode(JSON.stringify(item)) }))
    .sort((a, b) => a - b)
    .map(({ item }) => item)

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

const assets = sortArray([
  ...images.map((path) => ({ path, type: 'IMAGE' })),
  ...videos.map((url) => ({ url, type: 'VIDEO' })),
  ...texts.map(({ text, href }) => ({ text, href, type: 'TEXT' }))
]).map((asset) => ({ backgroundColor: getRandomColor(), ...asset }))

const outputFileContent = JSON.stringify(assets, null, '\t')

fs.writeFile(OUTPUT_FILE, outputFileContent, 'utf8', (err) => {
  if (err) throw err
  console.log('The file has been saved!')
})
