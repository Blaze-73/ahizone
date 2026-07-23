import sharp from 'sharp'
import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync, existsSync } from 'fs'
import { join, extname, parse } from 'path'

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) files.push(full)
  }
  return files
}

const images = walk('public/images')
let totalSaved = 0
let totalOriginal = 0

for (const file of images) {
  const input = readFileSync(file)
  const meta = await sharp(input).metadata()
  const originalSize = input.length
  const { dir, name } = parse(file)
  const webpPath = join(dir, `${name}.webp`)

  const pipeline = sharp(input)

  if (meta.width > 1920) {
    pipeline.resize({ width: 1920, withoutEnlargement: true })
  }

  const quality = originalSize > 500 * 1024 ? 75 : 85

  const webpBuffer = await pipeline.webp({ quality }).toBuffer()

  writeFileSync(webpPath, webpBuffer)

  const saved = originalSize - webpBuffer.length
  totalSaved += saved
  totalOriginal += originalSize
  const pct = ((saved / originalSize) * 100).toFixed(1)

  console.log(
    `${file.split(/[/\\]/).slice(-2).join('/')}: ${(originalSize / 1024).toFixed(0)}KB → ${(webpBuffer.length / 1024).toFixed(0)}KB (${pct}% saved)`
  )
}

const totalPct = ((totalSaved / totalOriginal) * 100).toFixed(1)
console.log(`\nTotal: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB → ${((totalOriginal - totalSaved) / 1024 / 1024).toFixed(1)}MB (${totalPct}% saved)`)
console.log('Done!')
