
const totalEmployee = 12;

/**
 * Search layout
 */

 const form = document.createElement('form');
 form.setAttribute('action', '#');
 form.setAttribute('method', 'get');


/**
 * created gallery layouts
 */
const gallery = document.querySelector('#gallery');

function galleryLayout(data){

    console.log(data);
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    gallery.appendChild(cardDiv);
    const cardImgContainer = document.createElement('div');
    cardImgContainer.classList = 'card-img-container';
    cardDiv.appendChild(cardImgContainer);
    const cardImg = document.createElement('img');
    cardImg.classList = 'card-img';
    cardImg.setAttribute('src', `${data.picture.medium}`);
    cardImg.setAttribute('alt', 'profile picture');
    cardImgContainer.appendChild(cardImg);
    const cardInfo = document.createElement('div');
    cardInfo.classList = 'card-info-container';
    cardDiv.appendChild(cardInfo);
    const cardName = document.createElement('h3');
    cardName.id = 'name';
    cardName.classList = 'card-name cap';
    cardName.textContent = `${data.name.first} ${data.name.last}`;
    cardInfo.appendChild(cardName);
    const cardEmail = document.createElement('p');
    cardEmail.classList = 'card-text';
    cardEmail.textContent = `${data.email}`;
    cardInfo.appendChild(cardEmail);
    const cardLocation = document.createElement('p');
    cardLocation.classList = 'card-text';
    cardLocation.textContent = `${data.location.city} ${data.location.postcode}`;
    cardInfo.appendChild(cardLocation);
    
}

for( let i = 0; i < totalEmployee; i++){
    fetch('https://randomuser.me/api/')
    .then( data => data.json())
    .then( data => galleryLayout(data.results[0]))
}





