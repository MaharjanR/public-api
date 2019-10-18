


const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');

/**
 * Search layout
 */

 const form = document.createElement('form');
 form.setAttribute('action', '#');
 form.setAttribute('method', 'get');
 searchContainer.appendChild(form);
 const searchInput = document.createElement('input');
 searchInput.setAttribute('type', 'search');
 searchInput.setAttribute('id', 'search-input');
 searchInput.setAttribute('class', 'search-input');
 searchInput.setAttribute('placeholder', 'Search...');
 form.appendChild(searchInput);
 const submitInput = document.createElement('input');
 submitInput.setAttribute('type', 'submit');
 submitInput.setAttribute('value', '&#128269;');
 submitInput.setAttribute('id', 'search-submit');
 submitInput.setAttribute('class', 'search-submit');
 form.appendChild(submitInput);



/**
 * created gallery layouts
 */

function createCard(data){

    // const cardDiv = createElements('div','card','gallery');
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

/**
 * Helper class functions
 */

// function createElements(el, addClass, parent){

//     console.log(`${el} ${addClass} ${parent}`);
//     const element = document.createElement(`${el}`);
//     const parentEl = parent;
//     console.log(element);
//     element.classList = `${addClass}`;
//     console.log(parent);
//     parent.appendChild(element);

//  }



getUsers('https://randomuser.me/api/?results=12');
    



async function getUsers(url){

    const users = await fetch(url);
    const usersJson = await users.json();
    usersJson.results.map( user => {
        createCard(user);
    });

}



