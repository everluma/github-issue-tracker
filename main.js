const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const container = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");
const tabs = document.querySelectorAll(".tab");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

let allIssues = [];

 
// Load All Issues


async function loadIssues() {
  const res = await fetch(API);
  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);
}

loadIssues();



// Display Issues


function displayIssues(issues) {

  container.innerHTML = "";

  issueCount.textContent = issues.length;

  issues.forEach(issue => {

    const card = document.createElement("div");

    card.classList.add("issue-card");

    card.style.borderTop =
      issue.status === "open"
        ? "5px solid green"
        : "5px solid purple";

    card.innerHTML = `

      <h3>${issue.title}</h3>

      <p>${issue.description}</p>

      <p><strong>Status:</strong> ${issue.status}</p>

      <p><strong>Author:</strong> ${issue.author}</p>

      <p><strong>Priority:</strong> ${issue.priority}</p>

      <p><strong>Label:</strong> ${issue.label}</p>

      <p><small>${issue.createdAt}</small></p>

    `;

    container.appendChild(card);

  });

}



// Tab Filter


tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    const status = tab.dataset.status;

    if (status === "all") {

      displayIssues(allIssues);

    } else {

      const filtered = allIssues.filter(
        issue => issue.status === status
      );

      displayIssues(filtered);
    }

  });

});



// Search Function


searchBtn.addEventListener("click", async () => {

  const text = searchInput.value.trim();

  if (!text) return;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
  );

  const data = await res.json();

  displayIssues(data.data);

});