import { createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'
import crypto from 'crypto'

registerFont('./lib/NotoSans.ttf', { family: 'NotoSans' })

export default async function welcome({ bg, pfp, text }) {
  const canvas = createCanvas(2000, 2000)
  const ctx = canvas.getContext('2d')

  const [bgImg, pfpImg] = await Promise.all([
    loadImage(bg),
    loadImage(pfp)
  ])

  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

  const x = canvas.width / 2
  const y = canvas.height / 2 - 200
  const r = 410

  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(pfpImg, x - r, y - r, r * 2, r * 2)
  ctx.restore()

  const lines = text.split('\n')
  const baseY = y + r + 100

  lines.forEach((line, i) => {
    ctx.textAlign = 'center'

    if (i === 0) {
      ctx.font = '124px "NotoSans"'
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#000000'
      ctx.shadowBlur = 60
      ctx.lineWidth = 8
      ctx.strokeStyle = '#000000'
    } else {
      ctx.font = '102px "NotoSans"'
      ctx.fillStyle = '#dddddd'
      ctx.shadowColor = '#000000'
      ctx.shadowBlur = 30
      ctx.lineWidth = 6
      ctx.strokeStyle = '#000000'
    }

    const posY = baseY + i * 100
    ctx.strokeText(line, x, posY)
    ctx.fillText(line, x, posY)
  })

  if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
  const path = `./tmp/${crypto.randomBytes(6).toString('hex')}.jpg`
  const out = fs.createWriteStream(path)
  const stream = canvas.createJPEGStream({ quality: 1 })

  await new Promise((res, rej) => {
    stream.pipe(out)
    out.on('finish', res)
    out.on('error', rej)
  })

  return path
}
