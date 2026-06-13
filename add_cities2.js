const fs = require('fs');

function compact(e) {
  return `    {"id":${e.id},"prefecture":"${e.prefecture}","city":"${e.city}","area":"${e.area}","name":"${e.name}","tel":"${e.tel}","url":"${e.url}"}`;
}

function multiDouble(e) {
  return `    {\n        "id":  ${e.id},\n        "prefecture":  "${e.prefecture}",\n        "city":  "${e.city}",\n        "area":  "${e.area}",\n        "name":  "${e.name}",\n        "tel":  "${e.tel}",\n        "url":  "${e.url}"\n    }`;
}

function appendEntries(filepath, entries, fmt) {
  let raw = fs.readFileSync(filepath, 'utf-8');
  const hasBom = raw.charCodeAt(0) === 0xFEFF;
  let text = hasBom ? raw.slice(1) : raw;
  const lastBracket = text.lastIndexOf(']');
  let before = text.slice(0, lastBracket).trimEnd();
  const fn = fmt === 'multiDouble' ? multiDouble : compact;
  const newEntries = entries.map(fn).join(',\n');
  text = before + ',\n' + newEntries + '\n]';
  if (hasBom) text = '﻿' + text;
  fs.writeFileSync(filepath, text, 'utf-8');
  console.log(`Updated ${filepath}: +${entries.length} entries (IDs ${entries[0].id}-${entries[entries.length-1].id})`);
}

const base = 'c:/Users/User/Documents/github/care-data/data/';
const ashikagaUrl = 'https://www.city.ashikaga.tochigi.jp/health/000053/000280/p001989.html';
const hikoneUrl = 'https://www.city.hikone.lg.jp/kakuka/fukushi_hoken/7/2_1/2187.html';
const kashiharaUrl = 'https://www.city.kashihara.nara.jp/soshiki/1033/gyomu/3/7/2608.html';
const okinawaUrl = 'https://www.city.okinawa.okinawa.jp/k020-005/contents/p00020.html';
const beppuUrl = 'https://www.city.beppu.oita.jp/seikatu/fukusi/koureisyafukusi/detail1.html';
const osakaUrl = 'https://www.city.osaki.miyagi.jp/shisei/lifescenebetsudesagasu/koreisha_kaigo/tiikihoukatu/16424.html';
const kuwanaUrl = 'https://www.city.kuwana.lg.jp/kaigoyobou/esjp/welfaresystem/consulutioncenter.html';
const sakataBase = 'https://www.city.sakata.lg.jp/kenko/kaigohoken/chiikihoukatsu/hokatsu-';

// tochigi.json - 栃木市7件 + 足利市7件 (compact)
appendEntries(base + 'tochigi.json', [
  {id:2648,prefecture:"栃木県",city:"栃木市",area:"倭町・旭町・室町・城内町・神田町・本町・沼和田町・河合町・境町・片柳町・湊町・富士見町・平井町・薗部町・入舟町・祝町・柳橋町・錦町・万町・日ノ出町・箱森町・小平町・嘉右衛門町・泉町・大町・昭和町・平柳町1丁目",name:"栃木中央地域包括支援センター",tel:"0282-21-2245",url:"https://www.city.tochigi.lg.jp/soshiki/103/1940.html"},
  {id:2649,prefecture:"栃木県",city:"栃木市",area:"吹上町・細掘町・木野地町・川原田町・野中町・宮町・千塚町・大森町・仲方町・梓町・皆川城内町・柏倉町・小野口町・志鳥町・岩出町・大皆川町・泉川町・新井町・尻内町・梅沢町・大久保町・鍋山町・星野町・出流町",name:"吹上地域包括支援センター",tel:"0282-31-1002",url:"https://www.city.tochigi.lg.jp/soshiki/103/1140.html"},
  {id:2650,prefecture:"栃木県",city:"栃木市",area:"惣社町・柳原町・大光寺町・田村町・寄居町・国府町・大塚町・大宮町・今泉町・仲仕上町・藤田町・久保田町・宮田町・高谷町・樋ノ口町",name:"国府地域包括支援センター",tel:"0282-27-3855",url:"https://www.city.tochigi.lg.jp/soshiki/103/849.html"},
  {id:2651,prefecture:"栃木県",city:"栃木市",area:"大平北地区・大平南地区",name:"大平地域包括支援センター",tel:"0282-43-9226",url:"https://www.city.tochigi.lg.jp/soshiki/103/1284.html"},
  {id:2652,prefecture:"栃木県",city:"栃木市",area:"新波・石川・帯刀・緑川・西前原・蛭沼・富吉・中根・藤岡・下宮・内野・赤麻・大前・甲・都賀・大田和・太田",name:"藤岡地域包括支援センター",tel:"0282-62-0911",url:"https://www.city.tochigi.lg.jp/soshiki/103/1442.html"},
  {id:2653,prefecture:"栃木県",city:"栃木市",area:"合戦場・平川・升塚・家中・原宿・木・臼久保・大橋・富張・深沢・大柿",name:"都賀地域包括支援センター",tel:"0282-29-1104",url:"https://www.city.tochigi.lg.jp/soshiki/103/1389.html"},
  {id:2654,prefecture:"栃木県",city:"栃木市",area:"鷲巣・静・下津原・畳岡・五十畑・和泉・静和・静戸・曲ヶ島・古江・新里・三谷・下岡・上岡・小野寺",name:"岩舟地域包括支援センター",tel:"0282-55-7782",url:"https://www.city.tochigi.lg.jp/soshiki/103/513.html"},
  // 足利市 2655-2661
  {id:2655,prefecture:"栃木県",city:"足利市",area:"東校・西校・柳原・大橋・相生",name:"中央地域包括支援センター",tel:"0284-22-0544",url:ashikagaUrl},
  {id:2656,prefecture:"栃木県",city:"足利市",area:"助戸・千歳・北郷・名草",name:"きた・なか地域包括支援センター",tel:"0284-41-1281",url:ashikagaUrl},
  {id:2657,prefecture:"栃木県",city:"足利市",area:"毛野・富田",name:"毛野・富田地域包括支援センター",tel:"0284-90-2117",url:ashikagaUrl},
  {id:2658,prefecture:"栃木県",city:"足利市",area:"山辺・矢場川",name:"山辺・矢場川地域包括支援センター",tel:"0284-71-8484",url:ashikagaUrl},
  {id:2659,prefecture:"栃木県",city:"足利市",area:"御厨・梁田・筑波・久野",name:"協和・愛宕台地域包括支援センター",tel:"0284-73-2413",url:ashikagaUrl},
  {id:2660,prefecture:"栃木県",city:"足利市",area:"葉鹿・三和・小俣",name:"さかにし地域包括支援センター",tel:"0284-65-4080",url:ashikagaUrl},
  {id:2661,prefecture:"栃木県",city:"足利市",area:"三重・山前",name:"三重・山前地域包括支援センター",tel:"0284-22-7655",url:ashikagaUrl},
], 'compact');

// yamagata.json - 鶴岡市11件 + 酒田市10件 (multiDouble)
appendEntries(base + 'yamagata.json', [
  {id:2662,prefecture:"山形県",city:"鶴岡市",area:"第一学区・第四学区",name:"健楽園地域包括支援センター",tel:"0235-25-0888",url:"https://www.ikkoukai.or.jp/chiiki-houkatsu/"},
  {id:2663,prefecture:"山形県",city:"鶴岡市",area:"第二学区・斎・黄金",name:"なえづ地域包括支援センター",tel:"0235-26-9260",url:"https://www.shk01.jp/jigyo/jigyo4-4/"},
  {id:2664,prefecture:"山形県",city:"鶴岡市",area:"第三学区・湯田川・田川",name:"つくし地域包括支援センター",tel:"0235-29-1256",url:"http://tsuruoka-med.jp/kanren/tsukushi/"},
  {id:2665,prefecture:"山形県",city:"鶴岡市",area:"第五学区・京・田・栄",name:"永寿荘地域包括支援センター",tel:"0235-29-2900",url:"http://www.keisen-swc.jp/takarada/regional/index.html"},
  {id:2666,prefecture:"山形県",city:"鶴岡市",area:"第六学区・大泉・上郷・三瀬・由良・小堅",name:"かたりあい地域包括支援センター",tel:"0235-29-1626",url:"https://www.shk01.jp/jigyo/jigyo4-4/"},
  {id:2667,prefecture:"山形県",city:"鶴岡市",area:"大山・加茂・湯野浜・西郷",name:"鶴岡西地域包括支援センター",tel:"0235-35-0300",url:"https://www.sionkai.or.jp/service/village/index.html?id=facility03"},
  {id:2668,prefecture:"山形県",city:"鶴岡市",area:"藤島",name:"ふじしま地域包括支援センター",tel:"0235-78-2370",url:"https://www.fujino-sato.or.jp/hokatsu/"},
  {id:2669,prefecture:"山形県",city:"鶴岡市",area:"羽黒",name:"はぐろ地域包括支援センター",tel:"0235-64-8281",url:"https://www.kamiji.or.jp/support"},
  {id:2670,prefecture:"山形県",city:"鶴岡市",area:"櫛引",name:"くしびき地域包括支援センター",tel:"0235-57-5003",url:"https://www.shk01.jp/jigyo/jigyo4-4/"},
  {id:2671,prefecture:"山形県",city:"鶴岡市",area:"朝日",name:"あさひ地域包括支援センター",tel:"0235-58-1068",url:"https://www.bunanoki.or.jp/service/hokatsu"},
  {id:2672,prefecture:"山形県",city:"鶴岡市",area:"温海",name:"あつみ地域包括支援センター",tel:"0235-43-3010",url:"https://atumihukushikai.jp/houkatsu"},
  // 酒田市 2673-2682
  {id:2673,prefecture:"山形県",city:"酒田市",area:"琢成・松陵・西荒瀬",name:"地域包括支援センターなかまち",tel:"0234-23-5591",url:sakataBase+"nakamachi.html"},
  {id:2674,prefecture:"山形県",city:"酒田市",area:"若浜・浜田・飛島",name:"地域包括支援センターにいだ",tel:"0234-22-2640",url:sakataBase+"niida.html"},
  {id:2675,prefecture:"山形県",city:"酒田市",area:"亀ヶ崎・松原",name:"地域包括支援センターはくちょう",tel:"0234-21-0818",url:sakataBase+"hakucyou.html"},
  {id:2676,prefecture:"山形県",city:"酒田市",area:"富士見・泉",name:"地域包括支援センターあけぼの",tel:"0234-26-7789",url:sakataBase+"akebono.html"},
  {id:2677,prefecture:"山形県",city:"酒田市",area:"黒森・浜中・広野・新堀・十坂・宮野浦",name:"地域包括支援センターかわみなみ",tel:"0234-92-3451",url:sakataBase+"kawaminami.html"},
  {id:2678,prefecture:"山形県",city:"酒田市",area:"鳥海",name:"地域包括支援センターほくぶ",tel:"0234-28-2002",url:sakataBase+"hokubu.html"},
  {id:2679,prefecture:"山形県",city:"酒田市",area:"平田",name:"地域包括支援センターひがし",tel:"0234-94-2470",url:sakataBase+"higashi.html"},
  {id:2680,prefecture:"山形県",city:"酒田市",area:"一條・八幡",name:"地域包括支援センターやわた",tel:"0234-64-3777",url:sakataBase+"yawata.html"},
  {id:2681,prefecture:"山形県",city:"酒田市",area:"松山",name:"地域包括支援センターまつやま",tel:"0234-61-4033",url:sakataBase+"mastuyama.html"},
  {id:2682,prefecture:"山形県",city:"酒田市",area:"南平田",name:"地域包括支援センターひらた",tel:"0234-52-3895",url:sakataBase+"hirata.html"},
], 'multiDouble');

// miyagi.json - 大崎市4件 (multiDouble)
appendEntries(base + 'miyagi.json', [
  {id:2683,prefecture:"宮城県",city:"大崎市",area:"古川・荒雄・志田・西古川・東大崎・敷玉・高倉",name:"古川地域包括支援センター",tel:"0229-87-3113",url:osakaUrl},
  {id:2684,prefecture:"宮城県",city:"大崎市",area:"三本木・松山・鹿島台",name:"志田地域包括支援センター",tel:"0229-53-1271",url:osakaUrl},
  {id:2685,prefecture:"宮城県",city:"大崎市",area:"岩出山・鳴子温泉",name:"玉造地域包括支援センター",tel:"0229-72-4888",url:osakaUrl},
  {id:2686,prefecture:"宮城県",city:"大崎市",area:"宮沢・富永・長岡・清滝・田尻",name:"田尻地域包括支援センター",tel:"0229-39-3601",url:osakaUrl},
], 'multiDouble');

// mie.json - 桑名市6件 (compact)
appendEntries(base + 'mie.json', [
  {id:2687,prefecture:"三重県",city:"桑名市",area:"精義・立教・城東・修徳・大成",name:"東部地域包括支援センター",tel:"0594-24-8080",url:"https://www.city.kuwana.lg.jp/shisetsu/houkatsushien/001.html"},
  {id:2688,prefecture:"三重県",city:"桑名市",area:"桑部・在良・七和・久米",name:"西部地域包括支援センター",tel:"0594-25-8660",url:"https://www.city.kuwana.lg.jp/shisetsu/houkatsushien/002.html"},
  {id:2689,prefecture:"三重県",city:"桑名市",area:"日進・益世・城南",name:"南部地域包括支援センター",tel:"0594-25-1011",url:"https://www.city.kuwana.lg.jp/shisetsu/houkatsushien/003.html"},
  {id:2690,prefecture:"三重県",city:"桑名市",area:"筒尾・大山田・野田・松ノ木・藤が丘・新西方・星見ヶ丘・陽だまりの丘・多度",name:"北部西地域包括支援センター（多度）",tel:"0594-49-2031",url:"https://www.city.kuwana.lg.jp/shisetsu/houkatsushien/004.html"},
  {id:2691,prefecture:"三重県",city:"桑名市",area:"",name:"北部西地域包括支援センター（大山田）",tel:"0594-41-2114",url:"https://www.city.kuwana.lg.jp/shisetsu/houkatsushien/006.html"},
  {id:2692,prefecture:"三重県",city:"桑名市",area:"深谷・大和・長島",name:"北部東地域包括支援センター",tel:"0594-42-2119",url:"https://www.city.kuwana.lg.jp/shisetsu/houkatsushien/005.html"},
], 'compact');

// shiga.json - 彦根市7件 (compact)
appendEntries(base + 'shiga.json', [
  {id:2693,prefecture:"滋賀県",city:"彦根市",area:"鳥居本",name:"地域包括支援センターすばる",tel:"0749-21-5412",url:hikoneUrl},
  {id:2694,prefecture:"滋賀県",city:"彦根市",area:"城東・佐和山",name:"地域包括支援センターすばる",tel:"0749-24-0494",url:hikoneUrl},
  {id:2695,prefecture:"滋賀県",city:"彦根市",area:"城西・城北",name:"地域包括支援センターハピネス",tel:"0749-27-6702",url:hikoneUrl},
  {id:2696,prefecture:"滋賀県",city:"彦根市",area:"平田・金城",name:"地域包括支援センターふるさと",tel:"0749-47-3993",url:hikoneUrl},
  {id:2697,prefecture:"滋賀県",city:"彦根市",area:"城南・高宮・旭森",name:"地域包括支援センターゆうじん",tel:"0749-21-3341",url:hikoneUrl},
  {id:2698,prefecture:"滋賀県",city:"彦根市",area:"城陽・若葉・河瀬・亀山",name:"地域包括支援センターきらら",tel:"0749-28-9323",url:hikoneUrl},
  {id:2699,prefecture:"滋賀県",city:"彦根市",area:"稲枝東・稲枝北・稲枝西",name:"地域包括支援センターいなえ",tel:"0749-47-3320",url:hikoneUrl},
], 'compact');

// nara.json - 橿原市2件 (compact)
appendEntries(base + 'nara.json', [
  {id:2700,prefecture:"奈良県",city:"橿原市",area:"",name:"地域包括支援センター（北エリア）",tel:"0744-20-3366",url:kashiharaUrl},
  {id:2701,prefecture:"奈良県",city:"橿原市",area:"",name:"地域包括支援センター（南エリア）",tel:"0744-24-4301",url:kashiharaUrl},
], 'compact');

// okinawa.json - 沖縄市7件 (multiDouble)
appendEntries(base + 'okinawa.json', [
  {id:2702,prefecture:"沖縄県",city:"沖縄市",area:"池原・登川・知花・明道・松本",name:"北部地域包括支援センター",tel:"098-938-9770",url:okinawaUrl},
  {id:2703,prefecture:"沖縄県",city:"沖縄市",area:"美里・東・宮里・吉原・城前・越来",name:"中部北地域包括支援センター",tel:"098-987-8025",url:okinawaUrl},
  {id:2704,prefecture:"沖縄県",city:"沖縄市",area:"嘉間良・住吉・室川・安慶田・照屋",name:"中部南地域包括支援センター",tel:"098-923-0603",url:okinawaUrl},
  {id:2705,prefecture:"沖縄県",city:"沖縄市",area:"八重島・センター・中の町・胡屋・園田",name:"西部北地域包括支援センター",tel:"098-988-5525",url:okinawaUrl},
  {id:2706,prefecture:"沖縄県",city:"沖縄市",area:"諸見里・久保田・山内・山里・南桃原",name:"西部南地域包括支援センター",tel:"098-982-2020",url:okinawaUrl},
  {id:2707,prefecture:"沖縄県",city:"沖縄市",area:"古謝・東桃原・大里・海邦町・泡瀬第一〜三",name:"東部北地域包括支援センター",tel:"098-937-1100",url:okinawaUrl},
  {id:2708,prefecture:"沖縄県",city:"沖縄市",area:"高原・泡瀬・比屋根・与儀",name:"東部南地域包括支援センター",tel:"098-923-0553",url:okinawaUrl},
], 'multiDouble');

// oita.json - 別府市7件 (multiDouble)
appendEntries(base + 'oita.json', [
  {id:2709,prefecture:"大分県",city:"別府市",area:"青山・東山",name:"青山・東山地域包括支援センター",tel:"0977-73-8989",url:beppuUrl},
  {id:2710,prefecture:"大分県",city:"別府市",area:"中部",name:"中部地域包括支援センター",tel:"0977-76-5866",url:beppuUrl},
  {id:2711,prefecture:"大分県",city:"別府市",area:"鶴見台",name:"鶴見台地域包括支援センター",tel:"0977-25-7722",url:beppuUrl},
  {id:2712,prefecture:"大分県",city:"別府市",area:"朝日",name:"朝日地域包括支援センター",tel:"0977-85-8088",url:beppuUrl},
  {id:2713,prefecture:"大分県",city:"別府市",area:"山の手",name:"山の手地域包括支援センター",tel:"0977-23-5582",url:beppuUrl},
  {id:2714,prefecture:"大分県",city:"別府市",area:"北部",name:"北部地域包括支援センター",tel:"0977-66-8844",url:beppuUrl},
  {id:2715,prefecture:"大分県",city:"別府市",area:"浜脇",name:"浜脇地域包括支援センター",tel:"0977-25-6811",url:beppuUrl},
], 'multiDouble');

// citylinks.json - 10都市追加
const citylinksPath = base + 'citylinks.json';
let citylinks = JSON.parse(fs.readFileSync(citylinksPath, 'utf-8'));
Object.assign(citylinks, {
  "栃木市": "https://www.city.tochigi.lg.jp/soshiki/103/1541.html",
  "足利市": "https://www.city.ashikaga.tochigi.jp/health/000053/000280/p001989.html",
  "鶴岡市": "https://www.city.tsuruoka.lg.jp/kenko/kaigo/houkatusennta-.html",
  "酒田市": "https://www.city.sakata.lg.jp/kenko/kaigohoken/chiikihoukatsu/index.html",
  "大崎市": osakaUrl,
  "桑名市": kuwanaUrl,
  "彦根市": hikoneUrl,
  "橿原市": kashiharaUrl,
  "沖縄市": okinawaUrl,
  "別府市": beppuUrl,
});
fs.writeFileSync(citylinksPath, JSON.stringify(citylinks, null, 2) + '\n', 'utf-8');
console.log('Updated citylinks.json: +10 cities');
