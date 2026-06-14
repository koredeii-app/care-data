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

// 木更津市・成田市・我孫子市 → chiba.json
const chibaEntries = [
  {id:2716,prefecture:'千葉県',city:'木更津市',area:'新田・富士見・中央・新宿・吾妻・朝日ほか',name:'木更津市中部地域包括支援センター',tel:'0438-97-7818',url:'https://jishinkai.info/kisarazu-nanseien/houkatsu/'},
  {id:2717,prefecture:'千葉県',city:'木更津市',area:'請西・請西東・請西南・真舟・千束台',name:'木更津市東部地域包括支援センター',tel:'0438-97-6536',url:'https://mori.kisarazu-kamome.com/houkatu/'},
  {id:2718,prefecture:'千葉県',city:'木更津市',area:'岩根地区・金田地区',name:'木更津市西部地域包括支援センター',tel:'0438-22-3422',url:'https://www.nagasuka.com/pg2803234.html'},
  {id:2719,prefecture:'千葉県',city:'木更津市',area:'波岡地区・鎌足地区',name:'木更津市南部地域包括支援センター',tel:'0438-37-4811',url:'http://www.ikumikai.org/chiiki.html'},
  {id:2720,prefecture:'千葉県',city:'木更津市',area:'中郷地区・清川地区',name:'木更津市北部地域包括支援センター',tel:'0438-97-2561',url:'https://nakago.or.jp/service/welfare/houjin_03/'},
  {id:2721,prefecture:'千葉県',city:'木更津市',area:'富来田地区',name:'木更津市富来田地域包括支援センター',tel:'0438-53-8031',url:'https://www.dotline-jp.com/fukuta-hokatsu/'},
  {id:2722,prefecture:'千葉県',city:'成田市',area:'成田・中郷地域',name:'成田・中郷地域包括支援センター',tel:'0476-23-7151',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2723,prefecture:'千葉県',city:'成田市',area:'ニュータウン・はなのき台',name:'ニュータウン地域包括支援センター',tel:'0476-29-5005',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2724,prefecture:'千葉県',city:'成田市',area:'八生・豊住地域',name:'八生・豊住地域包括支援センター支所',tel:'0476-20-3655',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2725,prefecture:'千葉県',city:'成田市',area:'遠山地域',name:'遠山地域包括支援センター',tel:'0476-35-6081',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2726,prefecture:'千葉県',city:'成田市',area:'公津地域（はなのき台を除く）',name:'公津地域包括支援センター',tel:'0476-36-4981',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2727,prefecture:'千葉県',city:'成田市',area:'久住・下総地域',name:'久住・下総地域包括支援センター',tel:'0476-80-7007',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2728,prefecture:'千葉県',city:'成田市',area:'大栄地域',name:'大栄地域包括支援センター支所',tel:'0476-94-5664',url:'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html'},
  {id:2729,prefecture:'千葉県',city:'我孫子市',area:'布施・布施下・弁天下・久寺家・根戸・つくし野・台田・我孫子・並木（根戸・我孫子は鉄道路線以北）',name:'我孫子北地区高齢者なんでも相談室',tel:'04-7179-7360',url:'https://www.city.abiko.chiba.jp/kenko/koureishafukushi/eld_consul/nandemo_soudan.html'},
  {id:2730,prefecture:'千葉県',city:'我孫子市',area:'根戸・根戸新田・呼塚新田・船戸・我孫子・我孫子新田・白山・本町・緑・寿・栄・若松（根戸・我孫子は鉄道路線以南）',name:'我孫子南地区高齢者なんでも相談室',tel:'04-7199-8311',url:'https://www.city.abiko.chiba.jp/kenko/koureishafukushi/eld_consul/nandemo_soudan.html'},
  {id:2731,prefecture:'千葉県',city:'我孫子市',area:'泉・天王台・東我孫子・柴崎・柴崎台・北新田ほか',name:'天王台地区高齢者なんでも相談室',tel:'04-7182-4100',url:'https://www.city.abiko.chiba.jp/kenko/koureishafukushi/eld_consul/nandemo_soudan.html'},
  {id:2732,prefecture:'千葉県',city:'我孫子市',area:'湖北台・中峠台・中峠・中峠村下・中里ほか',name:'湖北・湖北台地区高齢者なんでも相談室',tel:'04-7187-6777',url:'https://www.city.abiko.chiba.jp/kenko/koureishafukushi/eld_consul/nandemo_soudan.html'},
  {id:2733,prefecture:'千葉県',city:'我孫子市',area:'新木・新木野・新木村下・中沼田・南新木ほか',name:'布佐・新木地区高齢者なんでも相談室',tel:'04-7189-0294',url:'https://www.city.abiko.chiba.jp/kenko/koureishafukushi/eld_consul/nandemo_soudan.html'},
];
appendToFile(base + 'chiba.json', chibaEntries);

// 入間市 → saitama.json
const saitamaEntries = [
  {id:2734,prefecture:'埼玉県',city:'入間市',area:'豊岡・東町・向陽台・大字黒須（東町5丁目2番の一部・6丁目2・3番除く）',name:'豊岡東地域包括支援センター',tel:'04-2960-1050',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
  {id:2735,prefecture:'埼玉県',city:'入間市',area:'扇町屋・扇台・久保稲荷・善蔵新田',name:'豊岡西地域包括支援センター',tel:'04-2960-5010',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
  {id:2736,prefecture:'埼玉県',city:'入間市',area:'黒須・河原町・春日町・宮前町・鍵山・高倉',name:'豊岡北地域包括支援センター',tel:'04-2901-2501',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
  {id:2737,prefecture:'埼玉県',city:'入間市',area:'牛沢町・小谷田・上小谷田・森坂・新久・狭山ケ原・狭山台4丁目',name:'東金子地区地域包括支援センター',tel:'04-2960-6322',url:'https://f-eijinkai.jp/higashikaneko/'},
  {id:2738,prefecture:'埼玉県',city:'入間市',area:'木蓮寺・南峯・寺竹・金子中央・西三ツ木・三ツ木台・上谷ケ貫・下谷ケ貫・花ノ木・中神・根岸・狭山台3丁目',name:'金子地区地域包括支援センター',tel:'04-2935-7543',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
  {id:2739,prefecture:'埼玉県',city:'入間市',area:'宮寺・二本木・高根・駒形富士山・大字狭山台・狭山台1丁目・2丁目',name:'宮寺・二本木地区地域包括支援センター',tel:'04-2935-0082',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
  {id:2740,prefecture:'埼玉県',city:'入間市',area:'上藤沢・下藤沢・東町5丁目2番の一部・6丁目2・3番',name:'藤沢地域包括支援センター',tel:'04-2960-6307',url:'https://www.eijinkai.jp/fujisawa/'},
  {id:2741,prefecture:'埼玉県',city:'入間市',area:'東藤沢',name:'東藤沢地域包括支援センター',tel:'04-2901-7025',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
  {id:2742,prefecture:'埼玉県',city:'入間市',area:'仏子・野田・新光',name:'西武地区地域包括支援センター',tel:'04-2931-3311',url:'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html'},
];
appendToFile(base + 'saitama.json', saitamaEntries);

// 海老名市 → kanagawa.json
const kanagawaEntries = [
  {id:2743,prefecture:'神奈川県',city:'海老名市',area:'上郷・扇町・上今泉・下今泉・泉・めぐみ町',name:'海老名北地域包括支援センター',tel:'046-231-6061',url:'https://ebinakita.com/region/'},
  {id:2744,prefecture:'神奈川県',city:'海老名市',area:'柏ケ谷・東柏ケ谷・望地',name:'海老名東地域包括支援センター',tel:'046-292-1411',url:'http://www.jinai.jp/staying_ebina/'},
  {id:2745,prefecture:'神奈川県',city:'海老名市',area:'勝瀬・中央・国分南・国分北',name:'海老名中央地域包括支援センター',tel:'046-234-2973',url:'http://www.jinai.jp/staying_ebina/'},
  {id:2746,prefecture:'神奈川県',city:'海老名市',area:'中新田・さつき町・河原口・社家',name:'さつき町地域包括支援センター',tel:'046-234-7226',url:'http://ebinaishikai.jp/houkatsusiencenter.html'},
  {id:2747,prefecture:'神奈川県',city:'海老名市',area:'大谷・国分寺台・浜田町・大谷南・大谷北',name:'国分寺台地域包括支援センター',tel:'046-233-8881',url:'https://www.tomoni.or.jp/facility/?area=kenoarea&subarea=ebina'},
  {id:2748,prefecture:'神奈川県',city:'海老名市',area:'中河内・中野・今里・上河内・本郷・門沢橋・杉久保南・杉久保北',name:'海老名南地域包括支援センター',tel:'046-238-7691',url:'https://ebinaminami.com/community-center/'},
];
appendToFile(base + 'kanagawa.json', kanagawaEntries);

// citylinks.json を更新
const linksPath = base + 'citylinks.json';
const { hasBom: lBom, text: lText } = readJson(linksPath);
const linksObj = JSON.parse(lText);
linksObj['木更津市'] = 'https://www.city.kisarazu.lg.jp/soshiki/fukushi/koreishafukushi/1/1372.html';
linksObj['成田市'] = 'https://www.city.narita.chiba.jp/kenko_fukushi/page124000.html';
linksObj['我孫子市'] = 'https://www.city.abiko.chiba.jp/kenko/koureishafukushi/eld_consul/nandemo_soudan.html';
linksObj['入間市'] = 'https://www.city.iruma.saitama.jp/soshiki/koreishashienka/kourei_fukushi_kaigo/koreisha_shisetsu/167.html';
linksObj['海老名市'] = 'https://www.city.ebina.kanagawa.jp/guide/shogaisha/koureisha/1003224.html';
const newLinks = (lBom ? '﻿' : '') + JSON.stringify(linksObj, null, 2);
fs.writeFileSync(linksPath, newLinks, 'utf8');
console.log('Updated citylinks.json: +5 cities');
