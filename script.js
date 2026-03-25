let balance = 300;
const symbols = ["7","🍒","🍋","⭐","💎"];

function updateBalance(){
  document.getElementById("balance").innerText = balance;
}

function play(){
  let bet = parseInt(document.getElementById("bet").value) || 0;

  if(bet <= 0) return alert("Enter valid bet");
  if(bet > balance) return alert("Not enough balance");

  balance -= bet;
  updateBalance();

  let final = [
    rand(), rand(), rand()
  ];

  let i = 0;
  let spin = setInterval(()=>{
    document.getElementById("s1").innerText = rand();
    document.getElementById("s2").innerText = rand();
    document.getElementById("s3").innerText = rand();

    i++;
    if(i>8){
      clearInterval(spin);
      finish(final, bet);
    }
  },100);
}

function rand(){
  return symbols[Math.floor(Math.random()*symbols.length)];
}

function finish(slots, bet){
  let [a,b,c] = slots;

  document.getElementById("s1").innerText = a;
  document.getElementById("s2").innerText = b;
  document.getElementById("s3").innerText = c;

  document.querySelectorAll(".slot").forEach(s=>s.classList.remove("glow"));

  let count = [a,b,c].filter(x=>x==="7").length;

  let result = "";

  if(count === 3){
    balance += bet * 10;
    result = "🔥 JACKPOT!";
    glowAll();
  }
  else if(count === 2){
    balance += bet * 4;
    result = "🎉 77 WIN!";
    glowTwo(a,b,c);
  }
  else{
    result = "😢 Lose";
  }

  document.getElementById("result").innerText = result;
  updateBalance();
}

function glowAll(){
  document.querySelectorAll(".slot").forEach(s=>s.classList.add("glow"));
}

function glowTwo(a,b,c){
  [a,b,c].forEach((v,i)=>{
    if(v==="7"){
      document.getElementById("s"+(i+1)).classList.add("glow");
    }
  });
}
