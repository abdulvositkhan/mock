const testId = localStorage.getItem("testId");
const form = document.getElementById("testForm");

let answers = {};
let timeLeft = 60 * 60; // 60 minut

// TIMER
setInterval(() => {
  if (timeLeft <= 0) {
    submitTest();
    return;
  }
  timeLeft--;
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  document.getElementById("timer").innerText =
    `${m}:${s < 10 ? "0" : ""}${s}`;
}, 1000);

// TESTNI YUKLASH
fetch(`http://localhost:5000/api/tests/${testId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("title").innerText = data.title;

    data.questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${i + 1}. ${q.text}</p>
        ${Object.entries(q.options).map(
          ([key, val]) =>
            `<label>
              <input type="radio" name="q${i}" value="${key}"
              onchange="answers[${i}]='${key}'">
              ${key}) ${val}
            </label><br>`
        ).join("")}
      `;
      form.appendChild(div);
    });
  });

// TOPSHIRISH
async function submitTest() {
  const res = await fetch("http://localhost:5000/api/tests/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      testId,
      answers
    })
  });

  const data = await res.json();

  localStorage.setItem("score", data.score);
  localStorage.setItem("message", data.message);

  window.location.href = "result.html";
}
