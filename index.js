let style = document.createElement('style');
let content = ``;
let deckClicks = 0;
let revealClicks = 0;

// create a shuffled list of the backgrounds for the cards, while adding styling
imageInfo.sort(() => Math.random() - 0.5);
let imagesList = [];
let cardTags = document.getElementsByClassName('card');
for (let i = 0; i < imageInfo.length; i++) {
    name = imageInfo[i][0];
    content = content.concat(`.${name.slice(0,3)} {background: url("assets/cards/${name}"); background-size: cover; background-position: center;} `)
    imagesList.push(`url("assets/cards/${name}")`);
}

style.textContent = content;
document.head.appendChild(style);

// create and add the card elements to the container
let container = document.querySelector('.container');
let p = document.querySelector('p');
let descriptionVisible = false;
for (let i = 0; i < 22; i++) {
    let el = document.createElement('div');
    el.style.setProperty('--i', i - 10.5);
    el.style.setProperty('--img', `url("assets/cards/${imageInfo[i][0]}")`);
    el.style.setProperty('--info', imageInfo[i][1])
    el.classList.add('card', 'deck');
    // add a listener to handle the clicking of the cards
    el.addEventListener('click', event => {
        if (el.classList.contains('deck') && deckClicks < 3) {
            // if clicking on the deck
            el.classList.remove('deck');
            el.classList.add('hand');
            deckClicks++
            if (deckClicks == 1) {
                el.classList.add('left');
                p.textContent = '';
            } else if (deckClicks == 2) {
                el.classList.add('middle');
            } else if (deckClicks == 3) {
                el.classList.add('right');
                p.textContent = 'Click the Cards to Reveal';
                p.style.top = '60%';
                let deck = document.getElementsByClassName('deck');
                for (let i = 0; i <= 18; i++) {
                    deck[i].style.opacity = '0';
                }
            }
        } else if (el.classList.contains('hand') && deckClicks == 3) {
            // if clicking on the hand
            el.classList.add('revealed');
            if (!descriptionVisible) {
                p.textContent = '';
                let description = document.createElement('p');
                description.classList.add('description');
                description.textContent = "";
                container.appendChild(description);
                descriptionVisible = true;
            }
            revealClicks++
            if (revealClicks == 3) {
                let description = document.querySelector('.description');
                description.textContent = "Hover over a Card to see Interpretation";
            }
            el.onmouseover = event => {
                // change and reveal description
                if (revealClicks == 3) {
                    let description = document.querySelector('.description');
                    message = el.style.getPropertyValue('--info').split('"').join("'");
                    if (message.slice(-1) == "'") {
                        message = message.slice(0, -1);
                    } else if (message.slice(-2) == "' ") {
                        message = message.slice(0, -2);
                    }
                    description.textContent = message;
                }
            }
        }
    });
    container.appendChild(el);
}
