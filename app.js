// ===== デザイン切替（そのまま使えます） =====
const tgl = document.getElementById("toggle-theme");
if (tgl) {
  tgl.addEventListener("click", () => {
    document.body.classList.toggle("cute");
  });
}

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
    adult:"お子さまは目標志向が強く、資源配分・意思決定に優れます。短期の推進力と中長期の設計を両立できます。",
    themes:["学校をよくする提案","地域課題の改善","イベント運営"],
    careers:["起業/経営","プロジェクトマネージャー","コンサル","政策立案"]
  },
  ENTP:{emoji:"🦊",animal:"キツネ（アイデア勝負）",
    kid:"きみは新しいアイデアや発明がだいすき！工夫してゲームのルールも作れちゃう。",
    adult:"お子さまは仮説思考・発想転換・議論が得意で革新的。探索段階の牽引役です。",
    themes:["新発明/プロトタイピング","ディベート","新商品企画"],
    careers:["企画/商品開発","マーケ/グロース","スタートアップ"]
  },
  ENFJ:{emoji:"🕊️",animal:"ハト（まとめ上手）",
    kid:"きみはみんながなかよくなるように動けるよ。はげますのが上手！",
    adult:"お子さまは対人洞察と合意形成が強いファシリテーター。チームの心理的安全性を作ります。",
    themes:["学級づくり","ボランティア","コミュニティ運営"],
    careers:["教育/人事","ファシリテーター","広報/コミュニティ"]
  },
  ENFP:{emoji:"🐬",animal:"イルカ（わくわく発明家）",
    kid:"きみは好奇心いっぱい！やってみたいがどんどん出てくるタイプ。",
    adult:"お子さまは多くの新しいアイデアを思いつきます。その考えに共感して、まわりも動き出します。",
    themes:["イベント企画","表現/創作","観光PR"],
    careers:["クリエイター","PR/広報","コンテンツ企画"]
  },
  INTJ:{emoji:"🦉",animal:"フクロウ（戦略家）",
    kid:"きみはしずかに考えるのが得意。本や研究でぐっと深められるよ。",
    adult:"お子さまは構造化・長期戦略設計に強く、仕組み化で安定運用を実現できます。",
    themes:["AI/プログラミング","データ分析","長期計画研究"],
    careers:["戦略/企画","データ/リサーチ","プロダクト設計"]
  },
  INTP:{emoji:"🧠",animal:"フクロウ（知恵者）",
    kid:"きみはなぜ？どうして？が止まらない！じっくり考える名探偵。",
    adult:"お子さまは理論構築・抽象化・検証に強く、仮説→検証を回す研究肌です。",
    themes:["宇宙/数理","仕組みの解明","実験設計"],
    careers:["研究開発","アナリスト","設計/アルゴリズム"]
  },
  INFJ:{emoji:"🌙",animal:"ユニコーン（思いやりの先見）",
    kid:"きみは人の気持ちがよくわかる。やさしい未来を考えられるよ。",
    adult:"お子さまは自分の大切にしている思いを周囲に広げ、やさしい未来へと繋げられます。",
    themes:["福祉/カウンセリング","共同学習の設計","社会課題の物語化"],
    careers:["カウンセラー","教育/福祉","NPO/ソーシャル"]
  },
  INFP:{emoji:"🐰",animal:"ウサギ（ゆめみる表現者）",
    kid:"きみは絵や歌、物語づくりがだいすき。想像の世界を広げられる！",
    adult:"お子さまは内面価値を表現し、人の心に届く創作を紡ぐことが得意です。",
    themes:["絵本/詩","アートプロジェクト","小さな展示会"],
    careers:["ライター/作家","デザイン","アート/文化"]
  },
  ESTJ:{emoji:"🛡️",animal:"バイソン（実務指揮）",
    kid:"きみは決められたことをテキパキこなすヒーロー！",
    adult:"お子さまは実務最適化・手順設計に強く、場を安定させる司令塔です。",
    themes:["校内運営の改善","時間割の最適化","安全マニュアル作り"],
    careers:["オペレーション","総務/管理","PMO"]
  },
  ESFJ:{emoji:"🤝",animal:"パンダ（やさしい守り手）",
    kid:"きみはみんなを助けるのがすき！困っている人を見つける名人。",
    adult:"お子さまはケアと調整で周囲を支えるホスピタリティ力があります。",
    themes:["ボランティア","健康/栄養","地域つながりプロジェクト"],
    careers:["医療補助/看護助手","人事/総務","学校支援"]
  },
  ISTJ:{emoji:"🐘",animal:"ゾウ（こつこつ名人）",
    kid:"きみは記録や整理がとくい。まいにち続ける力が武器！",
    adult:"お子さまは規律・記録・検証に強い。品質と安全を守る番人です。",
    themes:["歴史/記録","統計/観察","標本づくり"],
    careers:["品質管理","会計/法務補助","調査士"]
  },
  ISFJ:{emoji:"🧸",animal:"コアラ（やさしい見守り）",
    kid:"きみは人の気持ちに気づいて、そっと手をさしのべられるよ。",
    adult:"お子さまは配慮・サポートに秀でる縁の下の力持ちです。",
    themes:["ケア/福祉","学習支援","読み聞かせ"],
    careers:["スクールサポート","医療事務","地域福祉"]
  },
  ESTP:{emoji:"🐆",animal:"チーター（行動派）",
    kid:"きみは体をうごかすのが大好き！やってみて学ぶ天才。",
    adult:"お子さまは瞬発力があり、現場対応型。実地で成果を出す実践家です。",
    themes:["スポーツ科学","実験/工作","eスポーツ分析"],
    careers:["セールス","イベント運営","トレーナー"]
  },
  ESFP:{emoji:"🎉",animal:"ラッコ（ムードメーカー）",
    kid:"きみはみんなを笑顔にする天才！楽しいことを見つけるのが上手。",
    adult:"お子さまは場の空気づくりと即興力で魅せるエンタメ系です。",
    themes:["発表会/ライブ","観光/地域PR","体験づくり"],
    careers:["タレント/MC","観光/接客","イベント企画"]
  },
  ISTP:{emoji:"🛠️",animal:"カワウソ（クラフト職人）",
    kid:"きみはものづくりがとくい。道具の使い方も上手！",
    adult:"お子さまは道具や仕組みを理解し最短で直すトラブルシューターです。",
    themes:["分解/修理","3Dプリント","メイカーズ"],
    careers:["エンジニア","整備/制作","セキュリティ"]
  },
  ISFP:{emoji:"🎨",animal:"シカ（アート感性）",
    kid:"きみは色や形がすき。きれい！を見つける名人。",
    adult:"お子さまは感性で世界を切り取り、静かに魅せる表現者です。",
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
  history.replaceState({}, "", `#${code}`);
  show(sRes);
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
