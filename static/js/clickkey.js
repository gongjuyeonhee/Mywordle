//이건 눌렸을 때 키보드 처리..
/*
const thiskey = document.querySelector(".key-block[data-key='']");
console.log(thiskey);
*/

function clickKeyboard() {
  const handlekeyboard = (e) => {
    const nowkey = e.target.dataset.key;
  };
  window.addEventListener("click", handlekeyboard);
}
clickKeyboard();

const nowkey = e.target.dataset.key; //키보드 박스로 입력한 글자********
const wordBlock = document.querySelector(`.word-block[data-key='${nowkey}']`);

//키보드 색깔 처리해줄때
/*
      키보드가 눌린 건 다 회색 처리해줘야 함. 현재 5개만 처리되고 엔터 누르면 다시 그전에 됐던게 없어짐.
    
      입력에 따라 색깔을 구별하는 거잖슴
      첫줄에 눌러진것만 색깔 칠해짐.
      키보드 배열이 안바껴짐. 
      word-block[data-key='${nowkey} <<여기에 맞는 단어만 넣으니까 안됐던거...현재 입력한 거에 적용해줘여지. ㅇㅇ해결했다옹~
      


      내일 해야할 거. 
      1) 끝까지 해도 못맞추면 게임오버 뜨도록하기
        2) 게임 못맞추면 시간 멈추는 것도 추가
        3) 자판 배열 바꾸기
        4) 애니메이션 추가
        5) 헤더랑 푸터 영역에 html, css 추가
        6) displayGameover() 이 함수에서 정의한 css는 css파일에 넣어주기.
        7) 색 바꿔주기.
        8) 게임 종료 시 css 이쁘게 꾸미기.
        9) 배포 완료하기
      */
