// ===== 子ども向け 10問（MBTI風 16タイプ判定） =====
const QUESTIONS = [
  { t:"Q1",  text:"お休みの日は…", A:"お友だちといっぱい遊びたい！", B:"ひとりで本やおもちゃで遊びたい", key:"EI", Alean:"E", Blean:"I" },
  { t:"Q2",  text:"遊びのとき…",   A:"新しいルールを考えるのが楽しい！", B:"決まったルールを守ると安心する", key:"SN", Alean:"N", Blean:"S" },
  { t:"Q3",  text:"勉強や宿題は…", A:"早く終わらせて自由にしたい",     B:"計画を立てて順番にやりたい",     key:"JP", Alean:"P", Blean:"J" },
  { t:"Q4",  text:"お友だちがけんかしたら…", A:"どっちが正しいかを考える", B:"みんなが仲良くなるように考える", key:"TF", Alean:"T", Blean:"F" },
  { t:"Q5",  text:"好きな遊びは…", A:"空想やごっこ遊び", B:"ブロックやパズルなど手で作る遊び", key:"SN", Alean:"N", Blean:"S" },
  { t:"Q6",  text:"困ったことがあったら…", A:"すぐに誰かに話したい", B:"まず自分で考えてみたい", key:"EI", Alean:"E", Blean:"I" },
  { t:"Q7",  text:"宿題をする時…", A:"その日の気分でやりたい", B:"やる時間を決めて進めたい", key:"JP", Alean:"P", Blean:"J" },
  { t:"Q8",  text:"新しい遊びをするとき…", A:"自分流に工夫してやってみる", B:"やり方をちゃんと聞いてからやる", key:"SN", Alean:"N", Blean:"S" },
  { t:"Q9",  text:"お友だちの発表を聞くとき…", A:"考え方や理由が気になる", B:"気持ちや表情が気になる", key:"TF", Alean:"T", Blean:"F" },
  { t:"Q10", text:"大きくなったら…", A:"みんなの前で活躍したい！", B:"しずかに考える仕事がいい", key:"EI", Alean:"E", Blean:"I" },
];

// ===== 16タイプ結果マップ =====
const typeMap = {
  ENTJ:{emoji:"🦁",animal:"ライオン（リーダー）",
    kid:"きみはみんなをまとめるのが得意！やることをきめてグイグイ進められるよ。",
    adult:"目標に向けて計画し、優先順位を決めて実行できます。意思決定がはやく、周囲を引っ張れます。",
    themes:["学校をよくする提案","地域課題の改善","イベント運営"],
    careers:["起業/経営","プロジェクトマネージャー","コンサル","政策立案"]
  },
  ENTP:{emoji:"🦊",animal:"キツネ（ひらめき発明家）",
    kid:"新しいアイデアや発明がだいすき！工夫してゲームのルールも作れちゃう。",
    adult:"話し合いの中で発想が広がり、常識をくつがえす視点を出せます。試しながら学ぶのが得意。",
    themes:["新発明/プロトタイピング","ディベート","新商品企画"],
    careers:["企画/商品開発","マーケ/グロース","スタートアップ"]
  },
  ENFJ:{emoji:"🕊️",animal:"ハト（まとめ上手）",
    kid:"みんながなかよくなるように動けるよ。はげますのが上手！",
    adult:"人の気持ちをつかみ、目標をわかりやすく共有。合意形成やチーム作りに強みがあります。",
    themes:["学級づくり","ボランティア","コミュニティ運営"],
    careers:["教育/人事","ファシリテーター","広報/コミュニティ"]
  },
  ENFP:{emoji:"🐬",animal:"イルカ（わくわく発明家）",
    kid:"好奇心いっぱい！やってみたいがどんどん出てくるタイプ。",
    adult:"自分の大事にしている思いからアイデアがあふれ、人をワクワクで巻き込みます。",
    themes:["イベント企画","表現/創作","観光PR"],
    careers:["クリエイター","PR/広報","コンテンツ企画"]
  },

  INTJ:{emoji:"🦉",animal:"フクロウ（戦略家）",
    kid:"しずかに考えるのが得意。本や研究でぐっと深められるよ。",
    adult:"長期的に筋道を立て、仕組み化して安定運用へ導けます。分析と計画が強み。",
    themes:["AI/プログラミング","データ分析","長期計画研究"],
    careers:["戦略/企画","データ/リサーチ","プロダクト設計"]
  },
  INTP:{emoji:"🐧",animal:"ペンギン（知恵者・観察者）",
    kid:"『なぜ？どうして？』が止まらない！観察して考えるのが得意な名探偵。",
    adult:"理論や仕組みをじっくり考え、観察・分析から新しい発見をします。",
    themes:["宇宙/数理","仕組みの解明","実験設計"],
    careers:["研究開発","アナリスト","設計/アルゴリズム"]
  },
  INFJ:{emoji:"🦄",animal:"ユニコーン（未来を思いやる）",
    kid:"人の気持ちがよくわかる。やさしい未来を考えられるよ。",
    adult:"自分の大切な思いをもとに『こんな未来にしたい』を語り、静かな求心力で支援を広げます。",
    themes:["福祉/カウンセリング","共同学習の設計","社会課題の物語化"],
    careers:["カウンセラー","教育/福祉","NPO/ソーシャル"]
  },
  INFP:{emoji:"🐰",animal:"ウサギ（ゆめみる表現者）",
    kid:"絵や歌、物語づくりがだいすき。想像の世界を広げられる！",
    adult:"内面の価値や物語を丁寧に表現し、人の心に届く作品を生みます。",
    themes:["絵本/詩","アートプロジェクト","小さな展示会"],
    careers:["ライター/作家","デザイン","アート/文化"]
  },

  ESTJ:{emoji:"🐂",animal:"バイソン（実務指揮）",
    kid:"決められたことをテキパキこなすヒーロー！",
    adult:"手順を整え、現場を安定させます。ルール運用と実務管理に強みあり。",
    themes:["校内運営の改善","時間割の最適化","安全マニュアル作り"],
    careers:["オペレーション","総務/管理","PMO"]
  },
  ESFJ:{emoji:"🐼",animal:"パンダ（やさしい守り手）",
    kid:"みんなを助けるのがすき！困っている人を見つける名人。",
    adult:"配慮と調整で周囲を支えるホスピタリティ力。場をあたたかく保ちます。",
    themes:["ボランティア","健康/栄養","地域つながりプロジェクト"],
    careers:["学校支援","人事/総務","医療補助/看護助手"]
  },
  ESTP:{emoji:"🐆",animal:"チーター（行動派）",
    kid:"体をうごかすのが大好き！やってみて学ぶ天才。",
    adult:"瞬発力と現場対応に強く、実地で成果を出す実践家。",
    themes:["スポーツ科学","実験/工作","eスポーツ分析"],
    careers:["セールス","イベント運営","トレーナー"]
  },
  ESFP:{emoji:"🦝",animal:"アライグマ（ムードメーカー）",
    kid:"みんなを笑顔にする天才！楽しいことを見つけるのが上手。",
    adult:"場の空気づくりと即興力で魅せます。体験を明るくデザイン。",
    themes:["発表会/ライブ","観光/地域PR","体験づくり"],
    careers:["タレント/MC","接客/観光","イベント企画"]
  },

  ISTJ:{emoji:"🐘",animal:"ゾウ（こつこつ名人）",
    kid:"記録や整理がとくい。まいにち続ける力が武器！",
    adult:"規律・記録・検証に強く、品質と安全を守る番人。",
    themes:["歴史/記録","統計/観察","標本づくり"],
    careers:["品質管理","会計/法務補助","調査士"]
  },
  ISFJ:{emoji:"🐨",animal:"コアラ（やさしい見守り）",
    kid:"人の気持ちに気づいて、そっと手をさしのべられるよ。",
    adult:"気配りとサポートで安心感をつくる、縁の下の力持ち。",
    themes:["ケア/福祉","学習支援","読み聞かせ"],
    careers:["スクールサポート","医療事務","地域福祉"]
  },
  ISTP:{emoji:"🦦",animal:"カワウソ（クラフト職人）",
    kid:"ものづくりがとくい。道具の使い方も上手！",
    adult:"道具や機械等のしくみを理解し、最短で直すトラブルシューター。",
    themes:["分解/修理","3Dプリント","メイカーズ"],
    careers:["エンジニア","整備/制作","セキュリティ"]
  },
  ISFP:{emoji:"🦚",animal:"クジャク（アート感性・自己表現）",
    kid:"色や形がだいすき。きれい！を見つける名人。",
    adult:"感性で世界を切り取り、彩り豊かな表現で人を惹きつけます。",
    themes:["写真/デザイン","自然観察スケッチ","展示づくり"],
    careers:["デザイナー","フォト/映像","プロダクト造形"]
  },
};


// ===== 要素参照 =====
const sStart = document.getElementById("screen-start");
const sQuiz  = document.getElementById("screen-quiz");
const sRes   = document.getElementById("screen-result");
const qTitle = document.getElementById("q-title");
const qText  = document.getElementById("q-text");
const btnA   = document.getElementById("btnA");
const btnB   = document.getElementById("btnB");
const btnBack= document.getElementById("btn-back");
const bar    = document.getElementById("progress-bar");
const typeCodeEl   = document.getElementById("type-code");
const animalNameEl = document.getElementById("animal-name");
const animalEmojiEl= document.getElementById("animal-emoji");
const kidMsgEl     = document.getElementById("kid-msg");
const adultDescEl  = document.getElementById("adult-desc");
const themesEl  = document.getElementById("themes");
const careersEl = document.getElementById("careers");
const btnRetry     = document.getElementById("btn-retry");
const btnShare     = document.getElementById("btn-share");


// ===== 状態 =====
let i=0, answers=[];
let tally = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};

// ===== 画面制御 =====
function show(el){ [sStart,sQuiz,sRes].forEach(x=>x.classList.remove("active")); el.classList.add("active"); }
function start(){ i=0; answers=[]; tally={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}; show(sQuiz); render(); }

function render(){
  const q = QUESTIONS[i];
  qTitle.textContent = `${q.t}（${i+1}/${QUESTIONS.length}）`;
  qText.textContent  = q.text;
  btnA.textContent   = "A： " + q.A;
  btnB.textContent   = "B： " + q.B;
  bar.style.width    = (i/QUESTIONS.length*100) + "%";
  // ← 必ず“表示/非表示”を切替（見えない問題の根治）
  btnBack.style.display = (i>0) ? "inline-block" : "none";
}

function choose(choice){
  answers[i]=choice;
  const lean = (choice==="A") ? QUESTIONS[i].Alean : QUESTIONS[i].Blean;
  tally[lean] += 1;
  if(i<QUESTIONS.length-1){ i++; render(); }
  else { bar.style.width="100%"; showResult(); }
}

function back(){ if(i>0){ i--; render(); } }

// ===== タイプ判定 =====
function getType(){
  const EI=(tally.E>=tally.I)?"E":"I";
  const SN=(tally.S>tally.N)?"S":"N";
  const TF=(tally.T>=tally.F)?"T":"F";
  const JP=(tally.J>tally.P)?"J":"P";
  return EI+SN+TF+JP;
}

function showResult(){
  const code = getType();
  const data = typeMap[code] || typeMap.ENFP;
  typeCodeEl.textContent = code;
  animalNameEl.textContent = data.animal;
  animalEmojiEl.textContent = data.emoji;
  kidMsgEl.textContent = data.kid;
  adultDescEl.textContent = data.adult;
  fillChips(themesEl,  data.themes);
  fillChips(careersEl, data.careers);
  history.replaceState({}, "", `#${code}`);
  show(sRes);
}
function fillChips(ul, items){
  if(!ul) return;
  ul.innerHTML = "";
  (items || []).forEach(txt=>{
    const li = document.createElement("li");
    li.textContent = txt;
    ul.appendChild(li);
  });
}


// ===== 共有（環境によりWeb Share / クリップボード） =====
async function share(){
  const code = typeCodeEl.textContent;
  const text = `わたしのタイプは ${code}：${animalNameEl.textContent}！ #どうぶつ16タイプ診断`;
  const url  = location.href.split("#")[0] + `#${code}`;
  if(navigator.share){
    try{ await navigator.share({title:"どうぶつ16タイプ診断", text, url}); }catch(e){}
  }else{
    try{ await navigator.clipboard.writeText(`${text} ${url}`); alert("結果リンクをコピーしました！"); }catch(e){}
  }
}

// ===== イベント結び付け =====
document.getElementById("btn-start").addEventListener("click", start);
btnA.addEventListener("click", ()=>choose("A"));
btnB.addEventListener("click", ()=>choose("B"));
btnBack.addEventListener("click", back);
if (btnRetry) btnRetry.addEventListener("click", ()=>{ location.hash=""; show(sStart); });
if (btnShare) btnShare.addEventListener("click", share);

// ===== 共有リンクで直接結果を開く（任意） =====
(function tryOpenFromHash(){
  const h = location.hash.replace("#","");
  if(h && typeMap[h]){
    const d = typeMap[h];
    typeCodeEl.textContent = h;
    animalNameEl.textContent = d.animal;
    animalEmojiEl.textContent = d.emoji;
    kidMsgEl.textContent = d.kid;
    adultDescEl.textContent = d.adult;
    show(sRes);
  }
})();
