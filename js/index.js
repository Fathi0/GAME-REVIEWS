"use strict"
let closeBtn = document.getElementById('closeBtn');
getData("mmorpg")
document.querySelectorAll('.nav-link').forEach(element => {
    element.addEventListener('click', function (event) {
        document.querySelector(".nav-item .active").classList.remove("active");
        event.target.classList.add('active');
    });});
let links = document.querySelectorAll(".nav-link")
for(let i =0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        let caurntGame = e.target.innerHTML
        getData(caurntGame)
    })
}

let data = []
function getData(game){
const myHttp = new XMLHttpRequest();

myHttp.open("get",`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.${game}.fantasy.pvp&platform=pc`)
    myHttp.setRequestHeader('X-RapidAPI-Key', 'f16c765d90msh6289bbb9332fbfap19a54fjsn939cb191b915')
    myHttp.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
    myHttp.send()
    myHttp.addEventListener("readystatechange",function(){
        if(myHttp.readyState ===4){
            data = JSON.parse(myHttp.response)
        }
        displayData()
        
    })
}
function displayData(){
    let cols =``;
    for(let i =0 ; i<data.length;i++){
        cols+= `                    <div class="col-md-3 ">
        <div dat_id=${data[i].id} class="card  max h-100 bg-transparent" role="button">
            <div class="card-body text-white ">
                <figure class="position-relative img-black ">
                    <img class="card-img-top object-fit-cover h-100 " src="${data[i].thumbnail}" alt="">
                </figure>
                <figure>
                    <div class="hstack justify-content-between ">
                        <h3 class="h6 small ">${data[i].title}</h3>
                        <span class="badge text-bg-primary p-2">Free</span>
                    </div>
                    <p class="card-text small text-center opacity-50 ">
                    ${data[i].short_description}
                    </p>
                </figure>
            </div>
            <footer class="card-footer small hstack justify-content-between ">
                <span class="badge badge-color">${data[i].genre}</span>
                <span class="badge badge-color">${data[i].platform}</span>
            </footer>
        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = cols
    document.querySelectorAll(".card").forEach(element => {
        element.addEventListener("click",function(){
            let dat_id= element.getAttribute("dat_id");
            getId(dat_id)
        })
    });

}
let list = {}
function getId(id){
    const op = new XMLHttpRequest();

op.addEventListener('readystatechange', function () {
	if (op.readyState === 4) {
		list = JSON.parse(op.response)
        console.log(list)
        displayDetails()
	}
});

op.open('GET', `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`);
op.setRequestHeader('X-RapidAPI-Key', 'f16c765d90msh6289bbb9332fbfap19a54fjsn939cb191b915');
op.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

op.send(list);
console.log(list) 
}
function displayDetails(){
    document.getElementById("games").classList.add("d-none")
    document.getElementById("detailss").classList.remove("d-none")
    let fa =``;
        fa= `             <div class="col-md-4">
        <img src="${list.thumbnail}
        " class="w-100 " alt="">
    </div>
    <div class="col-md-8">
        <h3>Title:${list.title}
        </h3>
        <p>Category: 
            <span class="badge text-bg-info">${list.platform}
            </span>
        </p>
        <p>Platform: 
            <span class="badge text-bg-info">${list.platform}</span>
        </p>
        <p>Status: 
            <span class="badge text-bg-info">${list.status}
            </span>
        </p>
        <p class="small ">${list.description}
        </p>
        <a class="btn btn-outline-warning "  href="${list.game_url}
        " target="_blank">Show Game</a>
    </div>`
    document.getElementById("rowDetails").innerHTML = fa
    closeBtn.addEventListener("click",closeModal)


}
function closeModal(){
    document.getElementById("games").classList.remove("d-none")
    document.getElementById("detailss").classList.add("d-none")
}
$(document).ready(function(){
    $(".loading").fadeOut(500,function(){
        $(".loading").removeClass('d-flex')
    })
})