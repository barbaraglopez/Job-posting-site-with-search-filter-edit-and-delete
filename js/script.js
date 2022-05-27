const url_base = 'https://626c364a5267c14d566e8d8a.mockapi.io/';
const endpoint = "jobs"
const queryId = (id) => document.getElementById(id)
let page = 1;
const inputCountry = queryId("form__select--country");
const inputSeniority = queryId("form__select--seniority");
const inputCategory = queryId("form__select--category");
const cleanTable =()=> queryId("cardsContainer").innerHTML ="" 

const handleSpinner=()=>{
    cleanTable()
    queryId("spinner").classList.remove('hidden')
}

// REQUESTS
const getData = (page) => {
    fetch(`${url_base}${endpoint}?page=${page}&limit=6`)
        .then(response => response.json())
        .then(data => renderJobs(data))
        .catch(err => console.log(err))
}

setTimeout(()=>{
    getData(page)
    queryId("spinner").classList.add('hidden')
    },1000)


/* const jobsDetail = (id) => {
    fetch(`${url_base}${endpoint}/${id}`)
    .then(res => res.json())
    .then(res => renderDetails(res))
    .catch(err => console.log(err))
} */

const getFilter = (location) => {
    fetch(`${url_base}${endpoint}`)
        .then(res => res.json())
        .then(data => renderJobs(data.location))
        .catch(err => console.log(err))
}

const deleteJob = (id) => {
    fetch(`${url_base}${endpoint}/${id}`, {
        method: "DELETE",
    })
    .finally(() => {
        cleanTable();
        queryId("spinner").classList.remove('hidden');
        setTimeout(()=>{
            getData(page)
            queryId("spinner").classList.add('hidden')
            queryId("buttonContainer-next-prev").classList.remove("hidden")
        },2000)
    })
}

const sendJob = () => {
    fetch(`${url_base}${endpoint}`,{
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(sendData())
    })
    .finally(() => console.log("termine de ejecutar el POST"))
}

//RENDERS
const renderDetails = (jobs) => { // renderiza todos los productos que reciba
    cleanTable(); // limpio primero mi contenedor, para renderizar luego, eso se hace constantemente en el proyecto
    const {name, description, location, category, seniority, id} = jobs
    queryId("spinner").classList.remove('hidden')
    setTimeout(()=>{
        queryId("buttonContainer-next-prev").classList.add("hidden")
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
                <button class="deleteJobs" id="button--DeleteJob" onclick="deleteSing(${id})">Delete</button>
                <button class="editJobs" id="button--DeleteJob" onclick="editJobJob(${id})">Edit</button>
            </div>
        </div>         
    `
    },2000)
}

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

//PERFORM DELETE JOB AND EDIT JOB ALERT
const deleteSing = (id) => {
    cleanTable();
    queryId("cardsContainer").innerHTML = `
    <div class="alertDelete">
        Are you sure you want to delete this item?
        <button class="remove" onclick="deleteJob(${id})">Remove</button>
        <a href="index.html" class="backToInto" >Back</a>
    </div>
`
}

//METHODS
const sendData = () => {
    return {
        name: queryId("title").value,
        description: queryId("description").value,
        category: queryId("category").value,
        seniority:queryId("seniority").value,
        location:queryId("location").value
    }
}

/* const getDataFilter = (filtro) => {
    let arrayCoincidencias = [];
    fetch(`${url_base}${endpoint}`)
        .then(response => response.json())
        .then(data =>  {
                arrayCoincidencias = data.filter(obj=>{
                    obj.location === filtro[0] && obj.seniority === filtro[1] && obj.category === filtro[2]
                })
        renderJobs(arrayCoincidencias);    
        })
        .catch(err => console.log(err))
}
 */

const objForm =()=>{
    
}
let countryValue;
let seniorityValue;
let categoryValue;

inputCountry.addEventListener('change',()=>{
    countryValue = inputCountry.value;
})
inputSeniority.addEventListener('change',()=>{
    seniorityValue = inputSeniority;
})
inputCategory.addEventListener('change',()=>{
    categoryValue = inputCategory;
}) 

/* queryId("form__search--Btn").addEventListener("click", (e) => {
    e.preventDefault()
    getFilter(queryId("form__select--country").value)
}) */

/* queryId("form__search--Btn").addEventListener('click',(e)=>{
    e.preventDefault();
    let arr = [countryValue,seniorityValue,categoryValue]
    getDataFilter(arr)
}) */



//EVENTS
queryId("form-submit").addEventListener("click",(e)=>{
    e.preventDefault();
    sendJob();
    queryId("form-createJob").classList.add('hidden');
    handleSpinner();
    setTimeout(()=>{
        getData(page)
        queryId("spinner").classList.add('hidden')
        },1000)
})

//funcionalidades en el boton prev y next
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

//navbar buttons
queryId("navbar--createJob").addEventListener('click',()=>{
    handleSpinner()
    setTimeout(()=>{
    queryId("spinner").classList.add('hidden')
    queryId("buttonContainer-next-prev").classList.add('hidden')
    queryId("form-createJob").classList.remove('hidden')
    },2000)
})

const btnCareer = queryId("navbar--careers").addEventListener('click',()=>{
    handleSpinner()
    form.innerHTML=""
    setTimeout(()=>{
        getData(page)
        queryId("spinner").classList.add('hidden')
    },1000)
})