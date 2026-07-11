// ===============================
// LuckyBoard
// ===============================

// 오늘 날짜 표시
const todayDate = document.getElementById("todayDate");

const now = new Date();

todayDate.textContent = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
});

// -------------------------------
// 오늘 날짜를 이용한 Seed 생성
// -------------------------------

const seed = Number(
    `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`
);

// 간단한 의사 난수
function random(index) {

    const x = Math.sin(seed + index) * 10000;

    return x - Math.floor(x);

}

function pick(arr, index) {

    return arr[Math.floor(random(index) * arr.length)];

}

// -------------------------------
// 데이터
// -------------------------------

const scores = [
    "97점",
    "95점",
    "92점",
    "89점",
    "85점",
    "81점",
    "78점",
    "74점"
];

const comments = [

    "오늘은 뜻밖의 기회가 찾아올 수 있습니다.",

    "천천히 움직일수록 좋은 결과를 얻습니다.",

    "작은 선택 하나가 큰 행운으로 이어질 수 있습니다.",

    "새로운 만남이 좋은 변화를 가져옵니다.",

    "조급함보다 여유가 더 큰 힘을 발휘합니다.",

    "오늘은 자신을 믿는 것이 최고의 행운입니다."

];

const ohayou = [

    "98점",
    "95점",
    "92점",
    "89점",
    "84점",
    "79점"

];

const zodiac = [

    "★★★★★",

    "★★★★☆",

    "★★★★☆",

    "★★★☆☆",

    "★★☆☆☆"

];

const animal = [

    "대길",

    "좋음",

    "평온",

    "무난",

    "주의"

];

const tarot = [

    "The Star",

    "The Sun",

    "The World",

    "The Magician",

    "Wheel of Fortune",

    "Strength",

    "Justice",

    "The Fool"

];

const luck = [

    "대길",

    "중길",

    "소길",

    "길",

    "평"

];

const items = [

    "화이트 셔츠",

    "텀블러",

    "노트",

    "이어폰",

    "향수",

    "손목시계",

    "커피",

    "책",

    "볼펜",

    "에코백"

];

const colors = [

    "Sky Blue",

    "Lavender",

    "Mint",

    "Coral",

    "Ivory",

    "Emerald",

    "Navy",

    "Rose Pink"

];

const numbers = [

    1,2,3,5,7,8,9,11,13,15,18,21,24,27,31,33,42

];

const quotes = [

    "행운은 준비된 사람에게 먼저 찾아옵니다.",

    "오늘의 미소가 내일의 기적이 됩니다.",

    "조금 느려도 괜찮습니다.",

    "좋은 일은 생각보다 가까이에 있습니다.",

    "작은 용기가 큰 변화를 만듭니다.",

    "오늘은 어제보다 조금 더 빛나는 하루입니다."

];

// -------------------------------
// 화면 출력
// -------------------------------

document.getElementById("overallScore").textContent = pick(scores,1);

document.getElementById("overallComment").textContent = pick(comments,2);

document.getElementById("ohayou").textContent = pick(ohayou,3);

document.getElementById("zodiac").textContent = pick(zodiac,4);

document.getElementById("animal").textContent = pick(animal,5);

document.getElementById("tarot").textContent = pick(tarot,6);

document.getElementById("luck").textContent = pick(luck,7);

document.getElementById("item").textContent = pick(items,8);

document.getElementById("color").textContent = pick(colors,9);

document.getElementById("number").textContent = pick(numbers,10);

document.getElementById("quote").textContent = pick(quotes,11);

// -------------------------------
// 다시 뽑기
// -------------------------------

const btn = document.getElementById("refreshBtn");

btn.addEventListener("click", () => {

    location.reload();

});