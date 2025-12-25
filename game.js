// スマホ判定（PCは警告表示）
function checkDevice() {
  if(window.innerWidth > 600){
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("pcWarning").style.display = "flex";
  } else {
    document.getElementById("pcWarning").style.display = "none";
    document.getElementById("menuScreen").style.display = "flex";
  }
}

// 初回判定
checkDevice();

// 画面サイズ変更時も判定
window.onresize = checkDevice;

// 戻るボタン（ブラウザ履歴で前のページに戻る）
document.getElementById("backBtn").onclick = () => {
  if(window.history.length > 1){
    window.history.back();
  } else {
    window.location.href = "https://www.google.com"; // 任意のURLに変更可
  }
};

const questions = [
  "このゲームは簡単だ。",
  "すぐに答えられる。",
  "間違えても平気。",
  "ここまで順調に来た。",
  "この先も簡単だ。",
  "このゲームは、ずっと同じ質問がつづく。",
  "ここまで、何も考えずに答えられている。",
  "間違えても、特に意味はない。",
  "正直に答えなくても、問題は起きない。",
  "この先も、同じ気持ちで進める。",
  "文字は、ただの記号だ。",
  "画面の向こうには、何もない。",
  "軽い気持ちで出した言葉は、軽く届く。",
  "見えない相手なら、想像する必要はない。",
  "一度投げた言葉は、空気にまぎれて消える。",
  "**SNSでは**、言葉は思ったほど重くない。",
  "**SNSでは**、書いた瞬間だけが問題になる。",
  "**SNSでは**、相手が弱いのが悪い。",
  "**SNSでは**、正しいことを言っていれば傷つかない。",
  "**SNSでは**、言われた側は自分で処理できる。",
  "**SNSでは**、たった一言が流れを変えることはない。",
  "**SNSでは**、誰かを追い込んでも気づかない。",
  "**SNSでは**、自分の言葉が誰かの毎日になることはない。",
  "**SNSでは**、責任はいつも他人にある。",
  "**SNSでは**、このゲームを終えたら、もう関係ない。",
  "誰かを傷つける言葉を、気づかずに送ったことはある。",
  "あなたの軽い一言で、誰かの夜が終わったことはない。",
  "言葉は戻らず、忘れられず、残り続ける。",
  "あなたが無視した警告は、誰かを守れたはずだ。",
  "書かない選択をした瞬間も、世界は変わる。",
  "誰かが泣くのを、あなたは止められたはずだ。",
  "あなたの言葉が、知らぬ間に連鎖している。",
  "誰かの人生に、あなたの一言が残った。",
  "目の前の画面の向こうに、傷ついた顔はある。",
  "このゲームが終わっても、影響は消えない。"
];

let current = 0;
let wrongCount = 0;

// DOM
const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startBtn");
const exitBtn = document.getElementById("exitBtn");
const questionDiv = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const endMessage = document.getElementById("endMessage");
const menuBtn = document.getElementById("menuBtn");

// メニュー操作
startBtn.onclick = () => {
  menuScreen.style.display = "none";
  gameScreen.style.display = "flex";
  startGame();
};

exitBtn.onclick = () => {
  alert("ゲームを終了します。");
  window.close();
};

// ゲーム開始
function startGame(){
  current = 0;
  wrongCount = 0;
  endMessage.style.opacity = 0;
  menuBtn.style.display = "none";
  document.body.style.background = "linear-gradient(135deg, #111 0%, #222 100%)";
  yesBtn.style.display = "inline-block";
  noBtn.style.display = "inline-block";
  showQuestion();
}

// 質問表示
function showQuestion() {
  if(current >= questions.length){
    endGame();
    return;
  }
  questionDiv.style.display = "block";
  questionDiv.style.opacity = 1;
  questionDiv.textContent = `Q${current + 1} ${questions[current]}`;
}

// 回答処理
function answer(choice){
  if(current >=10 && current <=24 && choice === "はい") wrongCount++;

  questionDiv.style.transition = "opacity 1s";
  questionDiv.style.opacity = 0;

  setTimeout(()=>{
    current++;
    showQuestion();
  }, 1000);
}

// エンディング演出
function scaryEffect(msg){
  questionDiv.style.display = "none";
  endMessage.textContent = msg;
  endMessage.style.opacity = 0;
  document.body.style.background = "linear-gradient(135deg, #330000 0%, #000000 100%)";

  setTimeout(()=>{
    endMessage.style.opacity = 1;
    let i=0;
    const interval = setInterval(()=>{
      endMessage.style.transform = `translate(${(Math.random()-0.5)*15}px,${(Math.random()-0.5)*10}px) rotate(${(Math.random()-0.5)*3}deg)`;
      i++;
      if(i>20){ clearInterval(interval); endMessage.style.transform='translate(0,0) rotate(0deg)'; }
    },50);
  },500);

  setTimeout(()=>{ menuBtn.style.display = "inline-block"; },1500);
}

// 終了処理
function endGame(){
  questionDiv.style.display="none";
  yesBtn.style.display="none";
  noBtn.style.display="none";

  let msg = "";
  if (wrongCount <= 2) msg = "ほとんど疑えていた。軽く見てはいけないことも、ちゃんと見ていた。";
  else if (wrongCount <= 5) msg = "分かっているつもりで、見落としている。その「少し」が、残る。";
  else if (wrongCount <= 8) msg = "多くの言葉を軽く見ていた。その軽さが、あとで返ってくる。";
  else if (wrongCount <= 11) msg = "疑う前に答えていた。誰も止めてはくれない。";
  else if (wrongCount <= 14) msg = "言葉を選んだ記憶がほとんどない。でも、残ったものは消えない。";
  else msg = "一度も立ち止まらなかった。すべては、あなたの責任。";

  scaryEffect(msg);
}

// ボタンイベント
yesBtn.onclick = ()=>answer("はい");
noBtn.onclick = ()=>answer("いいえ");
menuBtn.onclick = () => {
  gameScreen.style.display = "none";
  menuScreen.style.display = "flex";
};
