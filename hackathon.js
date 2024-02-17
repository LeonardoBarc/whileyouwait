// Card images
const images = ['🍎', '🍌', '🍒', '🍓', '🥝', '🍇', '🍊', '🍍'];

// Duplicate images to create pairs
const cards = [...images, ...images];

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

// Initialize variables
let flippedCards = [];
let matchedCards = [];
let flips = 0; // Track the total number of flips

// Define custom rating levels and descriptions
const ratingLevels = [
    { flips: 10, description: '5 stars' },
    { flips: 15, description: '4 stars' },
    { flips: 20, description: '3 stars' },
    { flips: 25, description: '2 stars' },
    { flips: Infinity, description: '1 star' }
];

// Function to update the star rating based on the number of flips
function updateStarRating() {
    const starRating = document.getElementById('star-rating');
    let description = '';

    // Find the appropriate rating level based on the number of flips
    for (const level of ratingLevels) {
        if (flips <= level.flips) {
            description = level.description;
            break;
        }
    }

    // Update the star rating display
    starRating.textContent = description;
}

// Function to flip a card
function flipCard() {
    // Increment the total number of flips
    flips++;

    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);

        // Toggle visibility of the card content
        const content = this.querySelector('span');
        content.classList.remove('hidden'); // Show the content

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    // Update the star rating after every pair of cards flipped
    updateStarRating();
}

// Function to check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const image1 = card1.querySelector('span').textContent;
    const image2 = card2.querySelector('span').textContent;

    if (image1 === image2) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            alert('Congratulations! You have matched all the cards.');
        }
    } else {
        // Hide the content again after a short delay
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('span').classList.add('hidden');
            card2.querySelector('span').classList.add('hidden');
        }, 500);
    }

    flippedCards = [];
}

document.addEventListener('DOMContentLoaded', function() {
    // Create game board
    const gameBoard = document.getElementById('game-board');
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        // Create content span for card
        const content = document.createElement('span');
        content.textContent = image;
        content.classList.add('hidden'); // Initially hidden

        // Append content to card
        card.appendChild(content);

        // Add click event listener to card
        card.addEventListener('click', flipCard);

        // Append card to game board
        gameBoard.appendChild(card);
    });

    // Initialize the star rating display
    updateStarRating();
});
