const game = {
    deck: [],
    player: {
        cards: [],
        score: 0
    },
    dealer: {
        cards: [],
        score: 0
    },
    isPlayerTurn: true,

    // Create deck
    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (let suit of suits) {
            for (let value of values) {
                this.deck.push({ suit, value });
            }
        }
    },

    // Shuffle deck
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    },

    // Start new game
    startGame() {
        this.deck = [];
        this.player.cards = [];
        this.dealer.cards = [];
        this.createDeck();
        this.shuffleDeck();

        // Deal initial cards
        this.player.cards.push(this.deck.pop());
        this.dealer.cards.push(this.deck.pop());
        this.player.cards.push(this.deck.pop());
        this.dealer.cards.push(this.deck.pop());

        this.isPlayerTurn = true;
        this.updateScores();
        this.render();

        if (this.player.score === 21) this.stand();
    },

    // Update scores
    updateScores() {
        this.player.score = this.calculateScore(this.player.cards);
        this.dealer.score = this.calculateScore(this.dealer.cards);
    },

    // Calculate card value
    calculateScore(cards) {
        let score = 0;
        let aces = 0;

        for (let card of cards) {
            if (card.value === 'A') aces++;
            score += this.cardValue(card.value);
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        return score;
    },

    // Get card value
    cardValue(value) {
        if (['J', 'Q', 'K'].includes(value)) return 10;
        if (value === 'A') return 11;
        return parseInt(value);
    },

    // Player hit
    hit() {
        if (!this.isPlayerTurn) return;

        this.player.cards.push(this.deck.pop());
        this.updateScores();

        if (this.player.score > 21) {
            this.isPlayerTurn = false;
            this.endGame('Bust! You lose!');
        }
        this.render();
    },

    // Player stand
    stand() {
        this.isPlayerTurn = false;
        this.dealerTurn();
        this.render();
        this.endGame();
    },

    // Dealer's turn
    dealerTurn() {
        while (this.dealer.score < 17) {
            this.dealer.cards.push(this.deck.pop());
            this.updateScores();
        }
    },

    // End game
    endGame(message) {
        let result = message || '';

        if (!result) {
            if (this.dealer.score > 21 || this.player.score > this.dealer.score) {
                result = 'You win!';
            } else if (this.player.score < this.dealer.score) {
                result = 'Dealer wins!';
            } else {
                result = 'Tie!';
            }
        }

        document.getElementById('message').textContent = result;
    },

    // Render game
    render() {
        const renderCards = (cards, isDealer) => {
            return cards.map((card, index) =>
                `<div class="card">${isDealer && index === 0 ? '?' : `${card.value}${card.suit}`}</div>`
            ).join('');
        };

        document.getElementById('player-cards').innerHTML = renderCards(this.player.cards, false);
        document.getElementById('dealer-cards').innerHTML = renderCards(this.dealer.cards, this.isPlayerTurn);
        document.getElementById('player-score').textContent = `Your score: ${this.isPlayerTurn ? this.player.score : ''}`;
        document.getElementById('dealer-score').textContent = `Dealer score: ${this.isPlayerTurn ? '?' : this.dealer.score}`;
    }
};

// Event listeners
document.getElementById('hit').addEventListener('click', () => game.hit());
document.getElementById('stand').addEventListener('click', () => game.stand());
document.getElementById('new-game').addEventListener('click', () => game.startGame());

// Start first game
game.startGame();