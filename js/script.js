const url_base = 'https://626c364a5267c14d566e8d8a.mockapi.io/';
const endpoint = "jobs"
const queryId = (id) => document.getElementById(id)
let page = 1

// REQUESTS
const getData = (page) => {
    fetch(`${url_base}${endpoint}?page=${page}&limit=6`)
        .then(response => response.json())
        .then(data => renderJobs(data))
            /* for(const obj of data){
                renderJobs(obj)
            }
        } */
        .catch(err => console.log(err))
}

setTimeout(()=>{
    getData(page)
    queryId("spinner").classList.add('hidden')
},2000)

const jobsDetail = (id) => {
    fetch(`${url_base}${endpoint}/${id}`)
    .then(res => res.json())
        .then(res => {
            renderDetails(res)
        })
        .catch(err => console.log(err))
}


const renderDetails = (jobs) => { // renderiza todos los productos que reciba
    queryId("cardsContainer").innerHTML = "" // limpio primero mi contenedor, para renderizar luego, eso se hace constantemente en el proyecto
    const {name, description, location, category, seniority} = jobs
    queryId("spinner").classList.remove('hidden')
    setTimeout(()=>{
        queryId("buttonContainer-next-prev").innerHTML=""
        queryId("spinner").classList.add('hidden')
        queryId("cardsContainer").innerHTML = `
        <div class="detailCard">
            <img class="imgCardDetails" src="./img/job.png"alt="${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-description"><b>Job's description: </b>${description}</p>
                <p class="card-location"><b>Location: </b>${location}</p>
                <p class="card-category"><b> Category: </b>${category}</p>
                <p class="card-seniority"><b> Seniority: </b>${seniority}</p>
            </div>
            <div class="btn-container-DeletandEdit">
                <button class="deleteJobs">Delete</button>
                <button class="editJobs">Edit</button>
            </div>
        </div>         
    `
    },2000)
    }

/* getData(page) */

const renderJobs = (data) => { // renderiza todos los productos que reciba
    for(const {name, description, location, category, id, seniority} of data){
    queryId("cardsContainer").innerHTML +=`
        <div class="card">
            <img src=""> 
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-description">${description}</p>
                <p class="card-location"><b>Location:<b> ${location}</p>
                    <div class="card-cat-sen">
                        <p class="card-category span">${category}</p>
                        <p class="card-seniority span">${seniority}</p>
                    </div>
            </div>
            <button class="btnSeeDet" onclick="jobsDetail(${id})">See Details</button>
        </div>         
    `
    }
}


//FUNCIONALIDADES EN BOTONES DE PREV Y NEXT
queryId("buttonNext").addEventListener('click',()=>{
    queryId("cardsContainer").innerHTML =""
    page++
    getData(page)
})

queryId("buttonPrev").addEventListener('click',()=>{
    if (page >1){
    queryId("cardsContainer").innerHTML =""
    page--
    getData(page)}
})