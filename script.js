//랜덤 번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤 번호 < 유저번호 down
//랜덤번호 > 유저번호 up
//리셋 누르면 게임 리셋
//3번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다, 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 알려준다, 기회를 깎지 않는다

let computerNumber = 0;
let answerArea = document.getElementById("answer-area")
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resultAreaImg = document.getElementById("result-img")
let resetButton = document.getElementById("reset-button")
let chances 
let gameOver 
let chanceArea=document.getElementById("chance-area")
let history = []

playButton.addEventListener("click",play)
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){userInput.value=""})

//초기설정
function init() {
    chances = 3
    gameOver = false
    history = []
    chanceArea.textContent="남은찬스:3번"
    resultAreaImg.src="https://img.seoul.co.kr/img/upload/2021/10/25/SSI_20211025151321_O2.jpg"
}

function pickRandomNumber() {
    computerNumber = Math.floor(Math.random()*100)+1; //랜덤한 숫자를 뽑을 수 있는 함수
    console.log("정답",computerNumber);
    answerArea.textContent=`${computerNumber}`
}

function play() {
    let userValue = userInput.value

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해주세요."
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다."
        return;
    }

    chances --;
    chanceArea.textContent=`남은기회:${chances}번`;
    console.log("chance", chances);

    if(userValue < computerNumber) {
        resultArea.textContent = "UP 안 올라가면 다 죽어"
        resultAreaImg.src="https://ojsfile.ohmynews.com/PHT_IMG_FILE/2022/0826/IE003040838_PHT.jpg"
        // console.log("UP")
    } else if(userValue > computerNumber){
        resultArea.textContent = "DOWN 영차영차"
        resultAreaImg.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJYpaHY_MxNbEpnzoW_pF8D9_yC85rCVGEA&s"
        // console.log("DOWN")
    } else {
        resultArea.textContent = "정답! 스마일~"
        resultAreaImg.src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202110/06/029fb088-3ef6-4e89-bb4c-7685d241da9e.jpg"
        gameOver=true
        // console.log("정답")
    }


    history.push(userValue)
    console.log(history)

    if (chances < 1) {
        gameOver = true

    }

    if (gameOver == true) {
        playButton.disabled = true
    }
}

function reset(){
    init()

    if (gameOver == false) {
        playButton.disabled = false}

    //user input창이 깨끗하게 정리
    userInput.value = "";

    // 새로운 번호 생성
    pickRandomNumber();

    resultArea.textContent = "무궁화 숫자가 피었습니다"


}

init()
pickRandomNumber();
