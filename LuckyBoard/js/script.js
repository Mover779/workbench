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
// 오늘 날짜를 이용한 Seed 생성 (최초 결과 확인 시 기본값)
// -------------------------------

const seed = Number(
    `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`
);

// 간단한 의사 난수 (seed + index 기반)
function seededRandom(index) {

    const x = Math.sin(seed + index) * 10000;

    return x - Math.floor(x);

}

function seededPick(arr, index) {

    return arr[Math.floor(seededRandom(index) * arr.length)];

}

// 진짜 랜덤 선택 (다시 뽑기용)
function randomPick(arr) {

    return arr[Math.floor(Math.random() * arr.length)];

}

// -------------------------------
// 데이터
// -------------------------------

// 종합 운세 점수 → 상세 설명
const scoreInfo = [
    { score: "97점", desc: "거의 모든 부분에서 순조로운 최고의 하루입니다. 자신감을 가지고 하고 싶은 일을 밀어붙여 보세요." },
    { score: "95점", desc: "전반적으로 매우 좋은 흐름이 이어지는 날입니다. 새로운 도전을 시작하기에도 좋습니다." },
    { score: "92점", desc: "안정적이고 긍정적인 기운이 감도는 하루입니다. 주변 사람들과의 관계도 원만하게 흘러갑니다." },
    { score: "89점", desc: "크고 작은 행운이 골고루 따라오는 날입니다. 여유를 갖고 하나씩 처리해 나가면 좋습니다." },
    { score: "85점", desc: "무난하면서도 은근히 좋은 일이 생기는 하루입니다. 평소보다 조금 더 적극적으로 움직여보세요." },
    { score: "81점", desc: "평범하지만 꾸준한 노력이 결실로 이어지는 날입니다. 침착하게 계획대로 진행해보세요." },
    { score: "78점", desc: "약간의 굴곡이 있을 수 있지만 큰 문제는 없는 하루입니다. 서두르지 않는 것이 중요합니다." },
    { score: "74점", desc: "다소 힘이 빠질 수 있는 날이지만, 무리하지 않고 페이스를 조절하면 무난하게 지나갑니다." }
];

const scores = scoreInfo.map((s) => s.score);

const scoreDescMap = {};

scoreInfo.forEach((s) => {

    scoreDescMap[s.score] = s.desc;

});

// (참고용) 기존 종합 운세 코멘트 - overallComment 문구로 사용
const comments = [

    "오늘은 뜻밖의 기회가 찾아올 수 있습니다.",

    "천천히 움직일수록 좋은 결과를 얻습니다.",

    "작은 선택 하나가 큰 행운으로 이어질 수 있습니다.",

    "새로운 만남이 좋은 변화를 가져옵니다.",

    "조급함보다 여유가 더 큰 힘을 발휘합니다.",

    "오늘은 자신을 믿는 것이 최고의 행운입니다."

];

// 별자리 목록 (기간 정보 포함)
// ※ 이 배열의 순서는 오하아사(おはよう朝日です) 공식 데이터의 horoscope_st 코드(01~12) 순서와 동일합니다.
//   01:양자리(おひつじ座) 02:황소자리(おうし座) 03:쌍둥이자리(ふたご座) 04:게자리(かに座)
//   05:사자자리(しし座) 06:처녀자리(おとめ座) 07:천칭자리(てんびん座) 08:전갈자리(さそり座)
//   09:사수자리(いて座) 10:염소자리(やぎ座) 11:물병자리(みずがめ座) 12:물고기자리(うお座)
const zodiacInfo = [
    { name: "양자리",     period: "3월 21일 ~ 4월 19일" },
    { name: "황소자리",   period: "4월 20일 ~ 5월 20일" },
    { name: "쌍둥이자리", period: "5월 21일 ~ 6월 21일" },
    { name: "게자리",     period: "6월 22일 ~ 7월 22일" },
    { name: "사자자리",   period: "7월 23일 ~ 8월 22일" },
    { name: "처녀자리",   period: "8월 23일 ~ 9월 22일" },
    { name: "천칭자리",   period: "9월 23일 ~ 10월 22일" },
    { name: "전갈자리",   period: "10월 23일 ~ 11월 21일" },
    { name: "사수자리",   period: "11월 22일 ~ 12월 21일" },
    { name: "염소자리",   period: "12월 22일 ~ 1월 19일" },
    { name: "물병자리",   period: "1월 20일 ~ 2월 18일" },
    { name: "물고기자리", period: "2월 19일 ~ 3월 20일" }
];

// 별자리 이름 목록 (드롭박스용)
const zodiacSigns = zodiacInfo.map((z) => z.name);

// 별자리 이름 → 기간 빠른 조회
const zodiacPeriodMap = {};

zodiacInfo.forEach((z) => {

    zodiacPeriodMap[z.name] = z.period;

});

// 별자리 이름 → 오하아사 horoscope_st 코드 ("01" ~ "12")
function getHoroscopeCode(zodiacName) {

    const index = zodiacSigns.indexOf(zodiacName);

    if (index === -1) return null;

    return String(index + 1).padStart(2, "0");

}

// 띠 목록
const animalSigns = [
    "쥐띠",
    "소띠",
    "호랑이띠",
    "토끼띠",
    "용띠",
    "뱀띠",
    "말띠",
    "양띠",
    "원숭이띠",
    "닭띠",
    "개띠",
    "돼지띠"
];

const animalLevels = [

    "대길",

    "좋음",

    "평온",

    "무난",

    "주의"

];

// 띠 운세 설명 템플릿
const animalDescTemplates = [

    "{name}는 오늘 금전운이 상승하는 흐름입니다.",

    "{name}는 가족이나 지인과의 시간이 행운을 가져다줍니다.",

    "{name}는 건강 관리에 신경 쓰면 더 큰 복이 옵니다.",

    "{name}는 뜻밖의 좋은 소식이 들려올 수 있습니다.",

    "{name}는 침착하게 대응하면 좋은 결과를 얻습니다.",

    "{name}는 오늘 하루 여유를 가지면 운이 트입니다.",

    "{name}는 새로운 인연이 찾아올 가능성이 높습니다.",

    "{name}는 노력한 만큼 결실을 맺는 하루입니다."

];

// 타로 카드 → 상세 설명
const tarotInfo = [
    { name: "The Star", desc: "희망과 회복을 상징하는 카드입니다. 지쳐 있었더라도 오늘은 손대는 일이 유리해집니다." },
    { name: "The Sun", desc: "활기와 성장을 뜻하는 카드입니다. 자신감을 가지고 적극적으로 나서기 좋은 하루입니다." },
    { name: "The World", desc: "완성과 성취를 의미하는 카드입니다. 무언가를 마무리하기에 좋은 타이밍입니다." },
    { name: "The Magician", desc: "창조와 도전을 의미하는 카드입니다. 새로운 아이디어가 좋은 결과로 이어집니다." },
    { name: "Wheel of Fortune", desc: "변화와 순환을 의미하는 카드입니다. 예상치 못한 행운이 찾아올 수 있습니다." },
    { name: "Strength", desc: "내적인 용기와 인내를 의미하는 카드입니다. 차분함이 오늘의 큰 무기가 됩니다." },
    { name: "Justice", desc: "공정함과 결단을 의미하는 카드입니다. 균형 잡힌 판단이 좋은 결과를 만듭니다." },
    { name: "The Fool", desc: "새로운 시작과 순수함을 의미하는 카드입니다. 가벼운 마음으로 발걸음을 떼기 좋은 날입니다." }
];

const tarot = tarotInfo.map((t) => t.name);

const tarotDescMap = {};

tarotInfo.forEach((t) => {

    tarotDescMap[t.name] = t.desc;

});

// 오늘의 뽑기 결과 → 상세 설명
const luckInfo = [
    { level: "대길", desc: "무엇을 하더라도 잘 풀리는 날입니다. 적극적으로 움직이는 것이 유리합니다." },
    { level: "중길", desc: "전반적으로 좋은 상승운이 따르는 날입니다. 긍정적인 마음을 가지면 더 좋은 결과를 얻습니다." },
    { level: "소길", desc: "작은 행운이 여기저기서 찾아올 수 있습니다. 주변을 유심히 살펴보세요." },
    { level: "길", desc: "큰 문제 없이 무난하게 지내는 날입니다. 평정심을 유지하세요." },
    { level: "평", desc: "특별한 굴곡 없는 평온한 하루입니다. 무리하지 않고 천천히 나아가세요." }
];

const luck = luckInfo.map((l) => l.level);

const luckDescMap = {};

luckInfo.forEach((l) => {

    luckDescMap[l.level] = l.desc;

});

// 행운 아이템 → 상세 설명
const itemsInfo = [
    { name: "화이트 셔츠", desc: "깔끔하고 단정한 이미지가 오늘의 행운을 더해줍니다." },
    { name: "텀블러", desc: "수분 섭취와 건강 관리가 하루의 컨디션을 지켜줍니다." },
    { name: "노트", desc: "떠오르는 아이디어를 적어두면 좋은 기회로 이어질 수 있습니다." },
    { name: "이어폰", desc: "좋아하는 음악과 함께라면 지친 하루도 가볍게 풀립니다." },
    { name: "향수", desc: "은은한 향기가 대인관계에 좋은 인상을 남깁니다." },
    { name: "손목시계", desc: "시간 관리에 신경 쓰면 중요한 약속이나 일이 순조롭게 풀립니다." },
    { name: "커피", desc: "따뜻한 한 잔의 여유가 하루의 활력을 더해줍니다." },
    { name: "책", desc: "새로운 지식이나 정보가 뜻밖의 행운으로 이어집니다." },
    { name: "볼펜", desc: "메모하고 기록하는 습관이 좋은 결과를 만듭니다." },
    { name: "에코백", desc: "실용적인 준비성이 하루를 든든하게 받쳐줍니다." }
];

const items = itemsInfo.map((i) => i.name);

const itemDescMap = {};

itemsInfo.forEach((i) => {

    itemDescMap[i.name] = i.desc;

});

// 행운 컬러 → 상세 설명
const colorsInfo = [
    { name: "Sky Blue", desc: "마음을 안정시키고 맑은 판단을 도와주는 컬러입니다." },
    { name: "Lavender", desc: "포용과 휴식을 상징하여 스트레스를 덜어줍니다." },
    { name: "Mint", desc: "상쾌한 기운이 새로운 아이디어를 불러옵니다." },
    { name: "Coral", desc: "활력 있는 에너지가 대인관계에 좋은 인상을 남깁니다." },
    { name: "Ivory", desc: "부드럽고 온화한 느낌이 주변에 신뢰감을 줍니다." },
    { name: "Emerald", desc: "재물운과 성장을 상징하는 생기 있는 컬러입니다." },
    { name: "Navy", desc: "안정감과 신뢰감을 더해주는 차분하고 진중한 컬러입니다." },
    { name: "Rose Pink", desc: "따뜻하고 사랑스러운 매력을 표현해주는 컬러입니다." }
];

const colors = colorsInfo.map((c) => c.name);

const colorDescMap = {};

colorsInfo.forEach((c) => {

    colorDescMap[c.name] = c.desc;

});

// 행운 숫자 → 상세 설명 ({n} 은 선택한 숫자로 치환)
const numberDescTemplates = [

    "오늘은 숫자 {n}이 당신에게 행운을 가져다줍니다. 이 숫자와 관련된 일에 주의를 기울여보세요.",

    "{n}과 관련된 선택이나 순간에서 좋은 기운이 따라옵니다.",

    "숫자 {n}을 기억해두면 뜻밖의 도움이 될 수 있습니다.",

    "오늘은 {n}이 떠오르는 순간마다 작은 행운이 함께합니다."

];

const numbers = [

    1,2,3,5,7,8,9,11,13,15,18,21,24,27,31,33,42

];

// -------------------------------
// 오늘의 운세 종합평 (모든 운세를 하나로 요약)
// -------------------------------

// 이번 조회에서 나온 각 운세 결과를 모아두는 상태 (종합평 생성에 사용)
const currentFortuneState = {
    score: null,       // 종합 운세 점수 (숫자)
    animalLevel: null,  // 띠 운세 등급
    luckLevel: null,    // 오늘의 뽑기 등급
    colorName: null,    // 행운 컬러
    numberValue: null,  // 행운 숫자
    ohaasaRank: null,   // 오하아사 순위 (숫자, 1~12)
    ohaasaZodiac: null  // 오하아사 대상 별자리 이름
};

// 등급/점수를 -2 ~ +2 사이의 톤 점수로 환산 (양수일수록 좋은 흐름)
function scoreToTone(score) {

    if (score === null) return 0;

    if (score >= 90) return 2;
    if (score >= 82) return 1;
    if (score >= 76) return 0;

    return -1;

}

function animalLevelToTone(level) {

    const map = { "대길": 2, "좋음": 1, "평온": 0, "무난": 0, "주의": -1 };

    return map[level] ?? 0;

}

function luckLevelToTone(level) {

    const map = { "대길": 2, "중길": 1, "소길": 0, "길": 0, "평": -1 };

    return map[level] ?? 0;

}

function ohaasaRankToTone(rank) {

    if (rank === null) return 0;

    if (rank <= 3) return 2;
    if (rank <= 6) return 1;
    if (rank <= 9) return 0;

    return -1;

}

// 종합 톤(총점)에 따른 전체 분위기 문구
function toneToOverallPhrase(tone) {

    if (tone >= 5) return "모든 운세가 고르게 좋은, 오늘 하루 자신감을 가져도 되는 최고의 흐름";
    if (tone >= 2) return "전반적으로 긍정적인 기운이 감도는, 무난하게 좋은 흐름";
    if (tone >= -1) return "특별한 굴곡 없이 평온하게 흘러가는 흐름";

    return "다소 조심스러운 부분이 있지만 침착하게 대응하면 무난히 넘어갈 흐름";

}

// 모아둔 결과값을 바탕으로 "오늘의 운세 종합평" 한 줄을 생성해 화면에 표시
function renderSummaryVerdict() {

    const s = currentFortuneState;

    const tones = [
        scoreToTone(s.score),
        animalLevelToTone(s.animalLevel),
        luckLevelToTone(s.luckLevel),
        ohaasaRankToTone(s.ohaasaRank)
    ];

    const totalTone = tones.reduce((sum, t) => sum + t, 0);

    const overallPhrase = toneToOverallPhrase(totalTone);

    const zodiacPart = (s.ohaasaZodiac && s.ohaasaRank)
        ? `오하아사 기준 ${s.ohaasaZodiac} 순위는 ${s.ohaasaRank}위, `
        : "";

    const scorePart = s.score !== null ? `종합 운세 ${s.score}점, ` : "";

    const animalPart = s.animalLevel ? `띠 운세는 ${s.animalLevel}, ` : "";

    const luckPart = s.luckLevel ? `오늘의 뽑기는 ${s.luckLevel}` : "";

    const tailPart = (s.colorName && s.numberValue)
        ? ` 행운의 컬러 ${s.colorName}와 숫자 ${s.numberValue}를 함께 기억해두면 도움이 됩니다.`
        : "";

    const sentence =
        `${scorePart}${zodiacPart}${animalPart}${luckPart}로 이어지며, ${overallPhrase}입니다.${tailPart}`;

    summaryVerdictEl.textContent = sentence;

}

// -------------------------------
// 오하아사(おはよう朝日です) 공식 별자리 운세 연동
// -------------------------------

// 오하아사 공식 데이터 (CORS 우회를 위해 공개 프록시 경유)
const OHAASA_DATA_URL = "https://www.asahi.co.jp/data/ohaasa2020/horoscope.json";
const TRANSLATE_API = "https://api.mymemory.translated.net/get";

// 오늘 날짜 문자열 (YYYYMMDD) - localStorage 캐시 키에 사용
const todayKey = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

const OHAASA_JSON_CACHE_KEY = `luckyboard_ohaasa_json_${todayKey}`;
const OHAASA_TRANSLATE_CACHE_KEY = `luckyboard_ohaasa_translate_${todayKey}`;

// 같은 날 같은 별자리에 대해 반복 호출을 줄이기 위한 메모리 캐시 (탭을 새로고침해도 아래 localStorage 캐시가 있어 빠르게 복원됨)
const ohaasaCache = {};

// 지정한 시간(ms) 내에 응답이 없으면 중단하는 fetch
function fetchWithTimeout(url, ms, options) {

    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), ms);

    return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));

}

// 오하아사 JSON을 localStorage에서 오늘 날짜 기준으로 캐시 조회
function readOhaasaJsonCache() {

    try {

        const cached = localStorage.getItem(OHAASA_JSON_CACHE_KEY);

        if (!cached) return null;

        return JSON.parse(cached);

    } catch (err) {

        return null;

    }

}

function writeOhaasaJsonCache(data) {

    try {

        localStorage.setItem(OHAASA_JSON_CACHE_KEY, JSON.stringify(data));

    } catch (err) {

        // localStorage 용량 초과 등은 무시 (캐시는 선택 사항)

    }

}

// 이미 진행 중인 요청이 있으면 그 Promise를 재사용 (프리로드 + 버튼 클릭이 겹쳐도 중복 요청 방지)
let ohaasaJsonInFlight = null;

// 오하아사 JSON을 여러 CORS 프록시로 동시에 요청해 가장 먼저 응답한 결과를 사용 (속도 개선)
function fetchOhaasaJson() {

    // 1. 오늘 날짜 기준 localStorage 캐시가 있으면 네트워크 요청 없이 즉시 반환
    const cached = readOhaasaJsonCache();

    if (cached) return Promise.resolve(cached);

    // 2. 이미 진행 중인 요청이 있다면 새 요청을 만들지 않고 기존 Promise를 그대로 반환
    if (ohaasaJsonInFlight) return ohaasaJsonInFlight;

    // 3. 여러 프록시를 동시에 요청해 가장 빠른 응답을 채택 (각 요청은 제한 시간 안에 응답 없으면 포기)
    //    r.jina.ai가 체감상 가장 빠르고 안정적이라 짧은 타임아웃으로 먼저 시도하고,
    //    나머지 프록시들도 동시에 대기시켜 어느 하나라도 먼저 성공하면 그 결과를 사용한다.
    const attempts = [

        fetchWithTimeout(
            "https://r.jina.ai/" + OHAASA_DATA_URL,
            9000
        ).then(async (res) => {

            if (!res.ok) throw new Error("r.jina.ai 응답 오류");

            const text = await res.text();

            const start = text.indexOf("[{");

            if (start === -1) throw new Error("r.jina.ai 데이터 형식 오류");

            return JSON.parse(text.slice(start));

        }),

        fetchWithTimeout(
            "https://api.allorigins.win/raw?url=" + encodeURIComponent(OHAASA_DATA_URL),
            9000
        ).then((res) => {

            if (!res.ok) throw new Error("allorigins/raw 응답 오류");

            return res.json();

        }),

        fetchWithTimeout(
            "https://api.allorigins.win/get?url=" + encodeURIComponent(OHAASA_DATA_URL),
            9000
        ).then(async (res) => {

            if (!res.ok) throw new Error("allorigins/get 응답 오류");

            const wrapped = await res.json();

            if (!wrapped || !wrapped.contents) throw new Error("allorigins/get 데이터 없음");

            return JSON.parse(wrapped.contents);

        }),

        fetchWithTimeout(
            "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(OHAASA_DATA_URL),
            9000
        ).then((res) => {

            if (!res.ok) throw new Error("codetabs 응답 오류");

            return res.json();

        })

    ];

    ohaasaJsonInFlight = promiseAny(attempts)
        .then((data) => {

            writeOhaasaJsonCache(data);

            return data;

        })
        .finally(() => {

            // 성공/실패 여부와 관계없이 진행 중 상태 해제 (실패 시 다음 호출에서 재시도 가능)
            ohaasaJsonInFlight = null;

        });

    return ohaasaJsonInFlight;

}

// Promise.any 폴리필 (가장 먼저 성공하는 Promise 값을 반환, 전부 실패 시 에러)
function promiseAny(promises) {

    return new Promise((resolve, reject) => {

        let remaining = promises.length;

        const errors = [];

        promises.forEach((p) => {

            Promise.resolve(p).then(resolve).catch((err) => {

                errors.push(err);

                remaining -= 1;

                if (remaining === 0) {

                    reject(new Error("모든 프록시 요청이 실패했습니다: " + errors.map((e) => e.message).join(", ")));

                }

            });

        });

    });

}

// 번역 결과를 localStorage에 캐시 (같은 날 동일 원문 재번역 방지 → 속도 개선)
function readTranslateCache() {

    try {

        const cached = localStorage.getItem(OHAASA_TRANSLATE_CACHE_KEY);

        return cached ? JSON.parse(cached) : {};

    } catch (err) {

        return {};

    }

}

function writeTranslateCache(map) {

    try {

        localStorage.setItem(OHAASA_TRANSLATE_CACHE_KEY, JSON.stringify(map));

    } catch (err) {

        // 캐시 실패는 무시

    }

}

// 일본어 → 한국어 번역 (실패 시 원문 그대로 반환, 5초 제한, 결과는 localStorage에 캐시)
async function translateJaToKo(text) {

    if (!text || !text.trim()) return "";

    const translateCache = readTranslateCache();

    if (translateCache[text]) return translateCache[text];

    try {

        const url = `${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=ja|ko`;

        const res = await fetchWithTimeout(url, 5000);

        if (!res.ok) throw new Error("translate api error");

        const json = await res.json();

        const translated = json?.responseData?.translatedText;

        if (!translated || /^PLEASE SELECT|INVALID/i.test(translated)) {

            return text;

        }

        translateCache[text] = translated;

        writeTranslateCache(translateCache);

        return translated;

    } catch (err) {

        console.warn("번역 실패, 원문을 사용합니다.", err);

        return text;

    }

}

// 코멘트 + 추천 장소를 구분자로 합쳐 번역 API를 한 번만 호출 (속도 개선: 요청 2회 → 1회)
async function translateCommentAndPlace(comment, place) {

    const SEP = " ||| ";

    if (!comment && !place) return { comment: "", place: "" };

    if (!place) return { comment: await translateJaToKo(comment), place: "" };

    if (!comment) return { comment: "", place: await translateJaToKo(place) };

    const combined = `${comment}${SEP}${place}`;

    const translatedCombined = await translateJaToKo(combined);

    // 구분자 주변에 번역기가 문자를 추가/변형하는 경우(예: "||||")까지 허용해 넉넉하게 분리
    const parts = translatedCombined.split(/\|{2,}/);

    if (parts.length >= 2) {

        return {

            comment: parts[0].trim(),

            place: parts.slice(1).join(" ").replace(/\|/g, "").trim()

        };

    }

    // 구분자가 유지되지 않은 경우 코멘트/장소를 각각 별도로 재번역
    const [fallbackComment, fallbackPlace] = await Promise.all([
        translateJaToKo(comment),
        translateJaToKo(place)
    ]);

    return { comment: fallbackComment, place: fallbackPlace };

}

// 오하아사 JSON에서 오늘(가장 최신) 데이터를 선택
function pickTodayEntry(list) {

    if (!Array.isArray(list) || list.length === 0) return null;

    const todayStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    const exact = list.find((entry) => entry.onair_date === todayStr);

    if (exact) return exact;

    // 정확히 일치하는 날짜가 없으면 가장 최근(가장 큰 onair_date) 데이터를 사용
    return list.slice().sort((a, b) => Number(b.onair_date) - Number(a.onair_date))[0];

}

// horoscope_text (탭 구분) → { comment, place }
function parseHoroscopeText(text) {

    if (!text) return { comment: "", place: "" };

    const parts = text.split("\t");

    const place = (parts[parts.length - 1] || "").trim();

    const comment = parts
        .slice(0, parts.length - 1)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
        .join(" ");

    return { comment, place };

}

// 오하아사 공식 사이트에서 오늘의 별자리 순위/운세를 가져와 카드에 표시
async function renderOhaasaFortune() {

    const name = zodiacSelect.value;

    zodiacLabelEl.textContent = name;

    zodiacPeriodEl.textContent = zodiacPeriodMap[name] ? `📅 ${zodiacPeriodMap[name]}` : "";

    const code = getHoroscopeCode(name);

    ohaasaRankEl.textContent = "-";
    ohaasaCommentEl.textContent = "";
    ohaasaPlaceEl.textContent = "";
    ohaasaStatusEl.textContent = "⏳ 오하아사 공식 데이터를 불러오는 중...";

    if (!code) {

        ohaasaStatusEl.textContent = "";
        ohaasaCommentEl.textContent = "별자리 정보를 확인할 수 없습니다.";

        return;

    }

    // 오늘 날짜 + 별자리 조합으로 캐시 확인 (같은 날 재조회 최소화)
    const cacheKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${code}`;

    if (ohaasaCache[cacheKey]) {

        applyOhaasaResult(ohaasaCache[cacheKey]);

        return;

    }

    try {

        const data = await fetchOhaasaJson();

        const entry = pickTodayEntry(data);

        if (!entry || !Array.isArray(entry.detail)) {

            throw new Error("오하아사 데이터 형식이 올바르지 않습니다.");

        }

        const detail = entry.detail.find((d) => d.horoscope_st === code);

        if (!detail) {

            throw new Error("해당 별자리의 운세 데이터를 찾을 수 없습니다.");

        }

        const { comment, place } = parseHoroscopeText(detail.horoscope_text);

        const { comment: translatedComment, place: translatedPlace } = await translateCommentAndPlace(comment, place);

        const result = {

            rank: detail.ranking_no,

            comment: translatedComment,

            place: translatedPlace,

            onairDate: entry.onair_date

        };

        ohaasaCache[cacheKey] = result;

        applyOhaasaResult(result);

    } catch (err) {

        console.error("오하아사 데이터를 불러오는 중 오류가 발생했습니다.", err);

        ohaasaStatusEl.textContent = "⚠️ 오하아사 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

        ohaasaCommentEl.textContent = "네트워크 상태를 확인한 뒤 [오늘의 종합 운세 보기] 버튼을 다시 눌러주세요.";

        ohaasaRankEl.textContent = "-";

        currentFortuneState.ohaasaRank = null;

        currentFortuneState.ohaasaZodiac = null;

        // 오하아사 데이터 없이도 확보된 정보로 종합평을 갱신
        renderSummaryVerdict();

    }

}

// 오하아사 결과를 화면에 반영
function applyOhaasaResult(result) {

    ohaasaRankEl.textContent = result.rank ? `${result.rank}위` : "-";

    ohaasaCommentEl.textContent = result.comment || "오늘의 운세 코멘트를 불러오지 못했습니다.";

    ohaasaPlaceEl.textContent = result.place ? `📍 오늘의 추천 장소: ${result.place}` : "";

    const dateStr = formatOnairDate(result.onairDate);

    ohaasaStatusEl.textContent = dateStr ? `✅ ${dateStr} 기준 오하아사 공식 데이터` : "✅ 오하아사 공식 데이터 반영 완료";

    currentFortuneState.ohaasaRank = result.rank ? Number(result.rank) : null;

    currentFortuneState.ohaasaZodiac = zodiacSelect.value;

    // 오하아사 데이터가 반영된 뒤 종합평을 최신 정보로 다시 계산
    renderSummaryVerdict();

}

// "20260710" → "2026.07.10"
function formatOnairDate(dateStr) {

    if (!dateStr || dateStr.length !== 8) return "";

    return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;

}

// 페이지 진입 직후(사용자가 별자리/띠를 고르는 동안) 백그라운드로 오하아사 JSON을 미리 받아둔다.
// → [오늘의 종합 운세 보기] 버튼 클릭 시 이미 캐시되어 있어 대기 시간이 크게 줄어든다.
function preloadOhaasaJson() {

    fetchOhaasaJson().catch((err) => {

        // 프리로드 실패는 조용히 무시 (버튼 클릭 시 다시 시도됨)
        console.warn("오하아사 데이터 사전 로딩 실패 (버튼 클릭 시 재시도됩니다)", err);

    });

}

// -------------------------------
// 엘리먼트 참조
// -------------------------------

const zodiacSelect = document.getElementById("zodiacSelect");
const animalSelect = document.getElementById("animalSelect");

const viewBtn = document.getElementById("viewFortuneBtn");

const selectWarning = document.getElementById("selectWarning");
const resultPlaceholder = document.getElementById("resultPlaceholder");
const resultSection = document.getElementById("resultSection");

const zodiacLabelEl = document.getElementById("zodiacLabel");
const animalLabelEl = document.getElementById("animalLabel");
const animalEl = document.getElementById("animal");
const zodiacPeriodEl = document.getElementById("zodiacPeriod");
const animalDescEl = document.getElementById("animalDesc");

const ohaasaRankEl = document.getElementById("ohaasaRank");
const ohaasaCommentEl = document.getElementById("ohaasaComment");
const ohaasaPlaceEl = document.getElementById("ohaasaPlace");
const ohaasaStatusEl = document.getElementById("ohaasaStatus");

const tarotDescEl = document.getElementById("tarotDesc");
const luckDescEl = document.getElementById("luckDesc");
const itemDescEl = document.getElementById("itemDesc");
const colorDescEl = document.getElementById("colorDesc");
const numberDescEl = document.getElementById("numberDesc");

const summaryVerdictEl = document.getElementById("summaryVerdict");

// -------------------------------
// 드롭박스(별자리 / 띠) 옵션 채우기
// -------------------------------

function fillSelect(selectEl, list) {

    list.forEach((label) => {

        const option = document.createElement("option");

        option.value = label;
        option.textContent = label;

        selectEl.appendChild(option);

    });

}

// 별자리 드롭박스는 옵션 안에 기간 정보도 함께 표시 (예: 양자리 (3월 21일 ~ 4월 19일))
function fillZodiacSelect(selectEl, list) {

    list.forEach((z) => {

        const option = document.createElement("option");

        option.value = z.name;
        option.textContent = `${z.name} (${z.period})`;

        selectEl.appendChild(option);

    });

}

fillZodiacSelect(zodiacSelect, zodiacInfo);
fillSelect(animalSelect, animalSigns);

// 사용자가 별자리/띠를 선택하는 동안 오하아사 데이터를 미리 백그라운드에서 로딩 시작
preloadOhaasaJson();

// 로컬 저장소에 이전 선택값이 있으면 드롭박스 값만 복원 (결과는 버튼을 눌러야 표시됨)
const savedZodiac = localStorage.getItem("luckyboard_zodiac");
const savedAnimal = localStorage.getItem("luckyboard_animal");

if (savedZodiac) {

    zodiacSelect.value = savedZodiac;

}

if (savedAnimal) {

    animalSelect.value = savedAnimal;

}

// -------------------------------
// 결과 렌더링 함수들
// -------------------------------

function renderAnimalFortune() {

    const name = animalSelect.value;

    animalLabelEl.textContent = name;

    const level = randomPick(animalLevels);

    animalEl.textContent = level;

    currentFortuneState.animalLevel = level;

    const template = randomPick(animalDescTemplates);

    animalDescEl.textContent = template.replace("{name}", name);

}

// 타로 상세 설명 렌더링
function renderTarotDesc(name) {

    tarotDescEl.textContent = tarotDescMap[name] || "";

}

// 오늘의 뽑기 상세 설명 렌더링
function renderLuckDesc(level) {

    luckDescEl.textContent = luckDescMap[level] || "";

}

// 행운 아이템 상세 설명 렌더링
function renderItemDesc(name) {

    itemDescEl.textContent = itemDescMap[name] || "";

}

// 행운 컬러 상세 설명 렌더링
function renderColorDesc(name) {

    colorDescEl.textContent = colorDescMap[name] || "";

}

// 행운 숫자 상세 설명 렌더링 ({n} 치환)
function renderNumberDesc(n) {

    const template = randomPick(numberDescTemplates);

    numberDescEl.textContent = template.replace("{n}", n);

}

// 버튼을 처음 눌렀을 때 표시되는 종합 운세 (오늘 하루 기준 seed 값 사용)
function renderInitialOverallFortune() {

    const scoreValue = seededPick(scores, 1);

    document.getElementById("overallScore").textContent = scoreValue;

    document.getElementById("overallComment").textContent =
        `${seededPick(comments, 2)} ${scoreDescMap[scoreValue] || ""}`.trim();

    // 종합평 계산용: "92점" → 92 (숫자만 추출)
    currentFortuneState.score = parseInt(scoreValue, 10) || null;

    const tarotValue = seededPick(tarot, 6);

    document.getElementById("tarot").textContent = tarotValue;
    renderTarotDesc(tarotValue);

    const luckValue = seededPick(luck, 7);

    document.getElementById("luck").textContent = luckValue;
    renderLuckDesc(luckValue);

    currentFortuneState.luckLevel = luckValue;

    const itemValue = seededPick(items, 8);

    document.getElementById("item").textContent = itemValue;
    renderItemDesc(itemValue);

    const colorValue = seededPick(colors, 9);

    document.getElementById("color").textContent = colorValue;
    renderColorDesc(colorValue);

    currentFortuneState.colorName = colorValue;

    const numberValue = seededPick(numbers, 10);

    document.getElementById("number").textContent = numberValue;
    renderNumberDesc(numberValue);

    currentFortuneState.numberValue = numberValue;

}

// -------------------------------
// 선택값 유효성 검사
// -------------------------------

function isSelectionValid() {

    return Boolean(zodiacSelect.value) && Boolean(animalSelect.value);

}

// -------------------------------
// 결과 표시 / 숨김 제어
// -------------------------------

function hideResult() {

    resultSection.classList.add("hidden");

    resultPlaceholder.hidden = false;

}

function showResult() {

    resultPlaceholder.hidden = true;

    resultSection.classList.remove("hidden");

}

// 드롭박스를 바꾸면 새로 버튼을 눌러야 결과를 볼 수 있도록 다시 숨김
zodiacSelect.addEventListener("change", () => {

    localStorage.setItem("luckyboard_zodiac", zodiacSelect.value);

    selectWarning.hidden = true;

    hideResult();

});

animalSelect.addEventListener("change", () => {

    localStorage.setItem("luckyboard_animal", animalSelect.value);

    selectWarning.hidden = true;

    hideResult();

});

// -------------------------------
// [오늘의 종합 운세 보기] 버튼
// -------------------------------

viewBtn.addEventListener("click", async () => {

    if (!isSelectionValid()) {

        selectWarning.hidden = false;

        hideResult();

        return;

    }

    selectWarning.hidden = true;

    renderInitialOverallFortune();

    renderAnimalFortune();

    // 오하아사 데이터가 도착하기 전, 우선 확보된 정보만으로 종합평을 먼저 보여준다.
    renderSummaryVerdict();

    showResult();

    // 결과 영역으로 자연스럽게 스크롤 이동
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // 버튼 중복 클릭 방지 (오하아사 공식 데이터 로딩 중)
    viewBtn.disabled = true;

    const originalBtnText = viewBtn.textContent;

    viewBtn.textContent = "⏳ 오하아사 데이터 불러오는 중...";

    try {

        await renderOhaasaFortune();

    } finally {

        viewBtn.disabled = false;

        viewBtn.textContent = originalBtnText;

    }

});

// -------------------------------
// 최초 진입 시에는 결과를 숨긴 상태로 시작
// -------------------------------

hideResult();
