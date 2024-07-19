let isAutoPlay=false;
let intervalId;
let score=JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click',
    ()=>{playGame('rock')});
document.querySelector('.js-paper-button').addEventListener('click',
    ()=>{playGame('paper')});
document.querySelector('.js-scissors-button').addEventListener('click',
    ()=>{playGame('scissors')});

document.querySelector('.js-reset-score-button').addEventListener('click',()=>{
    confirme();
})
document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
    autoPlay();
});


document.body.addEventListener('keydown',(event)=>{
    if (event.key==='r'){
        playGame('rock');
    }else if(event.key==='s'){
        playGame('scissors');
    }else if (event.key==='p'){
        playGame('paper');
    }else if(event.key===' '){
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
    }else if(event.key==='a'){
        autoPlay();
    }

})
function playGame(playerMove){
    let computerMove= pickComputerMove();

    let result='';

    if (playerMove==='scissors'){
        if (computerMove==='rock'){
            result='You lose.';
        }else if(computerMove==='paper'){
            result='You win.';
        }else{
            result='Tie.';
        }
    }else if (playerMove==='paper'){

        let computerMove=pickComputerMove();

        if (computerMove==='rock'){
            result='You win.';
        }else if(computerMove==='paper'){
            result='Tie.';
        }else{
            result='You lose.';
        }
    }else {
        let computerMove=pickComputerMove();

        if (computerMove==='rock'){
            result='Tie.';
        }else if(computerMove==='paper'){
            result='You lose.';
        }else{
            result='You win.';
        }
    }
    if (result ==='You win.'){
        score.wins++;
    }else if(result ==='You lose.'){
        score.losses++;
    }else{
        score.ties++;
    }



    localStorage.setItem('score',JSON.stringify(score))
    updateScoreElement();

    document.querySelector('.js-results').innerHTML=result;
    if (playerMove==='rock' && computerMove==='rock'){
        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}.jpeg" class="move-icon">
        <img src="images/${computerMove}.jpeg" class="move-icon"> Computer`
    }else if(playerMove==='rock'&&(computerMove==='paper'||computerMove==='scissors')){
        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}.jpeg" class="move-icon">
        <img src="images/${computerMove}.webp" class="move-icon"> Computer`
    }else if(computerMove==='rock'&&(playerMove==='paper'||playerMove==='scissors')){
        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}.webp" class="move-icon">
        <img src="images/${computerMove}.jpeg" class="move-icon"> Computer`
    }else {
        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}.webp" class="move-icon">
        <img src="images/${computerMove}.webp" class="move-icon"> Computer`
    }

}
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins},
    Losses: ${score.losses}, Ties: ${score.ties}`;

}
function pickComputerMove(){
    let computerMove= '';
    const randoumNumber=Math.random();

    if (randoumNumber>=0 && randoumNumber<1/3){
        computerMove='rock';
    }else if (randoumNumber>=1/3 && randoumNumber<2/3){
        computerMove='paper';
    }else {
        computerMove='scissors';
    }
    return computerMove;
}

function autoPlay(){
    const button=document.querySelector('.auto-play-button');
    if (!isAutoPlay){
        intervalId=setInterval(function (){
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000)
        isAutoPlay=true;

        button.innerHTML='Stop Auto';
    }else {
        clearInterval(intervalId);
        isAutoPlay=false;

        button.innerHTML='Auto Play';
    }

}


const text=document.querySelector('.textcnf');
const agree=document.querySelector('.bAgree');
const disaggre=document.querySelector('.bDisagree');
function confirme(){
    agree.classList.remove('hidden');
    disaggre.classList.remove('hidden');
    agree.disabled=false;
    disaggre.disabled=false;


    agree.addEventListener('click', ()=>{
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
        clean();
    })
    disaggre.addEventListener('click',()=>{
        clean();
    })
    text.innerHTML='Are you sure want to reset score?';
    agree.innerHTML='Yes';
    disaggre.innerHTML='No';


}
clean();
function clean(){
    agree.classList.add('hidden');
    disaggre.classList.add('hidden');
    agree.disabled=true;
    disaggre.disabled=true;

    text.innerHTML='';
    agree.innerHTML='';
    disaggre.innerHTML='';

}
