/**
 * Generates minimal PWA icon PNGs for the public folder.
 * Run: node scripts/generate-pwa-icons.mjs
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import zlib from 'node:zlib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crc])
}

function createPng(size, r, g, b) {
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1)
    raw[row] = 0
    for (let x = 0; x < size; x++) {
      const px = row + 1 + x * 4
      const corner =
        (x < size * 0.15 || x > size * 0.85 || y < size * 0.15 || y > size * 0.85) &&
        Math.hypot(x - size / 2, y - size / 2) > size * 0.35
      if (corner) {
        raw[px] = 0
        raw[px + 1] = 0
        raw[px + 2] = 0
        raw[px + 3] = 0
      } else {
        raw[px] = r
        raw[px + 1] = g
        raw[px + 2] = b
        raw[px + 3] = 255
      }
    }
  }

  const compressed = zlib.deflateSync(raw)
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

for (const size of [192, 512]) {
  const png = createPng(size, 37, 99, 235)
  writeFileSync(join(publicDir, `pwa-${size}x${size}.png`), png)
  console.log(`Created pwa-${size}x${size}.png`)
}
