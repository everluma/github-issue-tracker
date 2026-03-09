const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

async function loadIssues(){
    
    const res = await fetch(API)

    const data = await res.json()

    displayIssues(data.data)
}

loadIssues()


// Issue Card Display function 

const container = document.getElementById("issuesContainer");

function displayIssues(issues){
    container.innerHTML = "";

    issues.forEach(issue =>{
        const card = document.createElement("div");

        card.classList.add("issue-card");

        card.innerHTML =`
        <h3>${issue.title}</h3>

        
           <p>${issue.description}</p>

           <p>Status: ${issue.status}</p>

           <p>Author: ${issue.author}</p>

           <p>Priority: ${issue.priority}</p>

            <p>Laber: ${issue.label}</p>

            <p>${issue.createdAt}</p>
        `;

        container.appendChild(card)
    });
}


// open/ closed border 

card.style.borderTop = issue.status === "open"
?"5px solid green"
:"5px solid purple";