const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

async function loadIssues(){
    
    const res = await fetch(API)

    const data = await res.json()

    displayIssue(data.data)
}

loadIssues()


// Issue Card Display function 