const CARD = document.querySelector('.card');
const CARD_HEADING = CARD.querySelector('.card-heading');
const CARD_QUOTE = CARD.querySelector('.card-quote');
const CARD_BUTTON = CARD.querySelector('.card-button');

let isAnimating = false;

const getQuote = async () => {

    if (isAnimating) return;

    let randomNumber = Math.floor(Math.random() * 224 + 1);

    // These numbers caused problems when entered as slip ID, therefore they are omitted
    while (randomNumber === 22 ||
           randomNumber === 48 ||
           randomNumber === 67 ||
           randomNumber === 76 ||
           randomNumber === 146) {
        randomNumber = Math.floor(Math.random() * 224 + 1);
    }
    try {
        isAnimating = true;

        const response = await fetch(`https://api.adviceslip.com/advice/${randomNumber}`);
        const data = await response.json();

        if (!CARD.classList.contains('animating')) {
            CARD.classList.add('animating');
        }

        setTimeout(function() {
            CARD_HEADING.innerText = '';
            CARD_QUOTE.innerText = '';
            
            CARD_HEADING.innerText = `Advice #${data.slip.id}`;
            CARD_QUOTE.innerText = `“${data.slip.advice}”`;

            CARD.classList.remove('animating');

            isAnimating = false;
        }, 1000)
    }
    catch (e) {
        CARD_HEADING.innerText = 'Sorry!';
        CARD_QUOTE.innerText = 'Couldn\'t find advice...';
    }
    
}

CARD_BUTTON.addEventListener('click', getQuote);