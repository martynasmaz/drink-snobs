// Drink recipes with ideal parameters
const recipes = {
    'black-coffee': {
        name: 'Black Coffee',
        type: 'coffee',
        description: 'A classic brewed coffee. Customers specify their preferred strength (light, medium, or strong) and brewing method (pour-over or drip).',
        ideal: {
            temperature: 96,
            strength: 'medium',
            method: 'pour-over'
        },
        tolerance: {
            temperature: 4
        },
        tips: 'Water should be 92-96°C. Listen to the customer for strength and method preferences!',
        specs: [
            { label: 'Water Temperature', value: '92-96°C (ideal: 96°C)' },
            { label: 'Brew Strength', value: 'As requested (light/medium/strong)' },
            { label: 'Brewing Method', value: 'As requested (pour-over/drip)' }
        ]
    },
    'espresso': {
        name: 'Espresso',
        type: 'espresso',
        description: 'Concentrated coffee brewed under high pressure. Requires precise control of temperature, pressure, extraction time, water amount, and coffee grounds.',
        ideal: {
            temperature: 93,
            pressure: 9,
            extractionTime: 27,
            waterAmount: 30,
            beansAmount: 18
        },
        tolerance: {
            temperature: 3,
            pressure: 1,
            extractionTime: 3,
            waterAmount: 5,
            beansAmount: 2
        },
        tips: '9 bars pressure, 25-30 sec extraction, 30ml water, 18g coffee for a perfect shot.',
        specs: [
            { label: 'Water Temperature', value: '90-96°C (ideal: 93°C)' },
            { label: 'Pressure', value: '8-10 bars (ideal: 9 bars)' },
            { label: 'Extraction Time', value: '25-30 sec (ideal: 27 sec)' },
            { label: 'Water Amount', value: '25-35 ml (ideal: 30 ml)' },
            { label: 'Coffee Grounds', value: '16-20 g (ideal: 18 g)' }
        ]
    },
    'green-tea': {
        name: 'Green Tea',
        type: 'tea',
        description: 'Delicate tea requiring lower temperatures. Boiling water will make it bitter!',
        ideal: {
            temperature: 75,
            steepTime: 2
        },
        tolerance: {
            temperature: 5,
            steepTime: 0.5
        },
        tips: 'Never use boiling water! 70-80°C is ideal. Steep for 1.5-2.5 minutes.',
        specs: [
            { label: 'Water Temperature', value: '70-80°C (ideal: 75°C)' },
            { label: 'Steep Time', value: '1.5-2.5 min (ideal: 2 min)' },
            { label: 'Warning', value: 'Never use boiling water!' }
        ]
    },
    'black-tea': {
        name: 'Black Tea',
        type: 'tea',
        description: 'Robust tea that likes hot water and longer steeping.',
        ideal: {
            temperature: 95,
            steepTime: 4
        },
        tolerance: {
            temperature: 5,
            steepTime: 1
        },
        tips: 'Use water just off the boil. Steep 3-5 minutes.',
        specs: [
            { label: 'Water Temperature', value: '90-100°C (ideal: 95°C)' },
            { label: 'Steep Time', value: '3-5 min (ideal: 4 min)' }
        ]
    }
};

// Unavailable drinks that customers might order
const unavailableDrinks = [
    { name: 'Latte', phrases: ["I'd like a latte, please.", "Can I get a latte?", "One latte for me."] },
    { name: 'Cappuccino', phrases: ["A cappuccino, please.", "I'll have a cappuccino.", "One cappuccino."] },
    { name: 'Mocha', phrases: ["Can I get a mocha?", "I'd love a mocha.", "One mocha please."] },
    { name: 'Americano', phrases: ["An Americano, please.", "I'll take an Americano.", "One Americano."] },
    { name: 'Matcha Latte', phrases: ["Do you have matcha latte?", "I'd like a matcha latte.", "One matcha latte please."] },
    { name: 'Chai Latte', phrases: ["A chai latte, please.", "Can I get a chai latte?", "I'll have chai latte."] },
    { name: 'Iced Coffee', phrases: ["Do you have iced coffee?", "I'd like an iced coffee.", "One iced coffee please."] },
    { name: 'Frappuccino', phrases: ["Can I get a frappuccino?", "One frappuccino please.", "I'd like a frappuccino."] }
];

// Customer avatars
const customerAvatars = ['🧑', '👩', '👨', '🧔', '👵', '👴', '👩‍🦰', '👨‍🦱', '👩‍🦳', '🧑‍🦲'];

// Order phrases for available drinks
const orderPhrases = {
    'black-coffee': {
        'light': {
            'pour-over': ["I'd like a light pour-over coffee, please.", "Light pour-over coffee for me.", "Could I get a light coffee, pour-over style?"],
            'drip': ["I'd like a light drip coffee, please.", "Light drip coffee for me.", "Just a light drip coffee, thanks."]
        },
        'medium': {
            'pour-over': ["I'd like a pour-over coffee, please.", "One pour-over coffee for me.", "Could I get a pour-over coffee?"],
            'drip': ["I'd like a drip coffee, please.", "One drip coffee for me.", "Just a regular drip coffee, thanks."]
        },
        'strong': {
            'pour-over': ["I'd like a strong pour-over coffee, please.", "Strong pour-over for me.", "Make it a strong pour-over coffee."],
            'drip': ["I'd like a strong drip coffee, please.", "Strong drip coffee for me.", "I need a strong drip coffee."]
        }
    },
    'espresso': [
        "An espresso, please.",
        "I need a shot of espresso.",
        "One espresso, nice and strong.",
        "Espresso for me, thanks.",
        "Just a quick espresso, please."
    ],
    'green-tea': [
        "I'd love some green tea, please.",
        "Green tea for me.",
        "Could I have a green tea?",
        "One green tea, please.",
        "I'll have the green tea."
    ],
    'black-tea': [
        "A black tea, please.",
        "I'd like some black tea.",
        "One black tea for me.",
        "Could I get a black tea?",
        "Black tea, please and thank you."
    ]
};

// Review templates
const reviewTemplates = {
    perfect: [
        "Absolutely perfect! This is exactly how it should be made.",
        "Incredible! You really know your craft.",
        "This is the best {drink} I've ever had!",
        "Perfection in a cup. I'm impressed!"
    ],
    good: [
        "Really good! Just a tiny bit off, but delicious.",
        "Very nice {drink}! Almost perfect.",
        "Great job! This is quite good.",
        "I'm happy with this {drink}. Nice work!"
    ],
    okay: [
        "It's okay... could be better.",
        "Hmm, something's a bit off, but drinkable.",
        "Not quite right, but I'll manage.",
        "Average {drink}, I suppose."
    ],
    bad: [
        "This isn't right at all...",
        "Did you read the recipe? This is wrong.",
        "This is disappointing.",
        "I think you need more practice."
    ],
    terrible: [
        "This is awful! What did you do?!",
        "I can't drink this.",
        "Did you even try?",
        "I'm leaving a bad review."
    ],
    wrongDrink: [
        "Um... I ordered {ordered}, not {served}.",
        "This isn't what I asked for!",
        "I wanted {ordered}. This is {served}.",
        "Wrong drink! I asked for {ordered}."
    ],
    suggestionAccepted: [
        "Hmm, okay I'll try the {drink} instead.",
        "Sure, {drink} sounds good.",
        "Alright, I'll have {drink} then.",
        "Fine, give me {drink}."
    ],
    suggestionRejected: [
        "No thanks, I'll go somewhere else.",
        "Never mind then.",
        "That's not what I wanted. Bye.",
        "I'll pass. Thanks anyway."
    ],
    furious: [
        "WHAT?! I can literally SEE the {drink} right there! Are you kidding me?!",
        "You DON'T have {drink}?! It's ON YOUR DAMN MENU! What kind of scam is this?!",
        "Excuse me?! I just watched you make {drink} for the last customer! This is BS!",
        "Are you BLIND?! The {drink} is RIGHT THERE! I'm never coming back here!",
        "You're lying to my face! I can smell the {drink} brewing! Unbelievable!",
        "What the hell?! You clearly have {drink}! This is the worst service I've ever had!"
    ]
};

// Game state
let currentOrder = null;
let selectedDrink = null;
let isUnavailableOrder = false;
let currentSettings = {
    temperature: 70,
    steepTime: 3,
    strength: 'medium',
    method: 'pour-over',
    pressure: 9,
    extractionTime: 25,
    waterAmount: 30,
    beansAmount: 18
};
let totalServed = 0;
let totalRating = 0;
let reviewCount = 0;
let coolingInterval = null;
const COOL_DOWN_SECONDS = 3;

// DOM Elements
const customerOrderEl = document.getElementById('customer-order');
const customerAvatarEl = document.getElementById('customer-avatar');
const nextCustomerBtn = document.getElementById('next-customer-btn');
const sorryBtn = document.getElementById('sorry-btn');
const suggestionPanel = document.getElementById('suggestion-panel');
const serveBtn = document.getElementById('serve-btn');
const reviewArea = document.getElementById('review-area');
const reviewStars = document.getElementById('review-stars');
const reviewText = document.getElementById('review-text');
const ratingDisplay = document.getElementById('rating');
const servedCount = document.getElementById('served-count');
const liquid = document.getElementById('liquid');
const drinkNameEl = document.getElementById('drink-name');

// Control elements
const tempValue = document.getElementById('temp-value');
const steepValue = document.getElementById('steep-value');
const strengthValue = document.getElementById('strength-value');
const methodValue = document.getElementById('method-value');
const pressureValue = document.getElementById('pressure-value');
const extractionValue = document.getElementById('extraction-value');
const waterValue = document.getElementById('water-value');
const beansValue = document.getElementById('beans-value');

const tempControl = document.getElementById('temp-control');
const steepControl = document.getElementById('steep-control');
const methodControl = document.getElementById('method-control');
const strengthControl = document.getElementById('strength-control');
const pressureControl = document.getElementById('pressure-control');
const extractionControl = document.getElementById('extraction-control');
const waterControl = document.getElementById('water-control');
const beansControl = document.getElementById('beans-control');

const coolBtn = document.getElementById('cool-btn');
const coolTimer = document.getElementById('cool-timer');

// Modal elements
const recipeModal = document.getElementById('recipe-modal');
const bookBtn = document.getElementById('book-btn');
const closeModal = document.getElementById('close-modal');
const recipeContent = document.getElementById('recipe-content');

// Initialize game
function init() {
    setupEventListeners();
    hideAllControls();
    showRecipe('black-coffee');
}

// Setup all event listeners
function setupEventListeners() {
    // Main buttons
    nextCustomerBtn.addEventListener('click', nextCustomer);
    sorryBtn.addEventListener('click', showSuggestions);
    serveBtn.addEventListener('click', serveDrink);

    // Drink selection buttons
    document.querySelectorAll('.drink-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectDrink(this.getAttribute('data-drink'));
        });
    });

    // Suggestion buttons
    document.querySelectorAll('.suggest-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            suggestDrink(this.getAttribute('data-drink'));
        });
    });

    // Temperature controls
    document.querySelectorAll('.temp-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const change = parseFloat(this.getAttribute('data-change'));
            currentSettings.temperature = Math.max(60, Math.min(100, currentSettings.temperature + change));
            tempValue.textContent = currentSettings.temperature;
        });
    });

    document.querySelectorAll('.temp-preset').forEach(btn => {
        btn.addEventListener('click', function() {
            currentSettings.temperature = parseInt(this.getAttribute('data-value'));
            tempValue.textContent = currentSettings.temperature;
        });
    });

    // Cool button
    coolBtn.addEventListener('click', startCooling);

    // Steep time controls
    document.querySelectorAll('.steep-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const change = parseFloat(this.getAttribute('data-change'));
            currentSettings.steepTime = Math.max(0.5, Math.min(10, currentSettings.steepTime + change));
            steepValue.textContent = currentSettings.steepTime;
        });
    });

    // Method controls
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSettings.method = this.getAttribute('data-method');
            methodValue.textContent = currentSettings.method === 'pour-over' ? 'Pour-over' : 'Drip';
        });
    });

    // Strength controls
    document.querySelectorAll('.strength-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.strength-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSettings.strength = this.getAttribute('data-strength');
            strengthValue.textContent = capitalizeFirst(currentSettings.strength);
        });
    });

    // Pressure controls
    document.querySelectorAll('.pressure-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const change = parseInt(this.getAttribute('data-change'));
            currentSettings.pressure = Math.max(5, Math.min(15, currentSettings.pressure + change));
            pressureValue.textContent = currentSettings.pressure;
        });
    });

    // Extraction time controls
    document.querySelectorAll('.extraction-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const change = parseInt(this.getAttribute('data-change'));
            currentSettings.extractionTime = Math.max(15, Math.min(45, currentSettings.extractionTime + change));
            extractionValue.textContent = currentSettings.extractionTime;
        });
    });

    // Water amount controls
    document.querySelectorAll('.water-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const change = parseInt(this.getAttribute('data-change'));
            currentSettings.waterAmount = Math.max(15, Math.min(60, currentSettings.waterAmount + change));
            waterValue.textContent = currentSettings.waterAmount;
        });
    });

    // Beans amount controls
    document.querySelectorAll('.beans-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const change = parseInt(this.getAttribute('data-change'));
            currentSettings.beansAmount = Math.max(10, Math.min(25, currentSettings.beansAmount + change));
            beansValue.textContent = currentSettings.beansAmount;
        });
    });

    // Recipe book modal
    bookBtn.addEventListener('click', () => recipeModal.classList.add('open'));
    closeModal.addEventListener('click', () => recipeModal.classList.remove('open'));
    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) recipeModal.classList.remove('open');
    });

    document.querySelectorAll('.recipe-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.recipe-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showRecipe(this.getAttribute('data-drink'));
        });
    });
}

// Start cooling process
function startCooling() {
    if (coolingInterval || currentSettings.temperature <= 60) return;

    coolBtn.disabled = true;
    coolBtn.classList.add('cooling');
    coolBtn.textContent = 'Cooling...';
    let secondsLeft = COOL_DOWN_SECONDS;
    coolTimer.textContent = secondsLeft + 's';

    coolingInterval = setInterval(() => {
        secondsLeft--;
        coolTimer.textContent = secondsLeft + 's';

        if (secondsLeft <= 0) {
            clearInterval(coolingInterval);
            coolingInterval = null;
            currentSettings.temperature = Math.max(60, currentSettings.temperature - 1);
            tempValue.textContent = currentSettings.temperature;
            coolBtn.disabled = false;
            coolBtn.classList.remove('cooling');
            coolBtn.textContent = 'Let it cool (-1°C)';
            coolTimer.textContent = '';
        }
    }, 1000);
}

// Next customer
function nextCustomer() {
    // 30% chance of unavailable drink
    if (Math.random() < 0.3) {
        const unavailable = unavailableDrinks[Math.floor(Math.random() * unavailableDrinks.length)];
        const phrase = unavailable.phrases[Math.floor(Math.random() * unavailable.phrases.length)];

        currentOrder = { unavailable: unavailable.name };
        isUnavailableOrder = true;
        customerOrderEl.textContent = phrase;
        serveBtn.disabled = true;
    } else {
        // Available drink
        const drinkKeys = Object.keys(recipes);
        const randomDrink = drinkKeys[Math.floor(Math.random() * drinkKeys.length)];
        let phrase, requestedStrength = null, requestedMethod = null;

        if (randomDrink === 'black-coffee') {
            const strengths = ['light', 'medium', 'strong'];
            const methods = ['pour-over', 'drip'];
            requestedStrength = strengths[Math.floor(Math.random() * strengths.length)];
            requestedMethod = methods[Math.floor(Math.random() * methods.length)];
            const phrases = orderPhrases[randomDrink][requestedStrength][requestedMethod];
            phrase = phrases[Math.floor(Math.random() * phrases.length)];
        } else {
            const phrases = orderPhrases[randomDrink];
            phrase = phrases[Math.floor(Math.random() * phrases.length)];
        }

        currentOrder = {
            drink: randomDrink,
            strength: requestedStrength,
            method: requestedMethod
        };
        isUnavailableOrder = false;
        customerOrderEl.textContent = phrase;
    }

    // Reset UI
    customerAvatarEl.textContent = customerAvatars[Math.floor(Math.random() * customerAvatars.length)];
    selectedDrink = null;
    suggestionPanel.style.display = 'none';
    reviewArea.style.display = 'none';
    nextCustomerBtn.textContent = 'Skip Customer';
    sorryBtn.style.display = 'inline-block';  // Always show - player can lie or legitimately not have it

    // Clear drink selection
    document.querySelectorAll('.drink-btn').forEach(btn => btn.classList.remove('selected'));

    // Reset cup and controls
    liquid.className = 'liquid';
    drinkNameEl.textContent = 'Select a drink above';
    hideAllControls();
    resetSettings();
    serveBtn.disabled = true;
}

// Show suggestions panel for unavailable drinks
function showSuggestions() {
    // Check if player is LYING - the drink IS actually available!
    if (!isUnavailableOrder && currentOrder && currentOrder.drink) {
        const orderedDrink = recipes[currentOrder.drink];
        const templates = reviewTemplates.furious;
        const response = templates[Math.floor(Math.random() * templates.length)]
            .replace('{drink}', orderedDrink.name.toLowerCase());

        customerOrderEl.textContent = response;
        sorryBtn.style.display = 'none';
        suggestionPanel.style.display = 'none';

        // Furious 1-star review
        reviewCount++;
        totalRating += 1;
        ratingDisplay.textContent = (totalRating / reviewCount).toFixed(1);

        reviewStars.textContent = '⭐☆☆☆☆';
        reviewText.textContent = "LIED to me about having " + orderedDrink.name + "! NEVER going back!";
        reviewArea.style.display = 'block';

        // Reset state
        currentOrder = null;
        selectedDrink = null;
        nextCustomerBtn.textContent = 'Next Customer';
        drinkNameEl.textContent = 'Select a drink above';
        liquid.className = 'liquid';
        hideAllControls();
        document.querySelectorAll('.drink-btn').forEach(btn => btn.classList.remove('selected'));
        return;
    }

    // Normal flow for actually unavailable drinks
    suggestionPanel.style.display = 'block';
    sorryBtn.style.display = 'none';
    customerOrderEl.textContent = "Oh, you don't have that? What do you have then?";
}

// Suggest a drink to customer
function suggestDrink(drink) {
    // 70% chance customer accepts
    if (Math.random() < 0.7) {
        const templates = reviewTemplates.suggestionAccepted;
        const response = templates[Math.floor(Math.random() * templates.length)]
            .replace('{drink}', recipes[drink].name.toLowerCase());
        customerOrderEl.textContent = response;

        // Convert to regular order
        currentOrder = { drink: drink, strength: 'medium', method: 'pour-over' };
        isUnavailableOrder = false;
        suggestionPanel.style.display = 'none';
    } else {
        // Customer rejects and leaves
        const templates = reviewTemplates.suggestionRejected;
        customerOrderEl.textContent = templates[Math.floor(Math.random() * templates.length)];
        suggestionPanel.style.display = 'none';

        // Bad review for not having what they wanted
        reviewCount++;
        totalRating += 2;
        ratingDisplay.textContent = (totalRating / reviewCount).toFixed(1);

        reviewStars.textContent = '⭐⭐☆☆☆';
        reviewText.textContent = "They didn't have what I wanted.";
        reviewArea.style.display = 'block';

        currentOrder = null;
        nextCustomerBtn.textContent = 'Next Customer';
    }
}

// Select drink to make
function selectDrink(drink) {
    if (!currentOrder || isUnavailableOrder) return;

    selectedDrink = drink;

    // Update button states
    document.querySelectorAll('.drink-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.getAttribute('data-drink') === drink);
    });

    // Update cup display
    updateCupDisplay(drink);
    drinkNameEl.textContent = recipes[drink].name;

    // Show appropriate controls
    showControlsForDrink(drink);

    // Enable serve button
    serveBtn.disabled = false;
}

// Show controls based on drink type
function showControlsForDrink(drink) {
    hideAllControls();
    tempControl.classList.remove('hidden');

    const type = recipes[drink].type;
    if (type === 'tea') {
        steepControl.classList.remove('hidden');
    } else if (type === 'coffee') {
        methodControl.classList.remove('hidden');
        strengthControl.classList.remove('hidden');
    } else if (type === 'espresso') {
        pressureControl.classList.remove('hidden');
        extractionControl.classList.remove('hidden');
        waterControl.classList.remove('hidden');
        beansControl.classList.remove('hidden');
    }
}

// Hide all drink-specific controls
function hideAllControls() {
    steepControl.classList.add('hidden');
    methodControl.classList.add('hidden');
    strengthControl.classList.add('hidden');
    pressureControl.classList.add('hidden');
    extractionControl.classList.add('hidden');
    waterControl.classList.add('hidden');
    beansControl.classList.add('hidden');
}

// Update cup display
function updateCupDisplay(drink) {
    liquid.className = 'liquid';
    if (drink === 'black-coffee') liquid.classList.add('coffee');
    else if (drink === 'espresso') liquid.classList.add('espresso');
    else if (drink === 'green-tea') liquid.classList.add('green-tea');
    else if (drink === 'black-tea') liquid.classList.add('black-tea');
}

// Reset settings to defaults
function resetSettings() {
    if (coolingInterval) {
        clearInterval(coolingInterval);
        coolingInterval = null;
        coolBtn.disabled = false;
        coolBtn.classList.remove('cooling');
        coolBtn.textContent = 'Let it cool (-1°C)';
        coolTimer.textContent = '';
    }

    currentSettings = {
        temperature: 70,
        steepTime: 3,
        strength: 'medium',
        method: 'pour-over',
        pressure: 9,
        extractionTime: 25,
        waterAmount: 30,
        beansAmount: 18
    };

    tempValue.textContent = currentSettings.temperature;
    steepValue.textContent = currentSettings.steepTime;
    strengthValue.textContent = 'Medium';
    methodValue.textContent = 'Pour-over';
    pressureValue.textContent = currentSettings.pressure;
    extractionValue.textContent = currentSettings.extractionTime;
    waterValue.textContent = currentSettings.waterAmount;
    beansValue.textContent = currentSettings.beansAmount;

    // Reset button states
    document.querySelectorAll('.strength-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-strength') === 'medium');
    });
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-method') === 'pour-over');
    });
}

// Serve drink
function serveDrink() {
    if (!currentOrder || !selectedDrink) return;

    let score, review;
    const orderedRecipe = recipes[currentOrder.drink];
    const servedRecipe = recipes[selectedDrink];

    // Wrong drink?
    if (selectedDrink !== currentOrder.drink) {
        score = 1;
        const templates = reviewTemplates.wrongDrink;
        review = templates[Math.floor(Math.random() * templates.length)]
            .replace('{ordered}', orderedRecipe.name.toLowerCase())
            .replace('{served}', servedRecipe.name.toLowerCase());
    } else {
        score = calculateScore(orderedRecipe, currentOrder);
        review = generateReview(score, orderedRecipe);
    }

    const stars = Math.round(score);

    // Update stats
    totalServed++;
    reviewCount++;
    totalRating += stars;
    servedCount.textContent = totalServed;
    ratingDisplay.textContent = (totalRating / reviewCount).toFixed(1);

    // Show review
    reviewStars.textContent = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
    reviewText.textContent = review;
    reviewArea.style.display = 'block';

    // Reset
    serveBtn.disabled = true;
    currentOrder = null;
    selectedDrink = null;
    nextCustomerBtn.textContent = 'Next Customer';
    drinkNameEl.textContent = 'Select a drink above';
    liquid.className = 'liquid';
    hideAllControls();
    document.querySelectorAll('.drink-btn').forEach(btn => btn.classList.remove('selected'));
}

// Calculate score
function calculateScore(recipe, order) {
    let totalScore = 0;
    let factors = 0;

    // Temperature (all drinks)
    const tempDiff = Math.abs(currentSettings.temperature - recipe.ideal.temperature);
    totalScore += Math.max(0, 5 - (tempDiff / recipe.tolerance.temperature) * 2.5);
    factors++;

    if (recipe.type === 'tea') {
        const steepDiff = Math.abs(currentSettings.steepTime - recipe.ideal.steepTime);
        totalScore += Math.max(0, 5 - (steepDiff / recipe.tolerance.steepTime) * 2.5);
        factors++;
    } else if (recipe.type === 'coffee') {
        // Strength
        totalScore += currentSettings.strength === order.strength ? 5 : 1;
        factors++;
        // Method
        totalScore += currentSettings.method === order.method ? 5 : 2;
        factors++;
    } else if (recipe.type === 'espresso') {
        // Pressure
        const pressureDiff = Math.abs(currentSettings.pressure - recipe.ideal.pressure);
        totalScore += Math.max(0, 5 - (pressureDiff / recipe.tolerance.pressure) * 2.5);
        factors++;
        // Extraction time
        const extractDiff = Math.abs(currentSettings.extractionTime - recipe.ideal.extractionTime);
        totalScore += Math.max(0, 5 - (extractDiff / recipe.tolerance.extractionTime) * 2.5);
        factors++;
        // Water amount
        const waterDiff = Math.abs(currentSettings.waterAmount - recipe.ideal.waterAmount);
        totalScore += Math.max(0, 5 - (waterDiff / recipe.tolerance.waterAmount) * 2.5);
        factors++;
        // Beans amount
        const beansDiff = Math.abs(currentSettings.beansAmount - recipe.ideal.beansAmount);
        totalScore += Math.max(0, 5 - (beansDiff / recipe.tolerance.beansAmount) * 2.5);
        factors++;
    }

    return totalScore / factors;
}

// Generate review
function generateReview(score, recipe) {
    let templates;
    if (score >= 4.5) templates = reviewTemplates.perfect;
    else if (score >= 3.5) templates = reviewTemplates.good;
    else if (score >= 2.5) templates = reviewTemplates.okay;
    else if (score >= 1.5) templates = reviewTemplates.bad;
    else templates = reviewTemplates.terrible;

    return templates[Math.floor(Math.random() * templates.length)]
        .replace('{drink}', recipe.name.toLowerCase());
}

// Show recipe in modal
function showRecipe(drinkId) {
    const recipe = recipes[drinkId];
    let specsHtml = recipe.specs.map(spec =>
        `<li><strong>${spec.label}:</strong> ${spec.value}</li>`
    ).join('');

    recipeContent.innerHTML = `
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <p><em>💡 Tip: ${recipe.tips}</em></p>
        <div class="recipe-specs">
            <h4>Ideal Parameters:</h4>
            <ul>${specsHtml}</ul>
        </div>
    `;
}

// Helper
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start
init();
