//Declaring global variables

const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
const body = document.querySelector('body');

// Call the getUsers function passing the API url
getUsers('https://randomuser.me/api/?results=12&nat=au,us,dk,fr,gb')
    .catch( err => console.log(err));
    
/**
 * 
 * @param {String} fetches the API sting and change it to json
 * uses the JSON data to generate 12 cards
 */
async function getUsers(url){


    const users = await fetch(url);
    const usersJson = await users.json();
    console.log(usersJson.results);
    usersJson.results
    .map( user => {
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
        createModal(user);
    });
}

/**
 * 
 * @param {Object} user is the the collection of users value
 * uses the value from the object to create the modal
 */
 function createModal(data){

    console.log(data);
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
        <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
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

const form = document.createElement('form');
form.setAttribute('action', '#');
form.setAttribute('method', 'get');
searchContainer.appendChild(form);
searchContainer.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;

const searchBtn = document.querySelector('#search-submit');
searchBtn.addEventListener('click', searchUser);

function searchUser(){
    const searchInput = document.querySelector('#search-input').value;
    const allUsers = document.querySelectorAll('.card h3');
    const userContainer = document.querySelectorAll('.card');

    for( let i = 0; i < allUsers.length; i++){
       if(allUsers[i].textContent.includes(searchInput)){
            userContainer[i].style.display = 'flex';
       }
       else{
        userContainer[i].style.display = 'none';
       }
    }
    

}

/**
 * created gallery layouts
 */
