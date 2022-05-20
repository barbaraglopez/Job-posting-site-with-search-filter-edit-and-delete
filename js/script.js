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
getData(page)


const renderJobs = (data) => { // renderiza todos los productos que reciba
    for(const {name, description, location, category, id, seniority} of data){
    //queryId("main").innerHTML = "" // limpio primero mi contenedor, para renderizar luego, eso se hace constantemente en el proyecto
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
            <button class="btnSeeDet" onclick="productDetail(${id})">See Details</button>
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