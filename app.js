const QUESTIONS = [
  {t:"Q1", text:"お休みの日は…", A:"お友だちといっぱい遊びたい！", B:"ひとりで遊びたい", key:"EI", Alean:"E", Blean:"I"},
  {t:"Q2", text:"遊びのとき…", A:"新しいルールを考える", B:"決まったルールを守る", key:"SN", Alean:"N", Blean:"S"},
  // …（残りも同じように10問分）
];

const typeMap = {
  ENTJ:{emoji:"🦁",animal:"ライオン",kid:"リーダー気質！",adult:"戦略的で指導力がある。",themes:["学校改善","地域企画"],careers:["経営","PM"]},
  ENFP:{emoji:"🐬",animal:"イルカ",kid:"ワクワク発明家！",adult:"共感力と創造力に富む。",themes:["イベント企画","表現活動"],careers:["クリエイター","PR"]},
  // …（16タイプすべて）
};

let idx=0, answers=[], tally={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};

function byId(id){return document.getElementById(id);}
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));byId(id).classList.add("active");}
function reset(){idx=0;answers=[];tally={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};show("screen-quiz");renderQ();}

function renderQ(){
  const q=QUESTIONS[idx];
  byId("q-title").textContent=q.t+` (${idx+1}/${QUESTIONS.length})`;
  byId("q-text").textContent=q.text;
  byId("btnA").textContent="A: "+q.A;
  byId("btnB").textContent="B: "+q.B;
  byId("progress-bar").style.width=(idx/QUESTIONS.length*100)+"%";
}

function choose(choice){
  answers[idx]=choice;
  const q=QUESTIONS[idx];
  tally[(choice==="A")?q.Alean:q.Blean]++;
  if(idx<QUESTIONS.length-1){idx++;renderQ();}else{showResult();}
}

function getType(){
  const EI=(tally.E>=tally.I)?"E":"I";
  const SN=(tally.S>tally.N)?"S":"N";
  const TF=(tally.T>=tally.F)?"T":"F";
  const JP=(tally.J>tally.P)?"J":"P";
  return EI+SN+TF+JP;
}

function showResult(){
  const code=getType(), d=typeMap[code]||typeMap.ENFP;
  byId("type-code").textContent=code;
  byId("animal-name").textContent=d.animal;
  byId("animal-emoji").textContent=d.emoji;
  byId("kid-msg").textContent=d.kid;
  byId("adult-desc").textContent=d.adult;
  byId("themes").innerHTML=d.themes.map(x=>`<li>${x}</li>`).join("");
  byId("careers").innerHTML=d.careers.map(x=>`<li>${x}</li>`).join("");
  byId("progress-bar").style.width="100%";
  show("screen-result");
}

byId("btn-start").onclick=reset;
byId("btnA").onclick=()=>choose("A");
byId("btnB").onclick=()=>choose("B");
byId("btn-back").onclick=()=>{if(idx>0){idx--;renderQ();}};
byId("btn-retry").onclick=()=>show("screen-start");
