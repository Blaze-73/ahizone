import sharp from 'sharp'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

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

for (const file of images) {
  const input = readFileSync(file)
  const meta = await sharp(input).metadata()
  const originalSize = input.length

  if (meta.width > 1920 || originalSize > 500 * 1024) {
    const resized = await sharp(input)
      .resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer()

    writeFileSync(file, resized)
    const saved = ((originalSize - resized.length) / originalSize * 100).toFixed(1)
    console.log(`${file.split(/[/\\]/).slice(-2).join('/')}: ${(originalSize/1024).toFixed(0)}KB → ${(resized.length/1024).toFixed(0)}KB (${saved}% saved)`)
  } else {
    console.log(`${file.split(/[/\\]/).slice(-2).join('/')}: skipped (${(originalSize/1024).toFixed(0)}KB, ${meta.width}px)`)
  }
}

console.log('\nDone!')
