const fs = require('fs');

function readJson(path) {
  const raw = fs.readFileSync(path, 'utf8');
  const hasBom = raw.charCodeAt(0) === 0xFEFF;
  return { raw, hasBom, text: hasBom ? raw.slice(1) : raw };
}

function fmt(e) {
  return '    {\n' +
    '        "id":  ' + e.id + ',\n' +
    '        "prefecture":  "' + e.prefecture + '",\n' +
    '        "city":  "' + e.city + '",\n' +
    '        "area":  "' + e.area + '",\n' +
    '        "name":  "' + e.name + '",\n' +
    '        "tel":  "' + e.tel + '",\n' +
    '        "url":  "' + e.url + '"\n' +
    '    }';
}

function appendToFile(path, entries) {
  const { hasBom, text } = readJson(path);
  const lastBracket = text.lastIndexOf(']');
  const before = text.slice(0, lastBracket).trimEnd();
  const newText = before + ',\n' + entries.map(fmt).join(',\n') + '\n]';
  fs.writeFileSync(path, (hasBom ? '﻿' : '') + newText, 'utf8');
  console.log('Updated ' + path + ': +' + entries.length + ' entries');
}

const base = 'data/';
const hatchUrl = 'https://www.city.hatsukaichi.hiroshima.jp/soshiki/138/';
const iwakuUrl = 'https://www.city.iwakuni.lg.jp/soshiki/117/97092.html';
const hofuUrl  = 'https://www.city.hofu.yamaguchi.jp/soshiki/60/0805kekka.html';

// 廿日市市 → hiroshima.json
const hiroshimaEntries = [
  {id:2749,prefecture:'広島県',city:'廿日市市',area:'地御前・地御前北・阿品・阿品台・阿品台北・阿品台東・阿品台西・阿品台山の手',name:'地域包括支援センターはつかいち西部',tel:'0829-30-9066',url:'https://www.city.hatsukaichi.hiroshima.jp/soshiki/138/126342.html'},
  {id:2750,prefecture:'広島県',city:'廿日市市',area:'串戸・宮園・宮園上・四季が丘・四季が丘上・峰高・宮内・六本松・宮内工業団地',name:'地域包括支援センターはつかいち中部',tel:'0829-20-4580',url:'https://www.miyauchi.or.jp/im/hcb.html'},
  {id:2751,prefecture:'広島県',city:'廿日市市',area:'駅前・大東・可愛・佐方・桜尾・須賀・住吉・天神・廿日市・本町・木材港北・木材港南・山陽園・城内・平良・新宮・陽光台・原',name:'地域包括支援センターはつかいち東部',tel:'0829-30-9158',url:'https://carecenter.jp/pages/47/'},
  {id:2752,prefecture:'広島県',city:'廿日市市',area:'佐伯・吉和',name:'地域包括支援センターさいき',tel:'0829-72-2828',url:'https://www.city.hatsukaichi.hiroshima.jp/soshiki/138/126354.html'},
  {id:2753,prefecture:'広島県',city:'廿日市市',area:'大野・宮島',name:'地域包括支援センターおおの',tel:'0829-50-0251',url:'https://www.city.hatsukaichi.hiroshima.jp/soshiki/138/126351.html'},
];
appendToFile(base + 'hiroshima.json', hiroshimaEntries);

// 岩国市・防府市 → yamaguchi.json
const yamaguchiEntries = [
  {id:2754,prefecture:'山口県',city:'岩国市',area:'麻里布・東・装港・小瀬・柱島',name:'岩国市地域包括支援センター（第1班）',tel:'0827-24-3781',url:iwakuUrl},
  {id:2755,prefecture:'山口県',city:'岩国市',area:'川下・愛宕',name:'岩国第一地域包括支援センター',tel:'0827-34-1577',url:iwakuUrl},
  {id:2756,prefecture:'山口県',city:'岩国市',area:'岩国・平田・藤河・御庄・師木野・北河内・南河内',name:'岩国市地域包括支援センター（第2班）',tel:'0827-24-3700',url:iwakuUrl},
  {id:2757,prefecture:'山口県',city:'岩国市',area:'灘・通津',name:'岩国第三地域包括支援センター',tel:'0827-34-1313',url:iwakuUrl},
  {id:2758,prefecture:'山口県',city:'岩国市',area:'由宇',name:'岩国市地域包括支援センター（第3班）',tel:'0827-63-3113',url:iwakuUrl},
  {id:2759,prefecture:'山口県',city:'岩国市',area:'周東',name:'岩国市地域包括支援センター（第4班周東）',tel:'0827-84-3615',url:iwakuUrl},
  {id:2760,prefecture:'山口県',city:'岩国市',area:'玖珂',name:'岩国市地域包括支援センター（第4班玖珂）',tel:'0827-82-0368',url:iwakuUrl},
  {id:2761,prefecture:'山口県',city:'岩国市',area:'錦・美川・美和・本郷',name:'岩国第五地域包括支援センター',tel:'0827-71-0055',url:iwakuUrl},
  {id:2762,prefecture:'山口県',city:'防府市',area:'牟礼・松崎・富海',name:'防府東地域包括支援センター',tel:'0835-27-0150',url:hofuUrl},
  {id:2763,prefecture:'山口県',city:'防府市',area:'中関・華城・西浦・大道',name:'防府西地域包括支援センター',tel:'0835-32-3310',url:hofuUrl},
  {id:2764,prefecture:'山口県',city:'防府市',area:'勝間・華浦・新田・向島',name:'防府南地域包括支援センター',tel:'0835-28-7002',url:hofuUrl},
  {id:2765,prefecture:'山口県',city:'防府市',area:'佐波・右田・玉祖・小野',name:'防府北地域包括支援センター',tel:'0835-28-7215',url:hofuUrl},
  {id:2766,prefecture:'山口県',city:'防府市',area:'野島',name:'防府市地域包括支援センター（本センター）',tel:'0835-25-2964',url:hofuUrl},
];
appendToFile(base + 'yamaguchi.json', yamaguchiEntries);

// 津山市 → okayama.json
const okayamaEntries = [
  {id:2767,prefecture:'岡山県',city:'津山市',area:'市内全域',name:'津山市地域包括支援センター',tel:'0868-23-1004',url:'https://www.tsuyamasyakyo.or.jp/office_list/houkatsu/'},
];
appendToFile(base + 'okayama.json', okayamaEntries);

// citylinks.json を更新
const linksPath = base + 'citylinks.json';
const { hasBom: lBom, text: lText } = readJson(linksPath);
const linksObj = JSON.parse(lText);
linksObj['廿日市市'] = hatchUrl;
linksObj['岩国市']  = iwakuUrl;
linksObj['防府市']  = hofuUrl;
linksObj['津山市']  = 'https://www.city.tsuyama.lg.jp/life/index2.php?id=551';
const newLinks = (lBom ? '﻿' : '') + JSON.stringify(linksObj, null, 2);
fs.writeFileSync(linksPath, newLinks, 'utf8');
console.log('Updated citylinks.json: +4 cities');
