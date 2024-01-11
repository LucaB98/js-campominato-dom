// ! PRENDO GLI ELEMENTI CHE MI SERVONO
const formElement = document.querySelector('form');
const grid = document.getElementById('grid');
const select = document.getElementById('select');
const scoreDisplay = document.getElementById('score');

// ! FUNZIONI
// CREAZIONE CELLA
const createCell = (content) => {
    const newCell = document.createElement('div');
    newCell.classList = 'cell'
    newCell.innerText = content;

    return newCell;
};

// GENERAZIONE BOMBE //! (2 MILESTONE)
const generateBombs = (maxBombNumber, totalBombs) => {
    const bombs = [];
    while(bombs.length < totalBombs){
        const randomNumber = Math.floor(Math.random()* maxBombNumber) + 1;
        if(!bombs.includes(randomNumber)) bombs.push(randomNumber);
    }
    return bombs;
};

// FINE DEI GIOCHI 

const endGame = (score, bombs, revealFunction, hasWon = false) =>{
    const message = hasWon ? `Hai vinto!`: `Hai perso! hai totalizzato ${score} punti`;
    alert(message);
    
    revealFunction(bombs);
};

// RILEVAMENTO CELLE 

const revealAllCell = (bombs) => {
    const cells = document.querySelectorAll('.cell')
    for(let cell of cells){
        cell.classList.add('clicked');
        if(bombs.includes(parseInt(cell.innerText))){
            cell.classList.add('bomb')
        };
    };
};


//! SVOLGIMENTO DELL'ESERCIZIO

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    // SVUOTO QUANDO RICOMINCIO A GIOCARE

    grid.innerHTML = '';

    // SELEZIONE DELLA DIFFICOLTA' E GRANDEZZA DELLA GRIGLIA
    const level = select.value;
    // numero di colonne e righe
    let rows = 10;
    let cols = 10;

    switch(level){
        case 'difficile':
            rows = 7;
            cols = 7;
            break;
        case 'normale':
            rows = 9;
            cols = 9;
            break;    
    };

    const root = document.querySelector(':root');
    root.style.setProperty('--cols-per-row', cols);
    const totCell = rows * cols;

    // CREO LO SCORE // !(1 MILESTONE)
    let score = 0;
    scoreDisplay.innerText = score;

    // CREO LE BOMBE // ! (2 MILESTONE)
    const totalBombs = 16;
    const maxPoint = totCell - totalBombs;
    const bombs = generateBombs(totCell, totalBombs)

    // CICLO PER LA CREAZIONE DELLE CELLE
    for(let i = 1; i <= totCell; i++){
        // CREAZIONE CELLA
        const cell = createCell(i);
        // CLICK SULLA CELLA
        cell.addEventListener('click', () => {

            // AGGIUNGO CLASSE ALLA CELLA E CONTROLLO DI NON RIPETERE

            if(cell.classList.contains('clicked')) return;
            const cellValue = cell.innerText;
            console.log('Valore della casella cliccata:', cellValue);
            cell.classList.add('clicked');

            // CONTROLLO VINCITA O PERDITA GAME 

            const hasHitBomb = bombs.includes(i); 

            // COLPISCO UNA BOMBA

            if(hasHitBomb){   

                endGame(score, bombs, revealAllCell, false) 

            }else{
                scoreDisplay.innerText = ++score;  // ! (1 MILESTONE)

                // VINCITA DEL GAME  

                if(score === maxPoint){
                   endGame(score, bombs, revealAllCell, true);

                };
            };
            
        });
        // APPENDO LE CELLE AL PADRE GRID

        grid.appendChild(cell);
    };
});