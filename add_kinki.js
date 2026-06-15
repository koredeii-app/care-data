const fs = require('fs');

function readJson(path) {
  const raw = fs.readFileSync(path, 'utf8');
  const hasBom = raw.charCodeAt(0) === 0xFEFF;
  return { hasBom, text: hasBom ? raw.slice(1) : raw };
}

function compact(e) {
  return `    {"id":${e.id},"prefecture":"${e.prefecture}","city":"${e.city}","area":"${e.area}","name":"${e.name}","tel":"${e.tel}","url":"${e.url}"}`;
}

function appendToFile(path, entries) {
  const { hasBom, text } = readJson(path);
  const lastBracket = text.lastIndexOf(']');
  const before = text.slice(0, lastBracket).trimEnd();
  const newText = before + ',\n' + entries.map(compact).join(',\n') + '\n]';
  fs.writeFileSync(path, (hasBom ? '﻿' : '') + newText, 'utf8');
  console.log('Updated ' + path + ': +' + entries.length + ' entries');
}

const base = 'data/';
const nagahamaUrl   = 'https://www.city.nagahama.lg.jp/0000003436.html';
const higashiomiUrl = 'https://www.city.higashiomi.shiga.jp/kennkou_iryou_fukushi/kaigo/1003029/1003033.html';
const ikomaUrl      = 'https://www.city.ikoma.lg.jp/0000001000.html';
const koriyamaUrl   = 'https://www.city.yamatokoriyama.lg.jp/soshiki/chiikihokatsucaresuishinka/koreifukushi/2/1726.html';

// 長浜市・東近江市 → shiga.json
const shigaEntries = [
  {id:2768,prefecture:'滋賀県',city:'長浜市',area:'長浜・六荘・西黒田・神田',name:'南長浜地域包括支援センター',tel:'0749-65-8352',url:'https://www.city.nagahama.lg.jp/0000005114.html'},
  {id:2769,prefecture:'滋賀県',city:'長浜市',area:'神照・南郷里・北郷里',name:'神照郷里地域包括支援センター',tel:'0749-65-8267',url:'https://www.city.nagahama.lg.jp/0000005162.html'},
  {id:2770,prefecture:'滋賀県',city:'長浜市',area:'浅井・びわ・虎姫',name:'浅井びわ虎姫地域包括支援センター',tel:'0749-73-2653',url:'https://www.city.nagahama.lg.jp/0000005163.html'},
  {id:2771,prefecture:'滋賀県',city:'長浜市',area:'湖北・高月',name:'湖北高月地域包括支援センター',tel:'0749-85-5702',url:'https://www.city.nagahama.lg.jp/0000005165.html'},
  {id:2772,prefecture:'滋賀県',city:'長浜市',area:'木之本・余呉・西浅井',name:'木之本余呉西浅井地域包括支援センター',tel:'0749-82-3570',url:'https://www.city.nagahama.lg.jp/0000005166.html'},
  {id:2773,prefecture:'滋賀県',city:'東近江市',area:'永源寺・愛東・湖東',name:'東近江市地域包括支援センター',tel:'0748-24-5641',url:higashiomiUrl},
  {id:2774,prefecture:'滋賀県',city:'東近江市',area:'平田・市辺・玉緒・御園・建部・中野・八日市南部',name:'八日市地域包括支援センター',tel:'050-5801-1278',url:'http://www.higashiomi-shakyo.or.jp/'},
  {id:2775,prefecture:'滋賀県',city:'東近江市',area:'能登川',name:'能登川地域包括支援センター',tel:'0748-29-3198',url:'https://shiga-shinjyukai.or.jp/houkatsushien/'},
  {id:2776,prefecture:'滋賀県',city:'東近江市',area:'五個荘',name:'五個荘地域包括支援センター',tel:'0748-48-5540',url:'https://www.rokushinkai.com/houkatsushien/'},
  {id:2777,prefecture:'滋賀県',city:'東近江市',area:'蒲生',name:'蒲生地域包括支援センター',tel:'050-5802-9680',url:'http://www.higashiomi-shakyo.or.jp/'},
];
appendToFile(base + 'shiga.json', shigaEntries);

// 生駒市・大和郡山市 → nara.json
const naraEntries = [
  {id:2778,prefecture:'奈良県',city:'生駒市',area:'',name:'フォレスト地域包括支援センター',tel:'0743-78-4888',url:ikomaUrl},
  {id:2779,prefecture:'奈良県',city:'生駒市',area:'',name:'メディカル北地域包括支援センター',tel:'0743-71-3500',url:ikomaUrl},
  {id:2780,prefecture:'奈良県',city:'生駒市',area:'',name:'阪奈中央地域包括支援センター',tel:'0743-73-9448',url:ikomaUrl},
  {id:2781,prefecture:'奈良県',city:'生駒市',area:'',name:'東生駒地域包括支援センター',tel:'0743-75-3367',url:ikomaUrl},
  {id:2782,prefecture:'奈良県',city:'生駒市',area:'',name:'社会福祉協議会地域包括支援センター',tel:'0743-73-7272',url:ikomaUrl},
  {id:2783,prefecture:'奈良県',city:'生駒市',area:'',name:'梅寿荘地域包括支援センター',tel:'0743-74-8134',url:ikomaUrl},
  {id:2784,prefecture:'奈良県',city:'生駒市',area:'',name:'メディカル南地域包括支援センター',tel:'0743-77-7766',url:ikomaUrl},
  {id:2785,prefecture:'奈良県',city:'大和郡山市',area:'',name:'大和郡山市地域包括支援センター',tel:'0743-55-7733',url:koriyamaUrl},
  {id:2786,prefecture:'奈良県',city:'大和郡山市',area:'片桐地区',name:'第二地域包括支援センター',tel:'0743-55-7011',url:koriyamaUrl},
  {id:2787,prefecture:'奈良県',city:'大和郡山市',area:'',name:'第三地域包括支援センター',tel:'0743-57-2233',url:koriyamaUrl},
  {id:2788,prefecture:'奈良県',city:'大和郡山市',area:'平和地区',name:'第四地域包括支援センター',tel:'0743-51-0700',url:koriyamaUrl},
  {id:2789,prefecture:'奈良県',city:'大和郡山市',area:'矢田地区',name:'第五地域包括支援センター',tel:'0743-52-3480',url:koriyamaUrl},
];
appendToFile(base + 'nara.json', naraEntries);

// citylinks.json を更新
const linksPath = base + 'citylinks.json';
const { hasBom: lBom, text: lText } = readJson(linksPath);
const linksObj = JSON.parse(lText);
linksObj['長浜市']     = nagahamaUrl;
linksObj['東近江市']   = higashiomiUrl;
linksObj['生駒市']     = ikomaUrl;
linksObj['大和郡山市'] = koriyamaUrl;
fs.writeFileSync(linksPath, (lBom ? '﻿' : '') + JSON.stringify(linksObj, null, 2), 'utf8');
console.log('Updated citylinks.json: +4 cities');
