const url_base = 'https://626c364a5267c14d566e8d8a.mockapi.io/';
const endpoint = "jobs"
const queryId = (id) => document.getElementById(id)

// REQUESTS
const getData = () => {
    fetch(`${url_base}${endpoint}`)
        .then(response => response.json())
        .then(data => renderJobs(data))
            /* for(const obj of data){
                renderJobs(obj)
            }
        } */
        .catch(err => console.log(err))
}

getData()

const renderJobs = (data) => { // renderiza todos los productos que reciba
    for(const {name, description, location, category, id, seniority} of data){
    //queryId("main").innerHTML = "" // limpio primero mi contenedor, para renderizar luego, eso se hace constantemente en el proyecto
    queryId("main").innerHTML +=`
        <div class="card">
            <img src=""> 
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-description">${description}</p>
                <p class="card-location">Location: ${location}</p>
                <span class="card-category">${category}</span>
                <span class="card-seniority">${seniority}</span>
            </div>
            <button class="btn" onclick="productDetail(${id})">See Details</button>
        </div>         
    `
    }
}