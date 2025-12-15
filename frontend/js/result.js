const score = localStorage.getItem("score");
const message = localStorage.getItem("message");

document.getElementById("score").innerText = "Ball: " + score;
document.getElementById("message").innerText = message;

if (score >= 80) {
  document.body.style.background = "#d4edda";
} else if (score >= 70) {
  document.body.style.background = "#cce5ff";
} else if (score >= 60) {
  document.body.style.background = "#fff3cd";
} else {
  document.body.style.background = "#f8d7da";
}
fetch("http://localhost:5000/api/admin/results")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("table");

    data.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.name}</td>
        <td>${r.surname}</td>
        <td>${r.testId}</td>
        <td>${r.score}</td>
        <td style="color:${r.color}">${r.message}</td>
        <td>${new Date(r.createdAt).toLocaleString()}</td>
      `;
      table.appendChild(tr);
    });
  });
