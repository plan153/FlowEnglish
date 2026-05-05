// main.js
let currentQuestion = null;

const sentences = [
    { ko: "나는 매일 커피를 마신다.", en: "I drink coffee every day." },
    { ko: "그는 지금 학교에 간다.", en: "He is going to school now." },
    { ko: "우리는 어제 영화를 봤다.", en: "We watched a movie yesterday." },
    { ko: "너는 영어를 잘한다.", en: "You speak English well." }
];

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function speakEnglish() {
    if (!currentQuestion) return;
    const utterance = new SpeechSynthesisUtterance(currentQuestion.en);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

function checkAnswer() {
    const input = document.getElementById('user-input').value.trim();
    const feedback = document.getElementById('feedback');
    
    if (!input) {
        feedback.innerHTML = `<span style="color:orange;">영어 문장을 입력해주세요.</span>`;
        return;
    }

    const normalizedInput = input.toLowerCase();
    const normalizedAnswer = currentQuestion.en.toLowerCase();

    if (normalizedInput === normalizedAnswer) {
        feedback.innerHTML = `<span style="color:#22c55e; font-weight:bold;">정답입니다! 🎉</span>`;
    } else {
        feedback.innerHTML = `<span style="color:#ef4444;">아쉽지만 정답은:<br><strong>${currentQuestion.en}</strong></span>`;
    }
}

function startListening() {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert("음성 인식이 지원되지 않는 브라우저입니다.");
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        document.getElementById('user-input').value = event.results[0][0].transcript;
        checkAnswer();
    };
}

function nextQuestion() {
    currentQuestion = getRandomSentence();
    document.getElementById('ko-sentence').textContent = currentQuestion.ko;
    document.getElementById('user-input').value = '';
    document.getElementById('feedback').innerHTML = '';
}

// 앱 시작
window.onload = () => {
    nextQuestion();
    console.log('%cFlowEnglish initialized!', 'color:#60a5fa; font-size:14px;');
};