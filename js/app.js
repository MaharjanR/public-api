//Declaring global variables

const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
const body = document.querySelector('body');
let results = [];

// Call the getUsers function passing the API url
getUsers('https://randomuser.me/api/?results=12&nat=us')
    .catch( err => console.log(err));
    
/**
 * 
 * @param {String} fetches the API sting and change it to json
 * uses the JSON data to generate 12 cards
 */
async function getUsers(url){
    
    const users = await fetch(url);
    const usersJson = await users.json();
    usersJson.results
    .map( user => {
        createCard(user);
        results.push(user);
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

    // Creating modal when the card is pressed
    cardDiv.addEventListener('click', function(){
        createModal(user);
    });
}

/**
 * 
 * @param {Object} user is the the collection of users value
 * uses the value from the object to create the modal
 */
 function createModal(user){

    // creating the modal container and appending it to the body
    const modalContainer = document.createElement('div');
    modalContainer.classList = 'modal-container';
    body.appendChild(modalContainer);

    // creating the birthday by selection the user dob and displaying only year, month and day
    const birthday = new Date(user.dob.date);
    const birthYear = birthday.getFullYear();
    let birthDate = birthday.getDate();
    let birthMonth = birthday.getMonth() + 1;

    // If the dates are lower than 10 adding 0 to make it look match with double digit dates
    if(birthDate < 10){
        birthDate = '0' + birthDate;
    }
    if(birthMonth < 10){
        birthMonth = '0' + birthMonth;
    }

    // checking the index of the modal in overall user
    const index = results.indexOf(user);
    var html = '';

    // creating the modal card using user values and saving it in the html to append it to modal container 
    html = `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${user.phone}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${birthYear}-${birthMonth}-${birthDate}</p>
        </div>
        <div class="modal-btn-container">`;

    // checks if this is the first value of user if it is it doesnt run
    if(index !== 0){
        html += `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`;
    }  

    // checks if this is the last value of user if it is it doesnt run
    if(index !== 11){
        html += ` <button type="button" id="modal-next" class="modal-next btn">Next</button>`;
    }
       
    html += `</div> </div>`;

    modalContainer.innerHTML = html;
    // adding a close function to close the modal
    const closeBtn = document.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', removeModal);

    // adding next and prev function
    const prev = document.querySelector('#modal-prev');
    const next = document.querySelector('#modal-next');

    // checks to see if prev button is created or not
    if(prev){
        prev.addEventListener('click', () => {
            removeModal();
            createModal(results[index - 1]);
        });
    }

    // checks to see if next button is created or not
    if(next){
        next.addEventListener('click', () => {
            removeModal();
            createModal(results[index + 1]);
        });
    }

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


/**
 * checks the users name if it matches with the word type in search bar
 */
function searchUser(){
    const searchInput = document.querySelector('#search-input').value;
    const allUsers = document.querySelectorAll('.card h3');
    const userContainer = document.querySelectorAll('.card');
    

    for( let i = 0; i < allUsers.length; i++){
       if(allUsers[i].textContent.toLowerCase().includes(searchInput.toLowerCase())){
            userContainer[i].style.display = 'flex';
       }
       else{
        userContainer[i].style.display = 'none';
       }
    }
}