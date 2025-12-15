async function submitTest() {
  const correct = document.getElementById("correct").value;
  const resultDiv = document.getElementById("result");

  if (correct === "") {
    resultDiv.innerHTML = "Iltimos, son kiriting";
    return;
  }

  try {
    const res = await fetch("https://mock-nxdo.onrender.com/api/tests/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctAnswers: Number(correct)
      })
    });

    const data = await res.json();

    resultDiv.innerHTML = `
      Ball: ${data.score}<br/>
      Natija: ${data.result}
    `;
  } catch (err) {
    resultDiv.innerHTML = "Server bilan bog‘lanib bo‘lmadi";
  }
}
