if(!localStorage.getItem("login")){
    window.location.href="index.html"
};

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const container = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");
const tabs = document.querySelectorAll(".tap");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

const spinner = document.getElementById("spinner");

// Modal Elements
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalPriority = document.getElementById("modalPriority");
const modalLabel = document.getElementById("modalLabel");
const modalDate = document.getElementById("modalDate");

let allIssues = [];



// Load Issues

async function loadIssues(){

spinner.style.display = "block";

const res = await fetch(API);
const data = await res.json();

allIssues = data.data;

displayIssues(allIssues);

spinner.style.display = "none";

}

loadIssues();



// Display Issues

function displayIssues(issues){

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

<p><small>${new Date(issue.createdAt).toLocaleDateString()}</small></p>

`;

// Card Click → Modal Open

card.addEventListener("click", () => {

modal.style.display = "flex";

modalTitle.textContent = issue.title;
modalDescription.textContent = issue.description;
modalStatus.textContent = issue.status;
modalAuthor.textContent = issue.author;
modalPriority.textContent = issue.priority;
modalLabel.textContent = issue.label;
modalDate.textContent = new Date(issue.createdAt).toLocaleDateString();

});

container.appendChild(card);

});

}



// Tab Filter

tabs.forEach(tab => {

tab.addEventListener("click", () => {

tabs.forEach(t => t.classList.remove("active"));

tab.classList.add("active");

const status = tab.dataset.status;

if(status === "all"){

displayIssues(allIssues);

}else{

const filtered = allIssues.filter(issue => issue.status === status);

displayIssues(filtered);

}

});

});



// Search Function

searchBtn.addEventListener("click", async () => {

const text = searchInput.value.trim();

if(!text) return;

spinner.style.display = "block";

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data = await res.json();

displayIssues(data.data);

spinner.style.display = "none";

});



// Close Modal

closeModal.addEventListener("click", () => {

modal.style.display = "none";

});