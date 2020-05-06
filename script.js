const arr = Array.from(
  { length: 100 },
  (_, i) => i + 1
);

let times = Array.from(
  { length: 3 }
);

// This function sets 0 as default value of the arrays in 'times'
times.fill(0);
let seconds = -1;

// interval2 contains info about the seconds
let interval2;
// interval contains info about how often shuffle function is going to mix
let interval;

const start = document.querySelector('#start');
const container = document.querySelector('#container');
const time = document.querySelector('#time');
const randomNumber = Math.floor(Math.random() * 100)


// This function places the 100 buttons on the screen
for (const num of arr) {
  if (num === randomNumber) {
    uniqueButton = document.createElement('button');
    uniqueButton.classList.add('guess')
    uniqueButton.classList.add('d-none');
    uniqueButton.classList.add('stop_button');
    container.appendChild(uniqueButton).style.backgroundColor = '#194066';
  } else {
    multipleButtons = document.createElement('button')
    multipleButtons.textContent = num;
    container.appendChild(multipleButtons).setAttribute('class', 'init_buttons')
    multipleButtons.classList.add('d-none');
  }
}

// This children variable contains the 100 hundred buttons
const children = [...container.children];

// This function mixes the arrays
function swap(children, i, j) {
  [children[i], children[j]] = [children[j], children[i]];
}

// This function inverts the number of arrays and ends up mixing the arrays with swap function
const shuffle = (arr) => {
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));    
    swap(children, i, j);
  }  
  return arr;
} 

// This function generates the score
const timerCountUp = () => { 
  let current = 0;

  interval2 = setInterval(() => {
    seconds = current++
    console.log(seconds);
    return times;
  }, 1000);
}

// setup function is where the 100 buttons are 
const setup = () => { 
  interval = setInterval(() => {
    for (const child of children) {
      if (child.classList.contains('running')) {
        container.appendChild(uniqueButton).style.display = 'inline-block';
        child.innerHTML = `<span class="average">${randomNumber}</span>`;
      } else {
        container.appendChild(child).className = 'guess'; 
      };
    };
    shuffle(arr);
  }, 600);
  timerCountUp();
/** 
 * It was not possible to run it before because all JavaScript code which deals with DOM elements like the HTML file has to be executed only after the DOM is loaded.
 * It means that everything which is JavaScript should be located at the end of the code 
 */
alert('it runs'); 
}

// Start Game
start.addEventListener('click', () => {
  start.style.display = 'none';
  container.innerHTML = ''
  stopButton.classList.add('running');
  container.classList.add('cube')
  setup();
})

const stopButton = document.querySelector('.stop_button');

stopButton.addEventListener('click', () => {
  if (!stopButton.classList.contains('stopped')) {
    stopButton.classList.add('stopped');
    stopButton.classList.remove('running');

    times.shift();
    times.push(seconds); 

    let sum = 0;

    times.forEach((el) => {
      sum = sum + el;
    });

    const average = (sum / 3).toFixed(2);
    
    document.querySelector('.average').innerHTML = `${average}s`;
  } else {
    stopButton.classList.remove('stopped');
    stopButton.classList.add('running');
    setup(); 
  };

  // This loop stops timerCountUp and shuffle functions
  if (stopButton.classList.contains('stopped')) {
    clearInterval(interval);   
    clearInterval(interval2);
  };
});