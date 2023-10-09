const { createCanvas, registerFont, loadImage } = require('canvas')
import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import { mkdtempSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from 'path'
// import { dataUriToBuffer } from 'data-uri-to-buffer';
// import font from '../../../public/rounded-x-mplus-1c-medium.ttf';
// // フォントのバッファを作成 atode
// // const fontBuf = dataUriToBuffer(font);
// // const td = mkdtempSync(path.join(tmpdir(), "font_temp"));
// // const fontFile = path.join(td, "Rounded-Mplus-1c.ttf");
// // writeFileSync(fontFile, fontBuf);
// // registerFont(fontFile, { family: 'Rounded-Mplus-1c' });

// // 画像生成
// const creatSharedImage = async (res: NextApiResponse, aid: string) => {
//   try {
//     // JSONファイルのパス
//     const filePath = 'src/data/anime_title_obj.json';
//     // ファイルを非同期で読み込む
//     const data = await fs.promises.readFile(filePath, 'utf8');
//     let nendo: string = aid.slice(0, 2);
//     let season: string = "";
//     switch (aid.slice(2, 3)) {
//       case "1":
//         season = "fuyu";
//         break;
//       case "2":
//         season = "haru";
//         break;
//       case "3":
//         season = "natu";
//         break;
//       case "4":
//         season = "aki";
//         break;
//     };
//     // JSON文字列をオブジェクトにパース
//     const jsonObject = JSON.parse(data);
//     const shared_this_anime_title = jsonObject[nendo + season];
//     const key: string = Object.keys(shared_this_anime_title).find(key => shared_this_anime_title[key]["aid"] === aid) as string;
//     console.log('key:', key);
//     const title = key;
//     console.log('title:', title);
//     return title;
//   } catch (error) {
//     console.error('エラー:', error);
//     throw error;
//   }
// };

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   // クエリパラメーターからテキストを取得
//   const aid: string = Array.isArray(req.query.aid) ? req.query.aid[0] : req.query.aid as string;
//   console.log("aid" + aid);
//   let titles = await creatSharedImage(res, aid);
//   const defaultText = 'Default Text';
//   const finalText = titles || defaultText;
//   const canvas = createCanvas(1200, 630);
//   const ctx = canvas.getContext('2d');
//   ctx.font = '20px Arial';
//   // ctx.font = '20px Rounded-Mplus-1c';
//   ctx.fillText(finalText, 60, 120);
//   const buf = canvas.toBuffer();
//   const cacheAge = 7 * 24 * 60 * 60; // 分から秒に変換
//   res.setHeader('Content-Type', 'image/png');
//   res.setHeader('Content-Length', buf.length.toString());// 文字列に変換
//   res.setHeader('Cache-Control', `public, max-age=${cacheAge}`);
//   res.setHeader('Expires', new Date(Date.now() + cacheAge * 1000).toUTCString());// 秒単位で設定
//   res.status(200).end(buf);
// };
const createOgp = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { aid } = req.query;
  const WIDTH = 1200 as const;
  const HEIGHT = 630 as const;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  registerFont(path.resolve("./src/fonts/rounded-x-mplus-1c-medium.ttf"), {
    family: "Rounded-Mplus-1c",
  });
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.font = '70px "Rounded-Mplus-1c"';
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = "これは" + String(aid) + "です(test)";
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
  const buffer = canvas.toBuffer();
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
}

export default createOgp;