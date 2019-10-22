const body = document.querySelector("body");
const IMAGE_NUM = 3;

function paintBg(imageNum) {
    const image = new Image();
    image.src = 'image/' + imageNum + '.jpg';
    image.classList.add("bgImage")
    body.appendChild(image);
}

function getRandomNumber() {
    return Math.ceil(Math.random() * 3);
}

function init() {
    const random = getRandomNumber();
    paintBg(random);
}

init();