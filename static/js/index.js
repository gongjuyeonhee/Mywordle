let index = 0;
let attempts = 0;
let timer;

function appStart() {
  /*화면에 렌더링 되는 함수*/

  /*키를 입력했을 경우의 함수*/
  const handleEnterKey = async () => {
    let correctNum = 0;
    const correctString = await fetch("/answer");
    const correct_obj = await correctString.json();
    const correct = correct_obj.answer;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText; //입력한 글자
      const right_letter = correct[i]; //정답 글자
      const wordBlock = document.querySelector(
        `.word-block[data-key='${letter}']`
      );
      //입력글자와 정답글자를 비교하면 됨
      if (letter === right_letter) {
        correctNum += 1;
        block.style.background = "#6AAA64";
        wordBlock.style.background = "#6AAA64";
      } else if (correct.includes(letter)) {
        block.style.background = "#C9B458";
        wordBlock.style.background = "#C9B458";
      }
      //right_letter이 아니라 correct 여야함.
      else {
        block.classList.add("wrong");
        wordBlock.style.background = "#787C7E";
        wordBlock.style.color = "white";
      } //글자가 화이트로 바뀌는 거.
    }

    //정답을 맞추면 게임 종료 함수 호출
    if (correctNum === 5) gameWin();
    //다음 줄로 가는 함수
    else nextLine();
  };

  /*다음 라인으로 넘어가는 함수*/
  const nextLine = () => {
    if (attempts === 5) return gamelose(); //마지막 줄(6번째줄)에서도 못맞췄을 경우 게임종료 함수 호출
    attempts += 1;
    index = 0;
  };

  /*백스페이스 눌렀을 경우의 함수*/
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  /*키보드 무빙(애니메이션 적용에 대한 코드) */
  const movingKeyboard = (key) => {
    const wordBlock = document.querySelector(`.word-block[data-key='${key}']`);

    if (wordBlock) {
      // 기존 클래스 제거
      wordBlock.classList.remove("click-keyboard");
      // requestAnimationFrame 내에서 클래스를 추가하는 코드를 실행
      requestAnimationFrame(() => {
        wordBlock.classList.add("click-keyboard");
      });
    } else {
      // 선택한 요소가 존재하지 않으면 에러 메시지를 출력하거나 다른 작업을 수행
      console.error(`Element with data-key '${key}' not found.`);
    }
  };

  /*키보드박스랑 키보드자체 가 눌렸을 경우의 함수*/
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    movingKeyboard(key); //키보드 무빙에 대한 거

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      //단어가 다 입력됐을 때만 호출되는 코드
      if (e.key === "Enter") handleEnterKey();
      else return; //입력이 되지 않았다면 return 으로 빠져나가기
    } else if (65 <= keyCode && keyCode <= 90 && thisBlock !== null) {
      thisBlock.innerText = key; //thisBlock에 null값이 들어와서 콘솔 지저분해짐..그래서 처리해줌
      index += 1;
    }
  };

  /*키보드 입력했을 때*/
  const handlekeyboard = (e) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const nowkey = e.target.dataset.key;

    movingKeyboard(nowkey); //키보드무빙에 대한 거

    if (nowkey === "BACK") handleBackspace();
    else if (index === 5) {
      if (nowkey == "ENTER") handleEnterKey();
      else return;
    } else if (
      nowkey !== undefined &&
      nowkey !== "BACK" &&
      nowkey !== "ENTER"
    ) {
      thisBlock.innerText = nowkey;
      index += 1; //옆으로 옮기기
    }
  };

  const displayGamewin = () => {
    const containerDiv = document.createElement("div"); // 부모 컨테이너 div
    containerDiv.classList.add("finish");

    const timeDiv = document.createElement("div");
    const timerDiv = document.querySelector("#timer");
    const timerText = timerDiv.innerText;

    // elapsedTime 변수를 밀리초 단위로 설정
    const elapsedTime =
      30000 -
      (parseInt(timerText.slice(0, 2)) * 60 * 1000 +
        parseInt(timerText.slice(3)) * 1000);

    // elapsedTime을 Date 객체로 변환
    const elapsedDate = new Date(elapsedTime);

    // 시간과 분 추출
    const elapsedMinutes = elapsedDate.getMinutes().toString().padStart(2, "0");
    const elapsedSeconds = elapsedDate.getSeconds().toString().padStart(2, "0");

    timeDiv.innerText = `걸린 시간 ${elapsedMinutes}:${elapsedSeconds}`;

    const successDiv = document.createElement("div");
    successDiv.innerText = "!!! 성공 !!!";

    // timeDiv와 successDiv를 containerDiv에 추가
    containerDiv.appendChild(timeDiv);
    containerDiv.appendChild(successDiv);

    // containerDiv를 body에 추가
    document.body.appendChild(containerDiv);
  };

  const displayGamelose = () => {
    const div = document.createElement("div");
    div.innerText = "게임 실패";
    div.classList.add("win");
    document.body.appendChild(div);
  };

  /*정답을 맞췄을 때만 게임오버됨.*/
  const gameWin = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGamewin();
    clearInterval(timer);
  };

  /*정답 맞추기 실패했을 때*/
  const gamelose = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGamelose();
    clearInterval(timer);
  };

  /*타이머 시작하는 함수*/
  const startTimer = () => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 30 * 1000);

    const timerDiv = document.querySelector("#timer");

    function setTime() {
      const nowTime = new Date();
      const remainingTime = new Date(endTime - nowTime);

      const m = remainingTime.getMinutes().toString();
      const s = remainingTime.getSeconds().toString();

      if (remainingTime < 0) {
        gamelose();
        timerDiv.innerText = "00:00"; // 타이머 종료 메시지 표시
        return;
      }

      timerDiv.innerText = `${m.padStart(2, "0")}:${s.padStart(2, "0")}`;
    }

    //주기성
    timer = setInterval(setTime, 1000); //timer에 저장된 건 셋인터벌의 아이디, 즉 몇번째 인터벌이 돌고 있는지
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handlekeyboard);
}

appStart();
