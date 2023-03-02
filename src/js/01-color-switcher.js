function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.disabled = true;
let switcherID;

function onStartBtnClick() {
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
  if (refs.body.classList.contains('cls')) {
    return;
  }

  refs.body.classList.add('cls');

  switcherID = setInterval(() => {
    const backgroundColor = getRandomHexColor();
    refs.body.style.backgroundColor = backgroundColor;
  }, 1000);
}
function onStopBtnClick() {
  clearInterval(switcherID);
  refs.body.classList.remove('cls');
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}
