//getting data from mock-api server
let trailerContainer=document.querySelector('.trailer-container')
let movieFormContainer=document.querySelector('.movie-form')


function add()
{
  let form=`<div class="add-movie-form"><input placeholder="Movie Name" id='name'>
  <input placeholder="Movie Picture" id='avatar'><input placeholder="Movie Trailer" id='trailer'>
  <button onclick="addMovie()">Add</button></div>`
  movieFormContainer.innerHTML=form
}

function read()
{
 let movieFormContainer=""
  let movie_card=""
  let movie_container=document.querySelector(".movie-container")
  fetch('https://65dcc5e8e7edadead7ecd9de.mockapi.io/movies').then(data=>data.json()).then(movies=>{
                       movies.map(movie=>{
                          movie_card+=`
                          <div class="card col-4">
                          <img src="${movie.avatar}" class="card-img-top" alt="..." style="width:100%;height:50%;">
                          <div class="card-body">
                            <h5 class="card-title">${movie.name}</h5>
                            <p class="card-text">Some quick example text to build othe card's content.</p>
                           <button onclick="getMovie(${movie.id})" class="btn btn-primary">Watch Trailer</button>
                           <p>
                           <button onclick="deleteMovie(${movie.id})" class="btn btn-primary"><ion-icon name="trash-outline"></ion-icon></button>
                           </div>
                           <p>
                           <button onclick="editMovie(${movie.id})" class="btn btn-primary"><ion-icon name="create-outline"></ion-icon></ion-icon></button>
                           </div>`
                       })   
          movie_container.innerHTML=movie_card
                          })
}

function getMovie(id)
{
      fetch(`https://65dcc5e8e7edadead7ecd9de.mockapi.io/movies/${id}`).then(data=>data.json()).then(movie=> trailerContainer.innerHTML=`<iframe width="1035" height="582" src="${movie.trailer}" title="${movie.name}- Trailer" frameborder="0"></iframe>`)
console.log(id)
}

function addMovie()
{

 const name=document.getElementById('name').value
 const avatar=document.getElementById('avatar').value
 const trailer=document.getElementById('trailer').value
  fetch('https://65dcc5e8e7edadead7ecd9de.mockapi.io/movies',{
        method:"POST",
        body:JSON.stringify({name,avatar,trailer}),
        headers:{
            "Content-type":"application/json"
        }
    }).then(()=>read())
    movieFormContainer.style.display="none" 
}

function deleteMovie(id)
{
    fetch(`https://65dcc5e8e7edadead7ecd9de.mockapi.io/movies/${id}`,{method:"DELETE"}).then(()=>read())
}
function editMovie(id)
{
    // console.log('id');
    
        
     //to assing value attr of textbox(form)
     //const name=document.getElementById('name').value
     //const avatar=document.getElementById('avatar').value
     //const trailer=document.getElementById('trailer').value
     
    //to read name,avatar and trailer from user obj(from mockapi)
        
        let updateform=`<div class="add-movie-form"><input placeholder="Movie Name" id='name'>
        <input placeholder="Movie Picture" id='avatar'><input placeholder="Movie Trailer" id='trailer'>
        <button onclick="updateMovie()">Update</button></div>` 
        fetch(`https://65dcc5e8e7edadead7ecd9de.mockapi.io/movies/${id}`).then(data=>data.json()).then(movie=>{  
        name.value=movie.name
        avatar.value=movie.avatar
        trailer.value=movie.trailer
        })
        movieFormContainer.innerHTML=updateform
  
        //to assing value attr of textbox(form)
     

             console.log(id,name,avatar,trailer);


    
    
}
function updateMovie()
{
    //after changing particular user data,assign values to variables
    name=document.getElementById('name').value
    avatar=document.getElementById('avatar').value
    trailer=document.getElementById('trailer').value
     fetch('https://65dcc5e8e7edadead7ecd9de.mockapi.io/movies',{
           method:"PUT",
           body:JSON.stringify({name,avatar,trailer}),
           headers:{
               "Content-type":"application/json"
           }
       }).then(()=>read())
       movieFormContainer.style.display="none" 
  }