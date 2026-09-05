window.moreProjects = [
  {
    id: 'dice',
    title: 'Dice Roller',
    description: 'Roll a six-sided die and display a random number.',
    concepts: ['Math.random', 'Math.floor', 'textContent'],
    mission: 'Generate a whole number from 1 through 6 whenever Roll is pressed.',
    html: `<main><p class="label">YOUR ROLL</p><h1 id="die">–</h1><button id="roll">Roll the die</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#172554;font-family:system-ui;color:white}main{text-align:center}.label{letter-spacing:.18em;font-size:12px}h1{font-size:90px;margin:12px}button{padding:13px 22px;border:0;border-radius:12px;background:#fbbf24;color:#172554;font-weight:800}`,
    starter: `const die = document.querySelector('#die');\nconst rollButton = document.querySelector('#roll');\n\n// Generate a number from 1 to 6 when Roll is clicked\n`
  },
  {
    id: 'character',
    title: 'Character Counter',
    description: 'Count characters as someone types a short message.',
    concepts: ['input event', 'value', 'length'],
    mission: 'Update the character total on every input event.',
    html: `<main><h1>Write a note</h1><textarea id="message" maxlength="120" placeholder="Start typing..."></textarea><p><strong id="character-count">0</strong> / 120 characters</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eef2ff;font-family:system-ui;color:#1e293b}main{width:min(82%,330px);background:white;padding:26px;border-radius:18px;box-shadow:0 18px 45px #33415522}textarea{width:100%;height:110px;box-sizing:border-box;padding:12px;border:1px solid #cbd5e1;border-radius:10px;font:inherit}p{color:#64748b}`,
    starter: `const message = document.querySelector('#message');\nconst characterCount = document.querySelector('#character-count');\n\n// Update the count whenever the user types\n`
  },
  {
    id: 'greeting',
    title: 'Personal Greeting',
    description: 'Turn a visitor’s name into a friendly greeting.',
    concepts: ['value', 'click event', 'textContent'],
    mission: 'Read the name input and display a personalized greeting.',
    html: `<main><h1>Hello there</h1><input id="name" placeholder="Your name"><button id="greet">Say hello</button><p id="greeting-output">Your greeting appears here.</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff7ed;font-family:system-ui;color:#431407}main{width:min(82%,320px);text-align:center;background:white;padding:28px;border-radius:20px}input,button{width:100%;box-sizing:border-box;padding:12px;border-radius:10px;font:inherit}input{border:1px solid #fdba74}button{margin-top:10px;border:0;background:#ea580c;color:white;font-weight:750}`,
    starter: `const nameInput = document.querySelector('#name');\nconst greetButton = document.querySelector('#greet');\nconst output = document.querySelector('#greeting-output');\n\n// Display a greeting when the button is clicked\n`
  },
  {
    id: 'theme',
    title: 'Theme Switcher',
    description: 'Switch a card between light and dark themes.',
    concepts: ['classList', 'toggle', 'click event'],
    mission: 'Toggle the dark class on the card when the button is pressed.',
    html: `<main id="theme-card"><h1>Theme card</h1><p>Choose the look that feels right.</p><button id="theme-toggle">Toggle theme</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#dbeafe;font-family:system-ui;color:#172033}main{width:min(78%,300px);padding:30px;border-radius:22px;background:white;transition:.25s}main.dark{background:#111827;color:white}button{padding:12px 16px;border:0;border-radius:10px;background:#2563eb;color:white;font-weight:700}`,
    starter: `const card = document.querySelector('#theme-card');\nconst themeButton = document.querySelector('#theme-toggle');\n\n// Toggle the dark class when the button is clicked\n`
  },
  {
    id: 'accordion',
    title: 'Answer Revealer',
    description: 'Open and close an answer beneath a question.',
    concepts: ['hidden', 'click event', 'boolean'],
    mission: 'Reverse the answer’s hidden property on every click.',
    html: `<main><h1>Quick question</h1><button id="question">What does DOM mean?</button><p id="answer" hidden>Document Object Model</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f3ff;font-family:system-ui;color:#2e1065}main{width:min(84%,340px)}button{width:100%;padding:16px;text-align:left;border:0;border-radius:12px;background:#7c3aed;color:white;font-weight:750}p{background:white;padding:18px;border-radius:12px;box-shadow:0 8px 24px #4c1d9522}`,
    starter: `const question = document.querySelector('#question');\nconst answer = document.querySelector('#answer');\n\n// Show and hide the answer when the question is clicked\n`
  },
  {
    id: 'like',
    title: 'Like Button',
    description: 'Increase a visible like total with each tap.',
    concepts: ['number', 'increment', 'textContent'],
    mission: 'Increase the likes variable and update the number on screen.',
    html: `<main><h1>JavaScript is fun</h1><button id="like-button">♥ Like</button><p><strong id="likes">0</strong> likes</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff1f2;font-family:system-ui;color:#4c0519}main{text-align:center;background:white;padding:32px;border-radius:22px}button{padding:13px 20px;border:0;border-radius:30px;background:#e11d48;color:white;font-weight:800}`,
    starter: `let likes = 0;\nconst likeButton = document.querySelector('#like-button');\nconst likeDisplay = document.querySelector('#likes');\n\n// Increase and display likes when the button is clicked\n`
  },
  {
    id: 'converter',
    title: 'Temperature Converter',
    description: 'Convert Celsius into Fahrenheit.',
    concepts: ['Number', 'formula', 'value'],
    mission: 'Use F = C × 9/5 + 32 and display the result.',
    html: `<main><h1>Temperature</h1><label>Celsius <input id="celsius" type="number" value="20"></label><button id="convert">Convert</button><p id="fahrenheit">Fahrenheit: —</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#ecfeff;font-family:system-ui;color:#164e63}main{width:270px;background:white;padding:28px;border-radius:20px}input,button{width:100%;box-sizing:border-box;padding:11px;margin-top:8px;border-radius:9px}input{border:1px solid #a5f3fc}button{border:0;background:#0891b2;color:white;font-weight:750}`,
    starter: `const celsius = document.querySelector('#celsius');\nconst convertButton = document.querySelector('#convert');\nconst fahrenheit = document.querySelector('#fahrenheit');\n\n// Convert Celsius to Fahrenheit on click\n`
  },
  {
    id: 'guess',
    title: 'Number Guess',
    description: 'Tell the player whether a guess matches the secret number.',
    concepts: ['Number', 'if/else', 'comparison'],
    mission: 'Compare the input with secretNumber and display the result.',
    html: `<main><h1>Guess 1–10</h1><input id="guess" type="number" min="1" max="10"><button id="check-guess">Check</button><p id="guess-result">Make your guess.</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1e1b4b;font-family:system-ui;color:white}main{text-align:center}input{width:70px;padding:12px;border:0;border-radius:10px;text-align:center;font-size:18px}button{padding:12px 16px;border:0;border-radius:10px;background:#a78bfa;color:#1e1b4b;font-weight:800;margin-left:6px}`,
    starter: `const secretNumber = 7;\nconst guessInput = document.querySelector('#guess');\nconst checkButton = document.querySelector('#check-guess');\nconst result = document.querySelector('#guess-result');\n\n// Compare the guess with secretNumber\n`
  },
  {
    id: 'password-maker',
    title: 'Password Generator',
    description: 'Build a random eight-character password.',
    concepts: ['loop', 'Math.random', 'string'],
    mission: 'Choose eight random characters and display the finished password.',
    html: `<main><h1>Password maker</h1><output id="generated-password">--------</output><button id="generate-password">Generate</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#052e16;font-family:system-ui;color:white}main{text-align:center;background:#14532d;padding:30px;border-radius:20px}output{display:block;background:#022c22;padding:15px;border-radius:10px;font:22px monospace;letter-spacing:3px}button{margin-top:14px;padding:12px 18px;border:0;border-radius:10px;background:#86efac;color:#052e16;font-weight:800}`,
    starter: `const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';\nconst output = document.querySelector('#generated-password');\nconst generateButton = document.querySelector('#generate-password');\n\n// Build an 8-character password on click\n`
  },
  {
    id: 'word-count',
    title: 'Word Counter',
    description: 'Count the words inside a message.',
    concepts: ['trim', 'split', 'input event'],
    mission: 'Split non-empty text into words and display the count.',
    html: `<main><h1>Word counter</h1><textarea id="words-input" placeholder="Write a sentence..."></textarea><p>Words: <strong id="word-total">0</strong></p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fefce8;font-family:system-ui;color:#422006}main{width:min(82%,330px);background:white;padding:26px;border-radius:18px}textarea{width:100%;height:120px;box-sizing:border-box;padding:12px;border:1px solid #fde047;border-radius:10px;font:inherit}`,
    starter: `const wordsInput = document.querySelector('#words-input');\nconst wordTotal = document.querySelector('#word-total');\n\n// Count words whenever the text changes\n`
  },
  {
    id: 'cart-total',
    title: 'Cart Total',
    description: 'Add item prices and display a shopping-cart total.',
    concepts: ['array', 'reduce', 'toFixed'],
    mission: 'Use reduce to total the prices and display two decimal places.',
    html: `<main><h1>Your cart</h1><ul><li>Notebook — $6.50</li><li>Pens — $3.25</li><li>Mug — $12.00</li></ul><button id="total-cart">Calculate total</button><p id="cart-result">Total: —</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f0fdf4;font-family:system-ui;color:#14532d}main{background:white;padding:28px;border-radius:20px;box-shadow:0 16px 40px #16653422}li{margin:8px}button{padding:12px 16px;border:0;border-radius:9px;background:#16a34a;color:white;font-weight:750}`,
    starter: `const prices = [6.50, 3.25, 12.00];\nconst totalButton = document.querySelector('#total-cart');\nconst cartResult = document.querySelector('#cart-result');\n\n// Add the prices with reduce when the button is clicked\n`
  },
  {
    id: 'tabs',
    title: 'Profile Tabs',
    description: 'Switch the content shown by a set of tabs.',
    concepts: ['dataset', 'forEach', 'textContent'],
    mission: 'Read data-content from the clicked tab and display it below.',
    html: `<main><div id="profile-tabs"><button data-content="Posts">Posts</button><button data-content="Photos">Photos</button><button data-content="About">About</button></div><section id="tab-output">Choose a tab</section></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f1f5f9;font-family:system-ui;color:#0f172a}main{width:min(84%,360px);background:white;padding:20px;border-radius:18px}button{padding:10px;border:0;background:#e2e8f0;border-radius:8px;margin:3px}section{margin-top:14px;padding:30px;background:#f8fafc;border-radius:10px;text-align:center}`,
    starter: `const tabs = document.querySelectorAll('[data-content]');\nconst tabOutput = document.querySelector('#tab-output');\n\n// Give each tab a click event and display its data-content\n`
  },
  {
    id: 'progress',
    title: 'Progress Stepper',
    description: 'Advance a progress bar ten percent at a time.',
    concepts: ['style.width', 'Math.min', 'increment'],
    mission: 'Increase progress by 10 without allowing it above 100.',
    html: `<main><h1>Course progress</h1><div class="track"><span id="progress-bar"></span></div><p><strong id="progress-value">0</strong>% complete</p><button id="advance">Complete a step</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eff6ff;font-family:system-ui;color:#1e3a8a}main{width:min(82%,330px);background:white;padding:28px;border-radius:20px}.track{height:14px;background:#dbeafe;border-radius:20px;overflow:hidden}.track span{display:block;width:0;height:100%;background:#3b82f6;transition:.25s}button{padding:12px;border:0;border-radius:9px;background:#1d4ed8;color:white;font-weight:750}`,
    starter: `let progress = 0;\nconst progressBar = document.querySelector('#progress-bar');\nconst progressValue = document.querySelector('#progress-value');\nconst advanceButton = document.querySelector('#advance');\n\n// Increase progress by 10 on each click\n`
  },
  {
    id: 'stopwatch',
    title: 'Mini Stopwatch',
    description: 'Start and stop a timer that counts seconds.',
    concepts: ['setInterval', 'clearInterval', 'textContent'],
    mission: 'Start one interval, update seconds, and stop it when requested.',
    html: `<main><p class="label">SECONDS</p><h1 id="seconds">0</h1><button id="start-timer">Start</button><button id="stop-timer">Stop</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:system-ui;color:white}main{text-align:center}.label{letter-spacing:.2em;color:#94a3b8}h1{font-size:76px;margin:10px}button{padding:11px 18px;border:0;border-radius:9px;margin:4px;background:#38bdf8;color:#082f49;font-weight:800}`,
    starter: `let seconds = 0;\nlet timerId;\nconst secondsDisplay = document.querySelector('#seconds');\nconst startButton = document.querySelector('#start-timer');\nconst stopButton = document.querySelector('#stop-timer');\n\n// Start an interval and add the stop event\n`
  },
  {
    id: 'quiz',
    title: 'One-Question Quiz',
    description: 'Check a selected answer and show feedback.',
    concepts: ['dataset', 'if/else', 'click event'],
    mission: 'Read data-correct and tell the player whether the answer is right.',
    html: `<main><h1>JavaScript Quiz</h1><p>Which keyword declares a value that cannot be reassigned?</p><button data-correct="false">let</button><button data-correct="true">const</button><button data-correct="false">var</button><p id="quiz-feedback">Choose an answer.</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#faf5ff;font-family:system-ui;color:#3b0764}main{width:min(84%,350px);background:white;padding:26px;border-radius:20px}button{padding:11px 16px;border:1px solid #d8b4fe;border-radius:9px;background:#f3e8ff;margin:3px;color:#581c87}`,
    starter: `const answers = document.querySelectorAll('[data-correct]');\nconst feedback = document.querySelector('#quiz-feedback');\n\n// Check data-correct when an answer is clicked\n`
  },
  {
    id: 'expense',
    title: 'Expense Adder',
    description: 'Add expense amounts to a running total.',
    concepts: ['Number', 'value', 'addition'],
    mission: 'Add valid amounts to the total and display the updated value.',
    html: `<main><h1>Expenses</h1><input id="expense-amount" type="number" min="0" step="0.01" placeholder="Amount"><button id="add-expense">Add expense</button><p>Total: $<strong id="expense-total">0.00</strong></p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff7ed;font-family:system-ui;color:#7c2d12}main{width:280px;background:white;padding:28px;border-radius:18px}input,button{width:100%;box-sizing:border-box;padding:11px;border-radius:9px}input{border:1px solid #fed7aa}button{margin-top:9px;border:0;background:#f97316;color:white;font-weight:750}`,
    starter: `let expenseTotal = 0;\nconst amountInput = document.querySelector('#expense-amount');\nconst addExpense = document.querySelector('#add-expense');\nconst totalDisplay = document.querySelector('#expense-total');\n\n// Add the entered amount to the running total\n`
  },
  {
    id: 'rps',
    title: 'Rock Paper Scissors',
    description: 'Let the player compete against a random computer choice.',
    concepts: ['array', 'Math.random', 'conditions'],
    mission: 'Choose for the computer and display win, lose, or tie.',
    html: `<main><h1>Choose one</h1><button data-choice="rock">✊ Rock</button><button data-choice="paper">✋ Paper</button><button data-choice="scissors">✌ Scissors</button><p id="rps-result">Waiting for your choice.</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#ecfccb;font-family:system-ui;color:#365314}main{text-align:center}button{display:block;width:190px;margin:8px auto;padding:12px;border:0;border-radius:12px;background:#65a30d;color:white;font-weight:750}`,
    starter: `const choices = ['rock', 'paper', 'scissors'];\nconst choiceButtons = document.querySelectorAll('[data-choice]');\nconst result = document.querySelector('#rps-result');\n\n// Compare the player's choice with a random computer choice\n`
  },
  {
    id: 'form-validation',
    title: 'Email Validator',
    description: 'Check whether an email field looks complete.',
    concepts: ['submit', 'preventDefault', 'includes'],
    mission: 'Prevent submission and show whether the email contains @.',
    html: `<main><h1>Join the list</h1><form id="email-form"><input id="email" type="text" placeholder="name@example.com"><button>Submit</button></form><p id="form-message">Enter your email.</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eef2ff;font-family:system-ui;color:#312e81}main{width:min(82%,320px);background:white;padding:28px;border-radius:20px}input,button{width:100%;box-sizing:border-box;padding:12px;border-radius:9px}input{border:1px solid #c7d2fe}button{margin-top:9px;border:0;background:#4f46e5;color:white;font-weight:750}`,
    starter: `const form = document.querySelector('#email-form');\nconst email = document.querySelector('#email');\nconst message = document.querySelector('#form-message');\n\n// Prevent submission and check for an @ symbol\n`
  },
  {
    id: 'countdown',
    title: 'Countdown Timer',
    description: 'Count backward to zero once per second.',
    concepts: ['setInterval', 'clearInterval', 'decrement'],
    mission: 'Decrease the count every second and stop the interval at zero.',
    html: `<main><p>COUNTDOWN</p><h1 id="countdown-value">5</h1><button id="start-countdown">Start countdown</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#450a0a;font-family:system-ui;color:white}main{text-align:center}h1{font-size:90px;margin:8px}button{padding:13px 20px;border:0;border-radius:10px;background:#fca5a5;color:#450a0a;font-weight:800}`,
    starter: `let count = 5;\nlet countdownId;\nconst countDisplay = document.querySelector('#countdown-value');\nconst startCountdown = document.querySelector('#start-countdown');\n\n// Count backward once per second and stop at zero\n`
  },
  {
    id: 'sort-numbers',
    title: 'Number Sorter',
    description: 'Arrange a group of numbers from smallest to largest.',
    concepts: ['sort', 'compare function', 'join'],
    mission: 'Sort numerically—not alphabetically—and display the result.',
    html: `<main><h1>Number sorter</h1><p>Unsorted: 42, 7, 19, 3, 100</p><button id="sort-button">Sort numbers</button><p id="sorted-output">Sorted: —</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;font-family:system-ui;color:#0f172a}main{background:white;padding:28px;border-radius:18px;box-shadow:0 15px 40px #0f172a18}button{padding:11px 16px;border:0;border-radius:9px;background:#334155;color:white;font-weight:750}`,
    starter: `const numbers = [42, 7, 19, 3, 100];\nconst sortButton = document.querySelector('#sort-button');\nconst sortedOutput = document.querySelector('#sorted-output');\n\n// Sort a copy of numbers from smallest to largest\n`
  },
  {
    id: 'favorites',
    title: 'Favorite Foods',
    description: 'Move selected foods into a favorites list.',
    concepts: ['createElement', 'dataset', 'append'],
    mission: 'Create an li from the clicked food and append it to Favorites.',
    html: `<main><h1>Foods</h1><div><button data-food="Tacos">Tacos</button><button data-food="Pizza">Pizza</button><button data-food="Pasta">Pasta</button></div><h2>Favorites</h2><ul id="favorites-list"></ul></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff7ed;font-family:system-ui;color:#431407}main{width:min(84%,340px);background:white;padding:26px;border-radius:20px}button{padding:10px 13px;border:0;border-radius:9px;background:#fb923c;color:#431407;font-weight:750;margin:3px}li{margin:7px}`,
    starter: `const foodButtons = document.querySelectorAll('[data-food]');\nconst favoritesList = document.querySelector('#favorites-list');\n\n// Create and append an li for the selected food\n`
  },
  {
    id: 'calculator',
    title: 'Mini Calculator',
    description: 'Add, subtract, multiply, or divide two numbers.',
    concepts: ['Number', 'dataset', 'functions'],
    mission: 'Use each button’s data-operation to calculate and display a result.',
    html: `<main><h1>Calculator</h1><input id="first-number" type="number" value="8"><input id="second-number" type="number" value="2"><div><button data-operation="add">+</button><button data-operation="subtract">−</button><button data-operation="multiply">×</button><button data-operation="divide">÷</button></div><p id="calc-result">Result: —</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#111827;font-family:system-ui;color:white}main{width:260px;background:#1f2937;padding:24px;border-radius:18px}input{width:100%;box-sizing:border-box;padding:10px;margin:4px 0;border:0;border-radius:8px}button{width:48px;height:44px;margin:7px 3px;border:0;border-radius:8px;background:#60a5fa;color:#172554;font-size:20px;font-weight:800}`,
    starter: `const firstNumber = document.querySelector('#first-number');\nconst secondNumber = document.querySelector('#second-number');\nconst operationButtons = document.querySelectorAll('[data-operation]');\nconst calcResult = document.querySelector('#calc-result');\n\n// Calculate based on the clicked button's data-operation\n`
  },
  {
    id: 'palindrome',
    title: 'Palindrome Checker',
    description: 'Check whether a word reads the same backward.',
    concepts: ['split', 'reverse', 'join'],
    mission: 'Reverse the entered word and compare it with the original.',
    html: `<main><h1>Palindrome?</h1><input id="palindrome-input" placeholder="Try racecar"><button id="check-palindrome">Check word</button><p id="palindrome-result">Enter a word.</p></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f0fdfa;font-family:system-ui;color:#134e4a}main{width:280px;background:white;padding:28px;border-radius:20px}input,button{width:100%;box-sizing:border-box;padding:11px;border-radius:9px}input{border:1px solid #99f6e4}button{margin-top:9px;border:0;background:#0d9488;color:white;font-weight:750}`,
    starter: `const wordInput = document.querySelector('#palindrome-input');\nconst checkWord = document.querySelector('#check-palindrome');\nconst palindromeResult = document.querySelector('#palindrome-result');\n\n// Reverse the word and compare it with the original\n`
  }
];

window.moreHints = {
  dice: ['Listen for a click on rollButton.', 'Math.random() * 6 creates a number from 0 up to almost 6.', 'Use Math.floor(Math.random() * 6) + 1, then assign it to die.textContent.'],
  character: ['Use the input event so the count changes while typing.', 'The current text is message.value.', 'Set characterCount.textContent = message.value.length.'],
  greeting: ['Put a click event on greetButton.', 'Read nameInput.value and make sure it is not empty.', "Set output.textContent to 'Hello, ' + nameInput.value + '!'."],
  theme: ['Listen for a click on themeButton.', 'classList.toggle() adds a class when missing and removes it when present.', "Use card.classList.toggle('dark')."],
  accordion: ['The hidden property is a boolean.', 'Reverse a boolean with the ! operator.', 'Inside the click event, use answer.hidden = !answer.hidden.'],
  like: ['Change the likes variable inside the click event.', 'Increase a number with likes++ or likes += 1.', 'After increasing it, set likeDisplay.textContent = likes.'],
  converter: ['Convert celsius.value into a number first.', 'The formula is celsius × 9 / 5 + 32.', "Display the result with fahrenheit.textContent = 'Fahrenheit: ' + result."],
  guess: ['Listen for a click on checkButton.', 'Use Number(guessInput.value) before comparing.', 'Use if/else to set result.textContent for a correct or incorrect guess.'],
  'password-maker': ['Start with an empty password string inside the click event.', 'Repeat eight times and choose characters[Math.floor(Math.random() * characters.length)].', 'Add each character to the string, then set output.textContent to the password.'],
  'word-count': ['Use the input event and trim the current value.', 'An empty trimmed string should have a count of 0.', "Otherwise use text.split(/\\s+/).length and display it."],
  'cart-total': ['Put the calculation inside the button click.', 'Use prices.reduce((sum, price) => sum + price, 0).', "Display total.toFixed(2) in cartResult.textContent."],
  tabs: ['Loop through tabs with forEach.', 'Inside each click, read tab.dataset.content.', 'Assign that value to tabOutput.textContent.'],
  progress: ['Inside the click event, add 10 to progress.', 'Math.min(progress + 10, 100) prevents going over 100.', "Set progressBar.style.width to progress + '%' and update progressValue."],
  stopwatch: ['Start the timer only if timerId does not already exist.', 'Use setInterval to increase seconds and update the display every 1000ms.', 'The Stop button should call clearInterval(timerId) and clear timerId.'],
  quiz: ['Loop through answers and add a click event to each.', "The dataset value is text, so compare answer.dataset.correct === 'true'.", 'Set feedback.textContent to a correct or incorrect message.'],
  expense: ['Read the amount with Number(amountInput.value).', 'If it is greater than 0, add it to expenseTotal.', 'Display expenseTotal.toFixed(2) in totalDisplay.'],
  rps: ['Give every choice button a click event.', 'Pick the computer choice with a random array index.', 'Compare player and computer choices with if/else and update result.textContent.'],
  'form-validation': ['Listen for submit on form, not click on the button.', 'Call event.preventDefault() first.', "Check email.value.includes('@') and set message.textContent."],
  countdown: ['Start a setInterval inside the button click.', 'Every second, subtract 1 and update countDisplay.textContent.', 'When count reaches 0, call clearInterval(countdownId).'],
  'sort-numbers': ['Use numbers.slice() so you sort a copy.', 'Numeric sort needs (a, b) => a - b.', "Join the sorted numbers with ', ' and display them."],
  favorites: ['Loop through foodButtons and listen for clicks.', "Create an li and set li.textContent = button.dataset.food.", 'Append the new li to favoritesList.'],
  calculator: ['Loop through operationButtons and read button.dataset.operation.', 'Convert both input values with Number().', 'Use if/else or switch for the four operations, then update calcResult.textContent.'],
  palindrome: ['Read the word and convert it to lowercase.', "Reverse it with word.split('').reverse().join('').", 'Compare the original and reversed strings, then update palindromeResult.']
};

window.moreValidators = {
  dice: `(function(){const el=document.querySelector('#die');document.querySelector('#roll').addEventListener('click',function(){setTimeout(function(){const n=Number(el.textContent);const ok=Number.isInteger(n)&&n>=1&&n<=6;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! You rolled a number from 1 to 6.':'Roll was pressed, but #die does not show a number from 1 to 6.'},'*')},0)})})()`,
  character: `(function(){const input=document.querySelector('#message');const out=document.querySelector('#character-count');input.addEventListener('input',function(){setTimeout(function(){const ok=Number(out.textContent)===input.value.length;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The character count matches the message.':'The count does not match message.value.length yet.'},'*')},0)})})()`,
  greeting: `(function(){const input=document.querySelector('#name');const out=document.querySelector('#greeting-output');input.value='Gabriel';document.querySelector('#greet').addEventListener('click',function(){setTimeout(function(){const ok=out.textContent.includes('Gabriel')&&out.textContent!=='Your greeting appears here.';parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The greeting uses the entered name.':'The greeting did not use the name input yet.'},'*')},0)})})()`,
  theme: `(function(){const card=document.querySelector('#theme-card');const initial=card.className+'|'+card.getAttribute('style');document.querySelector('#theme-toggle').addEventListener('click',function(){setTimeout(function(){const after=card.className+'|'+card.getAttribute('style');parent.postMessage({type:after!==initial?'success':'warning',value:after!==initial?'Success! The theme changed.':'The button was pressed, but the card theme did not change.'},'*')},0)})})()`,
  accordion: `(function(){const answer=document.querySelector('#answer');document.querySelector('#question').addEventListener('click',function(){setTimeout(function(){const ok=!answer.hidden;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The answer was revealed.':'The answer is still hidden.'},'*')},0)})})()`,
  like: `(function(){const out=document.querySelector('#likes');document.querySelector('#like-button').addEventListener('click',function(){setTimeout(function(){const ok=Number(out.textContent)>0;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The like total increased.':'The displayed like total did not increase.'},'*')},0)})})()`,
  converter: `(function(){const out=document.querySelector('#fahrenheit');document.querySelector('#convert').addEventListener('click',function(){setTimeout(function(){const ok=out.textContent.includes('68');parent.postMessage({type:ok?'success':'warning',value:ok?'Success! 20°C was converted to 68°F.':'The result should show 68 for the provided value of 20°C.'},'*')},0)})})()`,
  guess: `(function(){const input=document.querySelector('#guess');const out=document.querySelector('#guess-result');input.value='7';document.querySelector('#check-guess').addEventListener('click',function(){setTimeout(function(){const ok=out.textContent!=='Make your guess.'&&out.textContent.trim().length>0;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The guess produced feedback.':'The result message did not change.'},'*')},0)})})()`,
  'password-maker': `(function(){const out=document.querySelector('#generated-password');document.querySelector('#generate-password').addEventListener('click',function(){setTimeout(function(){const value=(out.value||out.textContent).trim();const ok=value.length===8&&value!=='--------';parent.postMessage({type:ok?'success':'warning',value:ok?'Success! An eight-character password was generated.':'The generated password should contain exactly 8 characters.'},'*')},0)})})()`,
  'word-count': `(function(){const input=document.querySelector('#words-input');const out=document.querySelector('#word-total');input.value='JavaScript gets easier with practice';input.addEventListener('input',function(){setTimeout(function(){const text=input.value.trim();const expected=text?text.split(/\\s+/).length:0;const ok=expected>0&&Number(out.textContent)===expected;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The displayed word count is correct.':'The displayed total does not match the words entered.'},'*')},0)})})()`,
  'cart-total': `(function(){const out=document.querySelector('#cart-result');document.querySelector('#total-cart').addEventListener('click',function(){setTimeout(function(){const ok=out.textContent.includes('21.75');parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The cart total is correct.':'The three prices should total 21.75.'},'*')},0)})})()`,
  tabs: `(function(){const out=document.querySelector('#tab-output');document.querySelector('#profile-tabs').addEventListener('click',function(event){if(!event.target.matches('[data-content]'))return;setTimeout(function(){const ok=out.textContent===event.target.dataset.content;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The selected tab content appeared.':'The output does not match the clicked tab yet.'},'*')},0)})})()`,
  progress: `(function(){const out=document.querySelector('#progress-value');document.querySelector('#advance').addEventListener('click',function(){setTimeout(function(){const ok=Number(out.textContent)>=10;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! Progress advanced.':'The displayed progress did not increase.'},'*')},0)})})()`,
  stopwatch: `(function(){const out=document.querySelector('#seconds');document.querySelector('#start-timer').addEventListener('click',function(){const before=Number(out.textContent);setTimeout(function(){const ok=Number(out.textContent)>before;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The stopwatch is counting.':'The seconds did not increase after one second.'},'*')},1100)})})()`,
  quiz: `(function(){const out=document.querySelector('#quiz-feedback');document.body.addEventListener('click',function(event){if(!event.target.matches('[data-correct]'))return;setTimeout(function(){const ok=out.textContent!=='Choose an answer.';parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The quiz displayed feedback.':'The answer was clicked, but feedback did not change.'},'*')},0)})})()`,
  expense: `(function(){const input=document.querySelector('#expense-amount');const out=document.querySelector('#expense-total');input.value='12.50';document.querySelector('#add-expense').addEventListener('click',function(){setTimeout(function(){const ok=Number(out.textContent)>=12.5;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The expense was added.':'The running total did not include 12.50.'},'*')},0)})})()`,
  rps: `(function(){const out=document.querySelector('#rps-result');document.body.addEventListener('click',function(event){if(!event.target.matches('[data-choice]'))return;setTimeout(function(){const ok=out.textContent!=='Waiting for your choice.';parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The game displayed a result.':'A choice was made, but no result appeared.'},'*')},0)})})()`,
  'form-validation': `(function(){const input=document.querySelector('#email');const out=document.querySelector('#form-message');input.value='gabriel@example.com';document.querySelector('#email-form').addEventListener('submit',function(event){event.preventDefault();setTimeout(function(){const ok=out.textContent!=='Enter your email.';parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The form displayed validation feedback.':'The form submitted, but the message did not change.'},'*')},0)})})()`,
  countdown: `(function(){const out=document.querySelector('#countdown-value');document.querySelector('#start-countdown').addEventListener('click',function(){const before=Number(out.textContent);setTimeout(function(){const ok=Number(out.textContent)<before;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The countdown moved toward zero.':'The countdown did not decrease after one second.'},'*')},1100)})})()`,
  'sort-numbers': `(function(){const out=document.querySelector('#sorted-output');document.querySelector('#sort-button').addEventListener('click',function(){setTimeout(function(){const text=out.textContent;const ok=/3.*7.*19.*42.*100/.test(text);parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The numbers are in numeric order.':'Expected the order 3, 7, 19, 42, 100.'},'*')},0)})})()`,
  favorites: `(function(){const list=document.querySelector('#favorites-list');document.body.addEventListener('click',function(event){if(!event.target.matches('[data-food]'))return;setTimeout(function(){const ok=list.querySelectorAll('li').length>0;parent.postMessage({type:ok?'success':'warning',value:ok?'Success! A favorite food was added.':'The selected food was not appended as an li.'},'*')},0)})})()`,
  calculator: `(function(){const out=document.querySelector('#calc-result');document.body.addEventListener('click',function(event){if(!event.target.matches('[data-operation]'))return;setTimeout(function(){const ok=out.textContent!=='Result: —'&&/\\d/.test(out.textContent);parent.postMessage({type:ok?'success':'warning',value:ok?'Success! The calculator displayed a result.':'The operation did not produce a displayed result.'},'*')},0)})})()`,
  palindrome: `(function(){const input=document.querySelector('#palindrome-input');const out=document.querySelector('#palindrome-result');input.value='racecar';document.querySelector('#check-palindrome').addEventListener('click',function(){setTimeout(function(){const text=out.textContent.toLowerCase();const ok=out.textContent!=='Enter a word.'&&(text.includes('yes')||text.includes('palindrome')||text.includes('true'));parent.postMessage({type:ok?'success':'warning',value:ok?'Success! racecar was identified as a palindrome.':'The test word racecar should be identified as a palindrome.'},'*')},0)})})()`
};
