#!/usr/bin/env node
'use strict';

/*
  Live Poker Handlog v2.6 RC8 — vaste pokerlogica-regressiesuite

  Gebruik:
    node REGRESSIETEST_Pokerlogica_Live_Poker_Handlog_v2.6_RC8.js <pad-naar-html>

  Doel:
  - leest de echte HTML-build;
  - extraheert de relevante productiefuncties;
  - voert vaste regressiefixtures uit;
  - exitcode 0 = alles groen, 1 = minimaal één failure.

  Deze suite verandert de app niet.
*/

const fs = require('fs');

const htmlPath = process.argv[2];
if (!htmlPath) {
  console.error('Gebruik: node REGRESSIETEST_Pokerlogica_Live_Poker_Handlog_v2.6_RC8.js <html>');
  process.exit(2);
}
const html = fs.readFileSync(htmlPath, 'utf8');

function extractFunction(name) {
  const needle = `function ${name}(`;
  const start = html.indexOf(needle);
  if (start < 0) throw new Error(`Functie ${name} niet gevonden`);
  const brace = html.indexOf('{', start);
  let depth = 0, quote = null, esc = false, tmpl = false;
  for (let i = brace; i < html.length; i++) {
    const ch = html[i], prev = html[i-1];
    if (quote) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (tmpl) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === '`') { tmpl = false; continue; }
      // braces inside template interpolation can occur; current production functions
      // extracted below do not rely on nested template expressions for structure.
      continue;
    }
    if (ch === "'" || ch === '"') { quote = ch; continue; }
    if (ch === '`') { tmpl = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error(`Functie ${name} niet volledig gevonden`);
}

function extractLastFunction(name) {
  const needle = `function ${name}(`;
  const start = html.lastIndexOf(needle);
  if (start < 0) throw new Error(`Functie ${name} niet gevonden`);
  const brace = html.indexOf('{', start);
  let depth = 0, quote = null, esc = false, tmpl = false;
  for (let i = brace; i < html.length; i++) {
    const ch = html[i];
    if (quote) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (tmpl) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === '`') tmpl = false;
      continue;
    }
    if (ch === "'" || ch === '"') { quote = ch; continue; }
    if (ch === '`') { tmpl = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error(`Functie ${name} niet volledig gevonden`);
}

// ===== Productiecode extraheren =====
const STREETS = [['pf','PF'],['flop','Flop'],['turn','Turn'],['river','River']];

// parsePlainNumber, parseChipValue en num komen meerdere keren voor.
// Voor num gebruiken we de laatste definitie, omdat die runtime leidend is.
const parsePlainNumber = Function('return (' + extractFunction('parsePlainNumber') + ')')();
const parseChipValue = Function('parsePlainNumber','return (' + extractLastFunction('parseChipValue') + ')')(parsePlainNumber);
const num = Function('parseChipValue','return (' + extractLastFunction('num') + ')')(parseChipValue);
const positions = Function('return (' + extractLastFunction('positions') + ')')();
const straddlePositions = Function('positions','return (' + extractLastFunction('straddlePositions') + ')')(positions);
const regularStraddleRows = Function('num','straddlePositions','return (' + extractLastFunction('regularStraddleRows') + ')')(num,straddlePositions);
const handStraddles = Function('num','regularStraddleRows','return (' + extractLastFunction('handStraddles') + ')')(num,regularStraddleRows);
const toBase = Function('num','return (' + extractLastFunction('toBase') + ')')(num);
const actorStackBase = Function('num','return (' + extractLastFunction('actorStackBase') + ')')(num);
const analyze = Function('num','actorStackBase','handStraddles','toBase','STREETS','return (' + extractLastFunction('analyze') + ')')(num,actorStackBase,handStraddles,toBase,STREETS);
const rc8Build12ParseTournamentChip = Function('return (' + extractLastFunction('rc8Build12ParseTournamentChip') + ')')();
const rc8Build12FormatTournamentChip = Function('rc8Build12ParseTournamentChip','return (' + extractLastFunction('rc8Build12FormatTournamentChip') + ')')(rc8Build12ParseTournamentChip);

// ===== Test helpers =====
const tests = [];
function test(name, fn) {
  try {
    const detail = fn();
    tests.push({name, pass:true, detail:detail || 'PASS'});
  } catch (e) {
    tests.push({name, pass:false, detail:e && e.message ? e.message : String(e)});
  }
}
function eq(actual, expected, label='waarde', eps=1e-9) {
  if (typeof actual === 'number' && typeof expected === 'number') {
    if (Math.abs(actual-expected) > eps) throw new Error(`${label}: verwacht ${expected}, kreeg ${actual}`);
  } else if (actual !== expected) throw new Error(`${label}: verwacht ${expected}, kreeg ${actual}`);
}
function cashHand(sb,bb,actions,extra={}) {
  return {
    players:6, sb:String(sb), bb:String(bb), ante:'', sbNA:false,
    heroPos:'BTN', heroStackChips:'10000', heroStackBB:'',
    villains:[
      {pos:'SB',stackChips:'10000',stackBB:''},
      {pos:'BB',stackChips:'10000',stackBB:''},
      {pos:'LJ',stackChips:'10000',stackBB:''},
      {pos:'HJ',stackChips:'10000',stackBB:''},
      {pos:'CO',stackChips:'10000',stackBB:''}
    ],
    straddleType:'', straddleCount:1, straddleAmounts:[],
    streets:{pf:actions,flop:[],turn:[],river:[]},
    ...extra
  };
}
function tournamentHand(sb,bb,ante,actions,extra={}) {
  return {
    players:6, sb:String(sb), bb:String(bb), ante:String(ante), sbNA:false,
    heroPos:'BTN', heroStackChips:'1000000', heroStackBB:'',
    villains:[
      {pos:'SB',stackChips:'1000000',stackBB:''},
      {pos:'BB',stackChips:'1000000',stackBB:''},
      {pos:'LJ',stackChips:'1000000',stackBB:''},
      {pos:'HJ',stackChips:'1000000',stackBB:''},
      {pos:'CO',stackChips:'1000000',stackBB:''}
    ],
    streets:{pf:actions,flop:[],turn:[],river:[]},
    ...extra
  };
}
const cash = {type:'cash', currency:'EUR', firstStraddleOpen:false, reStraddleOpen:false, btnStraddleOpen:false, btnStraddleFixed:''};
const mtt = {type:'mtt', subtype:'regular'};

// ===== A. Bekende potfixtures =====
test('A1 €1/€1 raise 6 → 3bet 20 → fold = 13', ()=>{
  const h=cashHand(1,1,[
    {pos:'BTN',act:'raise',amt:'6',unit:'cash'},
    {pos:'BB',act:'raise',amt:'20',unit:'cash'},
    {pos:'BTN',act:'fold',amt:'',unit:'cash'}
  ]);
  const got=analyze(cash,h).finalPot; eq(got,13,'pot'); return `pot ${got}`;
});
test('A2 €1/€1 raise 6 → call → 3bet 20 → folds = 19', ()=>{
  const h=cashHand(1,1,[
    {pos:'BTN',act:'raise',amt:'6',unit:'cash'},
    {pos:'CO',act:'call',amt:'',unit:'cash'},
    {pos:'BB',act:'raise',amt:'20',unit:'cash'},
    {pos:'BTN',act:'fold',amt:'',unit:'cash'},
    {pos:'CO',act:'fold',amt:'',unit:'cash'}
  ]);
  const got=analyze(cash,h).finalPot; eq(got,19,'pot'); return `pot ${got}`;
});
test('A3 €1/€1 raise 6 → call → 3bet 20 → call/fold = 47', ()=>{
  const h=cashHand(1,1,[
    {pos:'BTN',act:'raise',amt:'6',unit:'cash'},
    {pos:'CO',act:'call',amt:'',unit:'cash'},
    {pos:'BB',act:'raise',amt:'20',unit:'cash'},
    {pos:'BTN',act:'call',amt:'',unit:'cash'},
    {pos:'CO',act:'fold',amt:'',unit:'cash'}
  ]);
  const got=analyze(cash,h).finalPot; eq(got,47,'pot'); return `pot ${got}`;
});

// ===== B. Build-14 BB-unitfix =====
test('B1 €1/€2: raise 3BB → BB call → SB fold = 13', ()=>{
  const h=cashHand(1,2,[
    {pos:'BTN',act:'raise',amt:'3',unit:'bb'},
    {pos:'SB',act:'fold',amt:'',unit:'cash'},
    {pos:'BB',act:'call',amt:'',unit:'cash'}
  ]);
  const got=analyze(cash,h).finalPot; eq(got,13,'pot'); return `pot ${got}`;
});
test('B2 €2/€5: raise 3BB → BB call → SB fold = 32', ()=>{
  const h=cashHand(2,5,[
    {pos:'BTN',act:'raise',amt:'3',unit:'bb'},
    {pos:'SB',act:'fold',amt:'',unit:'cash'},
    {pos:'BB',act:'call',amt:'',unit:'cash'}
  ]);
  const got=analyze(cash,h).finalPot; eq(got,32,'pot'); return `pot ${got}`;
});
test('B3 postflop €1/€2: 2BB bet + call = 11', ()=>{
  const h=cashHand(1,2,[],{
    streets:{pf:[],flop:[
      {pos:'BTN',act:'bet',amt:'2',unit:'bb'},
      {pos:'BB',act:'call',amt:'',unit:'cash'}
    ],turn:[],river:[]}
  });
  const got=analyze(cash,h).finalPot; eq(got,11,'pot'); return `pot ${got}`;
});

// ===== C. Forced contributions / uncalled / stacks =====
test('C1 blind call wordt niet dubbel geteld', ()=>{
  const h=cashHand(1,2,[
    {pos:'BTN',act:'raise',amt:'6',unit:'cash'},
    {pos:'SB',act:'fold',amt:'',unit:'cash'},
    {pos:'BB',act:'call',amt:'',unit:'cash'}
  ]);
  const got=analyze(cash,h).finalPot; eq(got,13,'pot'); return `pot ${got}`;
});
test('C2 short-stack call wordt begrensd', ()=>{
  const h=cashHand(1,2,[
    {pos:'BTN',act:'raise',amt:'20',unit:'cash'},
    {pos:'SB',act:'fold',amt:'',unit:'cash'},
    {pos:'BB',act:'call',amt:'',unit:'cash'}
  ]);
  h.villains.find(v=>v.pos==='BB').stackChips='10';
  const got=analyze(cash,h).finalPot; eq(got,21,'pot'); return `pot ${got}`;
});
test('C3 uncalled bet wordt teruggegeven', ()=>{
  const h=cashHand(1,2,[],{
    streets:{pf:[],flop:[
      {pos:'BTN',act:'bet',amt:'6',unit:'cash'},
      {pos:'BB',act:'fold',amt:'',unit:'cash'}
    ],turn:[],river:[]}
  });
  const got=analyze(cash,h).finalPot; eq(got,3,'pot'); return `pot ${got}`;
});

// ===== D. Straddles =====
test('D1 cash regular straddle blijft forced contribution', ()=>{
  const s={...cash, firstStraddleOpen:false, reStraddleOpen:false};
  const h=cashHand(1,2,[
    {pos:'BTN',act:'fold',amt:'',unit:'cash'}
  ], {players:6, straddleType:'regular', straddleCount:1, straddleAmounts:[]});
  // Bij vaste reguliere straddle: 2x BB = 4. Forced pot = SB1 + BB2 + straddle4 = 7.
  const got=analyze(s,h).finalPot; eq(got,7,'pot'); return `pot ${got}`;
});

// ===== E. Toernooi/BBA/chips =====
test('E1 BBA wordt éénmaal als BB-forced contribution geteld', ()=>{
  const h=tournamentHand(100,200,200,[]);
  const got=analyze(mtt,h).finalPot;
  // intern in BB: SB .5 + BB 1 + BBA 1 = 2.5 BB
  eq(got,2.5,'pot in BB'); return `pot ${got} BB`;
});
test('E2 toernooi chips-input converteert via actuele BB', ()=>{
  const h=tournamentHand(100,200,200,[
    {pos:'BTN',act:'raise',amt:'600',unit:'chips'},
    {pos:'SB',act:'fold',amt:'',unit:'bb'},
    {pos:'BB',act:'call',amt:'',unit:'bb'}
  ]);
  const got=analyze(mtt,h).finalPot;
  // SB .5 + BTN 3 + BB totaal 3 + BBA 1 = 7.5 BB
  eq(got,7.5,'pot in BB'); return `pot ${got} BB`;
});

// ===== F. K/M/B parser/formatter =====
for (const [input, exact, display] of [
  ['100,25K',100250,'100,25K'],
  ['100,25M',100250000,'100,25M'],
  ['100,25B',100250000000,'100,25B'],
  ['200,55b',200550000000,'200,55B']
]) {
  test(`F ${input} → ${exact} → ${display}`, ()=>{
    const p=rc8Build12ParseTournamentChip(input);
    if(!p.valid) throw new Error('parser markeert invoer ongeldig');
    eq(p.value, exact, 'modelwaarde');
    eq(rc8Build12FormatTournamentChip(p.value), display, 'presentatie');
    return `${p.value} → ${display}`;
  });
}

// ===== G. Punt 2: structurele eisen in productiecode =====
test('G1 guided flow bevat pending-gate vóór review', ()=>{
  if (!html.includes("if(!w.pending.length){w.review=w.street;w.step='review'")) {
    throw new Error('pending-gate naar review niet gevonden');
  }
  return 'review alleen bij lege pending-queue';
});
test('G2 replay-state definieert closed alleen bij lege pending', ()=>{
  if (!html.includes("state.closed=state.pending.length===0")) {
    throw new Error('state.closed pending-voorwaarde niet gevonden');
  }
  return 'state.closed gekoppeld aan lege pending';
});
test('G3 structurele edit hervat action-mode', ()=>{
  const src=extractLastFunction('wzResumeAfterStructuralEdit');
  if (!src.includes("w.step='action'")) throw new Error('action-resume niet gevonden');
  if (!src.includes('arr.slice(0,index)')) throw new Error('downstream truncate niet gevonden');
  return 'downstream acties worden verwijderd en action-mode hervat';
});

// ===== Resultaat =====
const passed = tests.filter(t=>t.pass).length;
const failed = tests.length-passed;
const result = {
  html: htmlPath,
  appVersion: (html.match(/const APP_VERSION='([^']+)'/)||[])[1] || 'onbekend',
  total: tests.length,
  passed,
  failed,
  overall: failed===0 ? 'PASS' : 'FAIL',
  tests
};

console.log(JSON.stringify(result,null,2));
process.exit(failed===0 ? 0 : 1);
