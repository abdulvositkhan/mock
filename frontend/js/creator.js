let questions = [];
const container = document.getElementById("questions");

function addQuestion() {
  if (questions.length >= 50) {
    alert("Testda faqat 50 ta savol bo‘lishi mumkin");
    return;
  }

  const index = questions.length;

  const div = document.createElement("div");
  div.style.border = "1px solid #ccc";
  div.style.padding = "10px";
  div.style.marginBottom = "10px";

  div.innerHTML = `
    <p><b>${index + 1}-savol</b></p>
    <input placeholder="Savol matni" id="q${index}">
    <input placeholder="A variant" id="A${index}">
    <input placeholder="B variant" id="B${index}">
    <input placeholder="C variant" id="C${index}">
    <input placeholder="D variant" id="D${index}">
    <select id="correct${index}">
      <option value="">To‘g‘ri javob</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
  `;

  container.appendChild(div);
  questions.push(index);
}

async function saveTest() {
  const testId = document.getElementById("testId").value;
  if (!testId) {
    alert("Test ID kiriting");
    return;
  }

  if (questions.length !== 50) {
    alert("Testda 50 ta savol bo‘lishi shart");
    return;
  }

  const data = questions.map(i => ({
    text: document.getElementById(`q${i}`).value,
    options: {
      A: document.getElementById(`A${i}`).value,
      B: document.getElementById(`B${i}`).value,
      C: document.getElementById(`C${i}`).value,
      D: document.getElementById(`D${i}`).value
    },
    correct: document.getElementById(`correct${i}`).value
  }));

  const res = await fetch("http://localhost:5000/api/tests/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      testId,
      createdBy: "admin",
      questions: data
    })
  });

  const result = await res.json();
  document.getElementById("msg").innerText =
    result.message || result.error;
}
