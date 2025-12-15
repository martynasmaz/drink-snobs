// Drink recipes with ideal parameters
const recipes = {
    'black-coffee': {
        name: 'Black Coffee',
        type: 'coffee',
        description: 'A classic brewed coffee made by pouring hot water over ground coffee beans. Best enjoyed with a medium roast for balanced flavor.',
        ideal: {
            temperature: 96,  // °C - just off boiling
            strength: 'medium'
        },
        tolerance: {
            temperature: 4  // ±4°C acceptable
        },
        tips: 'Water should be between 92-96°C (just off the boil). Too hot and it becomes bitter, too cool and it tastes weak.',
        specs: [
            { label: 'Water Temperature', value: '92-96°C (ideal: 96°C)' },
            { label: 'Brew Strength', value: 'Medium' },
            { label: 'Brewing Method', value: 'Pour-over or drip' }
        ]
    },
    'espresso': {
        name: 'Espresso',
        type: 'espresso',
        description: 'A concentrated coffee brewed by forcing hot water through finely-ground coffee under high pressure. The foundation of many coffee drinks.',
        ideal: {
            temperature: 93,  // °C
            pressure: 9       // bars
        },
        tolerance: {
            temperature: 3,
            pressure: 1
        },
        tips: 'Pressure is critical - 9 bars is the sweet spot. Temperature should be 90-96°C for optimal extraction.',
        specs: [
            { label: 'Water Temperature', value: '90-96°C (ideal: 93°C)' },
            { label: 'Pressure', value: '8-10 bars (ideal: 9 bars)' },
            { label: 'Extraction Time', value: '25-30 seconds' }
        ]
    },
    'green-tea': {
        name: 'Green Tea',
        type: 'tea',
        description: 'A delicate tea that requires lower temperatures to prevent bitterness. The leaves are not oxidized, preserving their fresh, grassy flavor.',
        ideal: {
            temperature: 75,  // °C - much lower than black tea!
            steepTime: 2      // minutes
        },
        tolerance: {
            temperature: 5,
            steepTime: 0.5
        },
        tips: 'Green tea is very sensitive to temperature! Boiling water will scorch the leaves and make it bitter. Let water cool after boiling.',
        specs: [
            { label: 'Water Temperature', value: '70-80°C (ideal: 75°C)' },
            { label: 'Steep Time', value: '1.5-2.5 min (ideal: 2 min)' },
            { label: 'Note', value: 'Never use boiling water!' }
        ]
    },
    'black-tea': {
        name: 'Black Tea',
        type: 'tea',
        description: 'A fully oxidized tea with robust, bold flavors. Can handle higher temperatures and longer steeping than green tea.',
        ideal: {
            temperature: 95,  // °C - near boiling
            steepTime: 4      // minutes
        },
        tolerance: {
            temperature: 5,
            steepTime: 1
        },
        tips: 'Black tea likes it hot! Use water just off the boil. Steep 3-5 minutes depending on desired strength.',
        specs: [
            { label: 'Water Temperature', value: '90-100°C (ideal: 95°C)' },
            { label: 'Steep Time', value: '3-5 min (ideal: 4 min)' },
            { label: 'Note', value: 'Longer steeping = stronger tea' }
        ]
    }
};

// Customer personas and their orders
const customerAvatars = ['🧑', '👩', '👨', '🧔', '👵', '👴', '👩‍🦰', '👨‍🦱', '👩‍🦳', '🧑‍🦲'];

const orderPhrases = {
    'black-coffee': [
        "I'd like a black coffee, please.",
        "One black coffee for me.",
        "Could I get a simple black coffee?",
        "Just a regular black coffee, thanks.",
        "Black coffee, nothing fancy."
    ],
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

// Review templates based on score
const reviewTemplates = {
    perfect: [
        "Absolutely perfect! This is exactly how it should be made.",
        "Incredible! You really know your craft.",
        "This is the best {drink} I've ever had!",
        "Perfection in a cup. I'm impressed!",
        "You're a true master of {drink}!"
    ],
    good: [
        "Really good! Just a tiny bit off, but delicious.",
        "Very nice {drink}! Almost perfect.",
        "Great job! This is quite good.",
        "Mmm, this is lovely. Well done!",
        "I'm happy with this {drink}. Nice work!"
    ],
    okay: [
        "It's okay... could be better.",
        "Hmm, something's a bit off, but drinkable.",
        "Not quite right, but I'll manage.",
        "Average {drink}, I suppose.",
        "I've had better, but also worse."
    ],
    bad: [
        "This isn't right at all...",
        "Did you read the recipe? This is wrong.",
        "I can't drink this. The {param} is way off.",
        "This is disappointing. {drink} shouldn't taste like this.",
        "I think you need to study the recipe book more."
    ],
    terrible: [
        "This is awful! What did you do?!",
        "I'm not paying for this disaster.",
        "Did you even try? This is undrinkable!",
        "This is the worst {drink} I've ever had!",
        "I'm leaving a bad review. This is terrible."
    ]
};

// Game state
let currentOrder = null;
let currentSettings = {
    temperature: 70,
    steepTime: 3,
    strength: 'medium',
    pressure: 9
};
let totalServed = 0;
let totalRating = 0;
let reviewCount = 0;
let coolingInterval = null;
const COOL_DOWN_SECONDS = 5; // Time to wait for 1°C drop

// DOM elements
const customerOrder = document.getElementById('customer-order');
const customerAvatar = document.querySelector('.customer-avatar');
const nextCustomerBtn = document.getElementById('next-customer-btn');
const serveBtn = document.getElementById('serve-btn');
const prepStation = document.getElementById('prep-station');
const reviewArea = document.getElementById('review-area');
const reviewStars = document.getElementById('review-stars');
const reviewText = document.getElementById('review-text');
const ratingDisplay = document.getElementById('rating');
const servedCount = document.getElementById('served-count');
const liquid = document.getElementById('liquid');
const drinkName = document.getElementById('drink-name');

// Control elements
const tempValue = document.getElementById('temp-value');
const steepValue = document.getElementById('steep-value');
const strengthValue = document.getElementById('strength-value');
const pressureValue = document.getElementById('pressure-value');
const steepControl = document.getElementById('steep-control');
const strengthControl = document.getElementById('strength-control');
const pressureControl = document.getElementById('pressure-control');

// Modal elements
const recipeModal = document.getElementById('recipe-modal');
const bookBtn = document.getElementById('book-btn');
const closeModal = document.getElementById('close-modal');
const recipeContent = document.getElementById('recipe-content');
const recipeTabs = document.querySelectorAll('.recipe-tab');

// Cool button elements
const coolBtn = document.getElementById('cool-btn');
const coolTimer = document.getElementById('cool-timer');

// Initialize
function init() {
    setupEventListeners();
    updateControlVisibility(null);
    showRecipe('black-coffee');
}

// Setup event listeners
function setupEventListeners() {
    nextCustomerBtn.addEventListener('click', nextCustomer);
    serveBtn.addEventListener('click', serveDrink);

    // Temperature controls
    document.querySelectorAll('[data-temp]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const change = e.target.dataset.temp;
            if (change.includes('+') || change.includes('-')) {
                currentSettings.temperature += parseInt(change);
            } else {
                currentSettings.temperature = parseInt(change);
            }
            currentSettings.temperature = Math.max(60, Math.min(100, currentSettings.temperature));
            tempValue.textContent = currentSettings.temperature;
        });
    });

    // Steep time controls
    document.querySelectorAll('[data-steep]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentSettings.steepTime += parseFloat(e.target.dataset.steep);
            currentSettings.steepTime = Math.max(0.5, Math.min(10, currentSettings.steepTime));
            steepValue.textContent = currentSettings.steepTime;
        });
    });

    // Strength controls
    document.querySelectorAll('.strength-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.strength-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentSettings.strength = e.target.dataset.strength;
            strengthValue.textContent = capitalizeFirst(currentSettings.strength);
        });
    });

    // Pressure controls
    document.querySelectorAll('[data-pressure]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentSettings.pressure += parseInt(e.target.dataset.pressure);
            currentSettings.pressure = Math.max(5, Math.min(15, currentSettings.pressure));
            pressureValue.textContent = currentSettings.pressure;
        });
    });

    // Recipe book modal
    bookBtn.addEventListener('click', () => recipeModal.classList.add('open'));
    closeModal.addEventListener('click', () => recipeModal.classList.remove('open'));
    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) recipeModal.classList.remove('open');
    });

    recipeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            recipeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showRecipe(tab.dataset.drink);
        });
    });

    // Cool button
    coolBtn.addEventListener('click', startCooling);
}

// Start cooling process
function startCooling() {
    if (coolingInterval || currentSettings.temperature <= 60) return;

    coolBtn.disabled = true;
    coolBtn.classList.add('cooling');
    let secondsLeft = COOL_DOWN_SECONDS;
    coolTimer.textContent = `${secondsLeft}s`;

    coolingInterval = setInterval(() => {
        secondsLeft--;
        coolTimer.textContent = `${secondsLeft}s`;

        if (secondsLeft <= 0) {
            clearInterval(coolingInterval);
            coolingInterval = null;

            // Drop temperature by 1 degree
            currentSettings.temperature = Math.max(60, currentSettings.temperature - 1);
            tempValue.textContent = currentSettings.temperature;

            // Reset button
            coolBtn.disabled = false;
            coolBtn.classList.remove('cooling');
            coolTimer.textContent = '';
        }
    }, 1000);
}

// Next customer
function nextCustomer() {
    const drinkKeys = Object.keys(recipes);
    const randomDrink = drinkKeys[Math.floor(Math.random() * drinkKeys.length)];
    const randomPhrase = orderPhrases[randomDrink][Math.floor(Math.random() * orderPhrases[randomDrink].length)];
    const randomAvatar = customerAvatars[Math.floor(Math.random() * customerAvatars.length)];

    currentOrder = randomDrink;
    customerOrder.textContent = randomPhrase;
    customerAvatar.textContent = randomAvatar;

    // Update UI
    updateControlVisibility(recipes[randomDrink].type);
    updateCupDisplay(randomDrink);
    drinkName.textContent = recipes[randomDrink].name;
    serveBtn.disabled = false;
    reviewArea.style.display = 'none';
    nextCustomerBtn.textContent = 'Skip Customer';

    // Reset settings to defaults
    resetSettings();
}

// Reset settings to reasonable defaults
function resetSettings() {
    // Cancel any cooling in progress
    if (coolingInterval) {
        clearInterval(coolingInterval);
        coolingInterval = null;
        coolBtn.disabled = false;
        coolBtn.classList.remove('cooling');
        coolTimer.textContent = '';
    }

    currentSettings.temperature = 70;
    currentSettings.steepTime = 3;
    currentSettings.strength = 'medium';
    currentSettings.pressure = 9;

    tempValue.textContent = currentSettings.temperature;
    steepValue.textContent = currentSettings.steepTime;
    pressureValue.textContent = currentSettings.pressure;
    strengthValue.textContent = 'Medium';

    document.querySelectorAll('.strength-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.strength === 'medium');
    });
}

// Update which controls are visible based on drink type
function updateControlVisibility(type) {
    steepControl.classList.toggle('hidden', type !== 'tea');
    strengthControl.classList.toggle('hidden', type !== 'coffee');
    pressureControl.classList.toggle('hidden', type !== 'espresso');
}

// Update cup display
function updateCupDisplay(drink) {
    liquid.className = 'liquid';
    if (drink) {
        if (drink === 'black-coffee') liquid.classList.add('coffee');
        else if (drink === 'espresso') liquid.classList.add('espresso');
        else if (drink === 'green-tea') liquid.classList.add('green-tea');
        else if (drink === 'black-tea') liquid.classList.add('black-tea');
    }
}

// Serve drink and calculate score
function serveDrink() {
    if (!currentOrder) return;

    const recipe = recipes[currentOrder];
    const score = calculateScore(recipe);
    const stars = Math.round(score);
    const review = generateReview(score, recipe);

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

    // Reset for next customer
    serveBtn.disabled = true;
    currentOrder = null;
    nextCustomerBtn.textContent = 'Next Customer';
    drinkName.textContent = '-';
    liquid.className = 'liquid';
    updateControlVisibility(null);
}

// Calculate score based on how close to ideal parameters
function calculateScore(recipe) {
    let totalScore = 0;
    let factors = 0;

    // Temperature score (all drinks)
    const tempDiff = Math.abs(currentSettings.temperature - recipe.ideal.temperature);
    const tempScore = Math.max(0, 5 - (tempDiff / recipe.tolerance.temperature) * 2.5);
    totalScore += tempScore;
    factors++;

    // Type-specific scoring
    if (recipe.type === 'tea') {
        const steepDiff = Math.abs(currentSettings.steepTime - recipe.ideal.steepTime);
        const steepScore = Math.max(0, 5 - (steepDiff / recipe.tolerance.steepTime) * 2.5);
        totalScore += steepScore;
        factors++;
    } else if (recipe.type === 'coffee') {
        const strengthScore = currentSettings.strength === recipe.ideal.strength ? 5 :
                             (currentSettings.strength === 'medium' ? 3 : 2);
        totalScore += strengthScore;
        factors++;
    } else if (recipe.type === 'espresso') {
        const pressureDiff = Math.abs(currentSettings.pressure - recipe.ideal.pressure);
        const pressureScore = Math.max(0, 5 - (pressureDiff / recipe.tolerance.pressure) * 2.5);
        totalScore += pressureScore;
        factors++;
    }

    return totalScore / factors;
}

// Generate review text based on score
function generateReview(score, recipe) {
    let templates;
    let param = '';

    if (score >= 4.5) {
        templates = reviewTemplates.perfect;
    } else if (score >= 3.5) {
        templates = reviewTemplates.good;
    } else if (score >= 2.5) {
        templates = reviewTemplates.okay;
    } else if (score >= 1.5) {
        templates = reviewTemplates.bad;
        param = getWrongParam(recipe);
    } else {
        templates = reviewTemplates.terrible;
    }

    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.replace('{drink}', recipe.name.toLowerCase()).replace('{param}', param);
}

// Determine which parameter was most wrong
function getWrongParam(recipe) {
    const tempDiff = Math.abs(currentSettings.temperature - recipe.ideal.temperature);

    if (recipe.type === 'tea') {
        const steepDiff = Math.abs(currentSettings.steepTime - recipe.ideal.steepTime);
        return tempDiff > steepDiff * 10 ? 'temperature' : 'steep time';
    } else if (recipe.type === 'espresso') {
        const pressureDiff = Math.abs(currentSettings.pressure - recipe.ideal.pressure);
        return tempDiff > pressureDiff * 5 ? 'temperature' : 'pressure';
    }

    return 'temperature';
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

// Helper function
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start the game
init();
