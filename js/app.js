//Declaring global variables

const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
const body = document.querySelector('body');

// Call the getUsers function passing the API url
getUsers('https://randomuser.me/api/?results=12');
    
/**
 * 
 * @param {String} fetches the API sting and change it to json
 * uses the JSON data to generate 12 cards
 */
async function getUsers(url){

    const users = await fetch(url);
    const usersJson = await users.json();
    usersJson.results.map( user => {
        createCard(user);
    });

}

/**
 * 
 * @param {Object} user is the collection of users value.
 * uses the value from the object to create the car
 */
function createCard(user){

    const cardDiv = document.createElement('div');
    gallery.appendChild(cardDiv);
    cardDiv.className = 'card';
    cardDiv.innerHTML = `
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}</p>
    </div>  
    `;

    cardDiv.addEventListener('click', function(){
        generateModal(user);
    });
}

/**
 * 
 * @param {Object} user is the the collection of users value
 * uses the value from the object to create the modal
 */
 function generateModal(data){

    const modalContainer = document.createElement('div');
    modalContainer.classList = 'modal-container';
    body.appendChild(modalContainer);    

    modalContainer.innerHTML = `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${data.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.phone}</p>
            <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${data.dob.date}</p>
        </div>
    </div>
    `;
    
    // adding a close function to close the modal
    const closeBtn = document.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', removeModal);
    
    // to remove the modal when 'X' is clicked
    function removeModal(){
        body.removeChild(modalContainer);
    }
 }





/**
 * Search layout
 */

//  const form = document.createElement('form');
//  form.setAttribute('action', '#');
//  form.setAttribute('method', 'get');
//  searchContainer.appendChild(form);
//  const searchInput = document.createElement('input');
//  searchInput.setAttribute('type', 'search');
//  searchInput.setAttribute('id', 'search-input');
//  searchInput.setAttribute('class', 'search-input');
//  searchInput.setAttribute('placeholder', 'Search...');
//  form.appendChild(searchInput);
//  const submitInput = document.createElement('input');
//  submitInput.setAttribute('type', 'submit');
//  submitInput.setAttribute('value', '~&#128269;');
//  submitInput.setAttribute('id', 'search-submit');
//  submitInput.setAttribute('class', 'search-submit');
//  form.appendChild(submitInput);

// searchInput.addEventListener('keyup', function(e){
    
//     const search = e.key;
//     const name = document.querySelectorAll('h3');

//    for(let i=0; i < name.length; i++){
//         if(name[i].textContent
//    }

// })

/**
 * created gallery layouts
 */
