document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION & CONSTANTS ---

    const DOM = {
        board: document.getElementById('game-board'),
        rollButton: document.getElementById('roll-button'),
        endTurnButton: document.getElementById('end-turn-button'),
        diceResult: document.getElementById('dice-result'),
        diceOutputText: document.getElementById('dice-output-text'),
        actionButtonsRow: document.getElementById('action-buttons-row'),
        jailOptionsRow: document.getElementById('jail-options-row'),
        jailPayButton: document.getElementById('jail-pay-button'),
        jailCardButton: document.getElementById('jail-card-button'),
        jailRollButton: document.getElementById('jail-roll-button'),
        gameLog: document.getElementById('game-log'),
        propertyModal: document.getElementById('property-modal'),
        modalBuyButton: document.getElementById('modal-buy-button'),
        modalPassButton: document.getElementById('modal-pass-button'),
        propertyCardImage: document.getElementById('property-card-image'),
        newGameButton: document.getElementById('new-game-button'),
        newGameModal: document.getElementById('new-game-modal'),
        playerCountRadios: document.querySelectorAll('input[name="player-count"]'),
        playerSetupForm: document.getElementById('player-setup-form'),
        setupStartGameButton: document.getElementById('setup-start-game-button'),
        initialRollResultsDiv: document.getElementById('initial-roll-results'),
        initialRollsList: document.getElementById('initial-rolls-list'),
        beginGameButton: document.getElementById('begin-game-button'),
        gameTabsContainer: document.getElementById('game-tabs'),
        tabContentContainer: document.getElementById('tab-content'),
        gameLogTabButton: document.querySelector('.tab-button[data-tab="game-log-tab-content"]'),
        turnIndicator: document.getElementById('turn-indicator'),
        currentPlayerTurnText: document.getElementById('current-player-turn'),
        nextPlayerTurnText: document.getElementById('next-player-turn'),
        mortgageButton: document.getElementById('mortgage-button'),
        unmortgageButton: document.getElementById('unmortgage-button'),
        mortgageModal: document.getElementById('mortgage-modal'),
        unmortgageModal: document.getElementById('unmortgage-modal'),
        mortgagePropertyList: document.getElementById('mortgage-property-list'),
        unmortgagePropertyList: document.getElementById('unmortgage-property-list'),
        closeMortgageModalButton: document.getElementById('close-mortgage-modal'),
        closeUnmortgageModalButton: document.getElementById('close-unmortgage-modal'),
        buyHouseModal: document.getElementById('buy-house-modal'),
        sellHouseModal: document.getElementById('sell-house-modal'),
        buyHousePropertyList: document.getElementById('buy-house-property-list'),
        sellHousePropertyList: document.getElementById('sell-house-property-list'),
        closeBuyHouseModalButton: document.getElementById('close-buy-house-modal'),
        closeSellHouseModalButton: document.getElementById('close-sell-house-modal'),
        tradeModal: document.getElementById('trade-modal'),
        tradeProposerName: document.getElementById('trade-proposer-name'),
        proposerAssets: document.getElementById('proposer-assets'),
        tradeRecipientSelect: document.getElementById('trade-recipient-select'),
        recipientAssets: document.getElementById('recipient-assets'),
        proposeTradeButton: document.getElementById('propose-trade-button'),
        closeTradeModal: document.getElementById('close-trade-modal'),
        tradeConfirmationModal: document.getElementById('trade-confirmation-modal'),
        tradeSummary: document.getElementById('trade-summary'),
        acceptTradeButton: document.getElementById('accept-trade-button'),
        rejectTradeButton: document.getElementById('reject-trade-button'),
    };

    let activeTrade = null;

    const playerColorMap = {
        'red': { primary: '#ef4444', background: '#fef2f2' }, 'green': { primary: '#10b981', background: '#f0fdf4' }, 'blue': { primary: '#3b82f6', background: '#e0f2fe' }, 'black': { primary: '#1f2937', background: '#e5e7eb' }
    };

    const propertyImageMap = {
        'Mediterranean Ave': 'https://i.postimg.cc/02b9FT2y/Mediteranian-Ave.jpg', 'Baltic Ave': 'https://i.postimg.cc/brvqzMxL/33900e0c-9d96-4bf5-98bb-ba910adf0c38.jpg', 'Reading Railroad': 'https://i.postimg.cc/K8SCfw1V/Reading-RR.jpg', 'Oriental Ave': 'https://i.postimg.cc/MTKCRBnp/Oriental-Ave.jpg', 'Vermont Ave': 'https://i.postimg.cc/MH4JzGKK/vermontave.jpg', 'Connecticut Ave': 'https://i.postimg.cc/brvqzMxL/33900e0c-9d96-4bf5-98bb-ba910adf0c38.jpg', 'St. Charles Place': 'https://i.postimg.cc/mDmG6wv9/St-Charles-Place.jpg', 'Electric Company': 'https://i.postimg.cc/T3VF40mP/electric-Company.jpg', 'States Ave': 'https://i.postimg.cc/zDPrCxSZ/States-Ave.jpg', 'Virginia Ave': 'https://i.postimg.cc/x8qSrmQ4/virginia-Ave.jpg', 'Pennsylvania Railroad': 'https://i.postimg.cc/XqtmTDQr/Penslyvania-RR.jpg', 'St. James Place': 'https://i.postimg.cc/DZvTgDMF/St-James-Place.jpg', 'Tennessee Ave': 'https://i.postimg.cc/BQrfytVm/tennessee-Ave.jpg', 'New York Ave': 'https://i.postimg.cc/8PJVtLtF/New-York-Ave.jpg', 'Kentucky Ave': 'https://i.postimg.cc/k5FCW9wf/Kentucky-Ave.jpg', 'Indiana Ave': 'https://i.postimg.cc/5t1d4T1v/Indiana-Ave.jpg', 'Illinois Ave': 'https://i.postimg.cc/dVGcKwMw/illinois-Ave.jpg', 'B&O Railroad': 'https://i.postimg.cc/pV020WvS/BandORR.jpg', 'Atlantic Ave': 'https://i.postimg.cc/R0z93q1W/atlantic-Ave.jpg', 'Ventnor Ave': 'https://i.postimg.cc/Y9nJxSFf/Ventor-Ave.jpg', 'Water Works': 'https://i.postimg.cc/MGzN2Bbm/waterworks.jpg', 'Marvin Gardens': 'https://i.postimg.cc/YS3chRqP/Marvin-Gardens.jpg', 'Pacific Ave': 'https://i.postimg.cc/Kjsx4NQb/Pasific-Ave.jpg', 'North Carolina Ave': 'https://i.postimg.cc/13Fs5DFx/NOCarolina-Ave.jpg', 'Pennsylvania Ave': 'https://i.postimg.cc/L6wmpxnB/Pennsylvania-Ave.jpg', 'Short Line Railroad': 'https://i.postimg.cc/rsD7ZLC6/Shortline-RR.jpg', 'Park Place': 'https://i.postimg.cc/dtTz8wVr/Park-Place.jpg', 'Boardwalk': 'https://i.postimg.cc/ZYQGBC4J/boardwalk.jpg'
    };

    const allChanceCards = [
        { type: 'advance_to', name: 'Advance to Go', target: 0, collectGo: true }, { type: 'advance_to', name: 'Advance to Illinois Ave', target: 24, collectGo: true }, { type: 'advance_to', name: 'Advance to St. Charles Place', target: 11, collectGo: true }, { type: 'advance_to_nearest_group', name: 'Advance to nearest Utility', group: 'utility', multiplier: 10 }, { type: 'advance_to_nearest_group', name: 'Advance to nearest Railroad', group: 'railroad', multiplier: 2 }, { type: 'advance_to_nearest_group', name: 'Advance to nearest Railroad', group: 'railroad', multiplier: 2 }, { type: 'collect_money', name: 'Bank pays you dividend of $50', amount: 50 }, { type: 'get_out_of_jail_free', name: 'Get out of Jail Free' }, { type: 'go_back_spaces', name: 'Go back 3 spaces', spaces: 3 }, { type: 'go_to_jail', name: 'Go directly to Jail' }, { type: 'repairs', name: 'Make general repairs on all your property', houseCost: 25, hotelCost: 100 }, { type: 'pay_tax', name: 'Pay poor tax of $15', amount: 15 }, { type: 'advance_to', name: 'Take a trip to Reading Railroad', target: 5, collectGo: true }, { type: 'advance_to', name: 'Take a walk on the Boardwalk', target: 39, collectGo: false }, { type: 'pay_other_players', name: 'You have been elected Chairman of the Board', amount: 50 }, { type: 'collect_money', name: 'Your building loan matures. Collect $150', amount: 150 }
    ];

    const allCommunityCards = [
        { type: 'advance_to', name: 'Advance to Go', target: 0, collectGo: true }, { type: 'collect_money', name: 'Bank error in your favor. Collect $200', amount: 200 }, { type: 'collect_money', name: 'From sale of stock you get $50', amount: 50 }, { type: 'get_out_of_jail_free', name: 'Get out of Jail Free' }, { type: 'go_to_jail', name: 'Go to Jail. Go directly to jail, do not pass Go, do not collect $200' }, { type: 'collect_money', name: 'Holiday fund matures. Receive $100', amount: 100 }, { type: 'collect_money', name: 'Income tax refund. Collect $20', amount: 20 }, { type: 'all_pay_one', name: "It is your birthday. Collect $10 from every player", amount: 10 }, { type: 'collect_money', name: 'Life insurance matures. Collect $100', amount: 100 }, { type: 'pay_tax', name: 'Pay hospital fees of $100', amount: 100 }, { type: 'pay_tax', name: 'Pay school fees of $50', amount: 50 }, { type: 'collect_money', name: 'Receive $25 consultancy fee', amount: 25 }, { type: 'repairs', name: 'You are assessed for street repair. $40 per house. $115 per hotel', houseCost: 40, hotelCost: 115 }, { type: 'collect_money', name: 'You have won second prize in a beauty contest. Collect $10', amount: 10 }, { type: 'collect_money', name: 'You inherit $100', amount: 100 }
    ];

    // --- GAME STATE MANAGEMENT ---

    let gameState;

    function resetGameState() {
        gameState = {
            gameStarted: false,
            currentPlayer: 0,
            players: [],
            properties: {
                1: { name: 'Mediterranean Ave', price: 60, rent: 2, group: 'brown', house_rent: { one: 10, two: 30, three: 90, four: 160 }, hotel_rent: 250, mortgage_value: 30, mortgage_payment: 33, house_cost: 50, hotel_cost: 50, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                3: { name: 'Baltic Ave', price: 60, rent: 4, group: 'brown', house_rent: { one: 20, two: 60, three: 180, four: 320 }, hotel_rent: 450, mortgage_value: 30, mortgage_payment: 33, house_cost: 50, hotel_cost: 50, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                5: { name: 'Reading Railroad', price: 200, rent: 25, group: 'railroad', house_rent: null, hotel_rent: null, mortgage_value: 100, mortgage_payment: 110, house_cost: null, hotel_cost: null, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                6: { name: 'Oriental Ave', price: 100, rent: 6, group: 'light_blue', house_rent: { one: 30, two: 90, three: 270, four: 400 }, hotel_rent: 550, mortgage_value: 50, mortgage_payment: 55, house_cost: 50, hotel_cost: 50, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                8: { name: 'Vermont Ave', price: 100, rent: 6, group: 'light_blue', house_rent: { one: 30, two: 90, three: 270, four: 400 }, hotel_rent: 550, mortgage_value: 50, mortgage_payment: 55, house_cost: 50, hotel_cost: 50, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                9: { name: 'Connecticut Ave', price: 120, rent: 8, group: 'light_blue', house_rent: { one: 40, two: 100, three: 300, four: 450 }, hotel_rent: 600, mortgage_value: 60, mortgage_payment: 66, house_cost: 50, hotel_cost: 50, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                11: { name: 'St. Charles Place', price: 140, rent: 10, group: 'pink', house_rent: { one: 50, two: 150, three: 450, four: 625 }, hotel_rent: 750, mortgage_value: 70, mortgage_payment: 77, house_cost: 100, hotel_cost: 100, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                12: { name: 'Electric Company', price: 150, rent: 4, group: 'utility', house_rent: null, hotel_rent: null, mortgage_value: 75, mortgage_payment: 83, house_cost: null, hotel_cost: null, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                13: { name: 'States Ave', price: 140, rent: 10, group: 'pink', house_rent: { one: 50, two: 150, three: 450, four: 625 }, hotel_rent: 750, mortgage_value: 70, mortgage_payment: 77, house_cost: 100, hotel_cost: 100, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                14: { name: 'Virginia Ave', price: 160, rent: 12, group: 'pink', house_rent: { one: 60, two: 180, three: 500, four: 700 }, hotel_rent: 900, mortgage_value: 80, mortgage_payment: 88, house_cost: 100, hotel_cost: 100, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                15: { name: 'Pennsylvania Railroad', price: 200, rent: 25, group: 'railroad', house_rent: null, hotel_rent: null, mortgage_value: 100, mortgage_payment: 110, house_cost: null, hotel_cost: null, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                16: { name: 'St. James Place', price: 180, rent: 14, group: 'orange', house_rent: { one: 70, two: 200, three: 550, four: 750 }, hotel_rent: 950, mortgage_value: 90, mortgage_payment: 99, house_cost: 100, hotel_cost: 100, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                18: { name: 'Tennessee Ave', price: 180, rent: 14, group: 'orange', house_rent: { one: 70, two: 200, three: 550, four: 750 }, hotel_rent: 950, mortgage_value: 90, mortgage_payment: 99, house_cost: 100, hotel_cost: 100, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                19: { name: 'New York Ave', price: 200, rent: 16, group: 'orange', house_rent: { one: 80, two: 220, three: 600, four: 800 }, hotel_rent: 1000, mortgage_value: 100, mortgage_payment: 110, house_cost: 100, hotel_cost: 100, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                21: { name: 'Kentucky Ave', price: 220, rent: 18, group: 'red', house_rent: { one: 90, two: 250, three: 700, four: 875 }, hotel_rent: 1050, mortgage_value: 110, mortgage_payment: 121, house_cost: 150, hotel_cost: 150, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                23: { name: 'Indiana Ave', price: 220, rent: 18, group: 'red', house_rent: { one: 90, two: 250, three: 700, four: 875 }, hotel_rent: 1050, mortgage_value: 110, mortgage_payment: 121, house_cost: 150, hotel_cost: 150, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                24: { name: 'Illinois Ave', price: 240, rent: 20, group: 'red', house_rent: { one: 100, two: 300, three: 750, four: 925 }, hotel_rent: 1100, mortgage_value: 120, mortgage_payment: 132, house_cost: 150, hotel_cost: 150, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                25: { name: 'B&O Railroad', price: 200, rent: 25, group: 'railroad', house_rent: null, hotel_rent: null, mortgage_value: 100, mortgage_payment: 110, house_cost: null, hotel_cost: null, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                26: { name: 'Atlantic Ave', price: 260, rent: 22, group: 'yellow', house_rent: { one: 110, two: 330, three: 800, four: 975 }, hotel_rent: 1150, mortgage_value: 130, mortgage_payment: 143, house_cost: 150, hotel_cost: 150, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                27: { name: 'Ventnor Ave', price: 260, rent: 22, group: 'yellow', house_rent: { one: 110, two: 330, three: 800, four: 975 }, hotel_rent: 1150, mortgage_value: 130, mortgage_payment: 143, house_cost: 150, hotel_cost: 150, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                28: { name: 'Water Works', price: 150, rent: 4, group: 'utility', house_rent: null, hotel_rent: null, mortgage_value: 75, mortgage_payment: 83, house_cost: null, hotel_cost: null, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                29: { name: 'Marvin Gardens', price: 280, rent: 24, group: 'yellow', house_rent: { one: 120, two: 360, three: 850, four: 1025 }, hotel_rent: 1200, mortgage_value: 140, mortgage_payment: 154, house_cost: 150, hotel_cost: 150, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                31: { name: 'Pacific Ave', price: 300, rent: 26, group: 'green', house_rent: { one: 130, two: 390, three: 900, four: 1100 }, hotel_rent: 1275, mortgage_value: 150, mortgage_payment: 165, house_cost: 200, hotel_cost: 200, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                32: { name: 'North Carolina Ave', price: 300, rent: 26, group: 'green', house_rent: { one: 130, two: 390, three: 900, four: 1100 }, hotel_rent: 1275, mortgage_value: 150, mortgage_payment: 165, house_cost: 200, hotel_cost: 200, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                34: { name: 'Pennsylvania Ave', price: 320, rent: 28, group: 'green', house_rent: { one: 150, two: 450, three: 1000, four: 1200 }, hotel_rent: 1400, mortgage_value: 160, mortgage_payment: 176, house_cost: 200, hotel_cost: 200, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                35: { name: 'Short Line RR', price: 200, rent: 25, group: 'railroad', house_rent: null, hotel_rent: null, mortgage_value: 100, mortgage_payment: 110, house_cost: null, hotel_cost: null, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                37: { name: 'Park Place', price: 350, rent: 35, group: 'dark_blue', house_rent: { one: 175, two: 500, three: 1100, four: 1300 }, hotel_rent: 1500, mortgage_value: 175, mortgage_payment: 193, house_cost: 200, hotel_cost: 200, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, },
                39: { name: 'Boardwalk', price: 400, rent: 50, group: 'dark_blue', house_rent: { one: 200, two: 600, three: 1400, four: 1700 }, hotel_rent: 2000, mortgage_value: 200, mortgage_payment: 220, house_cost: 200, hotel_cost: 200, development: { houses: 0, hotels: 0 }, owner: null, currently_mortgaged: false, }
            },
            gameLog: [],
            awaitingPropertyDecision: false,
            initialRolls: [],
            chanceDeck: [],
            commChestDeck: [],
            isAnimating: false,
                lastRoll: 0,
        };
    }


    // --- UTILITY & ANIMATION ---

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function logMessage(message) {
        gameState.gameLog.push(message);
        const logElement = document.createElement('div');
        logElement.textContent = message;
        logElement.className = 'mb-1';
        DOM.gameLog.appendChild(logElement);
        DOM.gameLog.scrollTop = DOM.gameLog.scrollHeight;
    }

    function getSpaceName(position) {
        const property = gameState.properties[position];
        if (property) return property.name;
        const spaceData = { 0: 'GO', 2: 'Community Chest', 4: 'Income Tax', 7: 'Chance', 10: 'Jail', 17: 'Community Chest', 20: 'Free Parking', 22: 'Chance', 30: 'Go to Jail', 33: 'Community Chest', 36: 'Chance', 38: 'Luxury Tax' };
        return spaceData[position] || `Space ${position}`;
    }

    /**
     * Calculates the top and left percentage coordinates for a given board space.
     * This is the core of the animation logic.
     * @param {number} position The space index (0-39).
     * @returns {{top: string, left: string}} The coordinates as percentage strings.
     */
    function getSpaceCoordinates(position) {
        const corner = '92.5%';
        const edge = '4.5%';
        const step = 9.05; // Percentage per space
        let top, left;

        if (position >= 0 && position <= 10) { // Bottom row
            top = corner;
            left = `${parseFloat(corner) - (position * step)}%`;
        } else if (position > 10 && position <= 20) { // Left column
            left = edge;
            top = `${parseFloat(corner) - ((position - 10) * step)}%`;
        } else if (position > 20 && position <= 30) { // Top row
            top = edge;
            left = `${parseFloat(edge) + ((position - 20) * step)}%`;
        } else { // Right column
            left = corner;
            top = `${parseFloat(edge) + ((position - 30) * step)}%`;
        }
        return { top, left };
    }


    // --- UI & DOM MANIPULATION ---

    function updateUI() {
        updatePlayerTabsAndInfo();
        updateGameControls();
        updateBoardVisuals();
    }

    function updatePlayerTabsAndInfo() {
        DOM.gameTabsContainer.querySelectorAll('.tab-button:not([data-tab="game-log-tab-content"])').forEach(btn => btn.remove());
        DOM.tabContentContainer.querySelectorAll('.tab-content-section:not(#game-log-tab-content)').forEach(section => section.remove());

        if (!gameState.gameStarted) return;

        gameState.players.forEach((player) => {
            const playerTabButton = document.createElement('button');
            const playerTabContentId = `player-${player.name.replace(/\s+/g, '-')}-tab-content`;
            playerTabButton.className = `tab-button`;
            playerTabButton.dataset.tab = playerTabContentId;
            playerTabButton.textContent = player.name;
            playerTabButton.style.color = player.primaryColor;
            playerTabButton.addEventListener('click', () => activateTab(playerTabButton.dataset.tab));
            DOM.gameTabsContainer.insertBefore(playerTabButton, DOM.gameLogTabButton);

            const playerTabContent = document.createElement('div');
            playerTabContent.id = playerTabContentId;
            playerTabContent.className = `tab-content-section player-tab-content`;

            let propertiesListHtml = player.properties.length > 0 ? '<ul>' : '<p>No properties owned.</p>';
            player.properties.forEach(propPos => {
                const property = gameState.properties[propPos];
                if (property) {
                        let developmentInfo = '';
                        if (property.development.hotels > 0) {
                            developmentInfo = '(1 Hotel)';
                        } else if (property.development.houses > 0) {
                            developmentInfo = `(${property.development.houses} Houses)`;
                        }
                        propertiesListHtml += `<li>${property.name} ${developmentInfo} ${property.currently_mortgaged ? '(Mortgaged)' : ''}</li>`;
                }
            });
            if (player.properties.length > 0) propertiesListHtml += '</ul>';

            playerTabContent.innerHTML = `
                <h3 class="text-lg font-bold mb-2" style="color: ${player.primaryColor};">${player.name}</h3>
                <div class="money-display">Money: $${player.money}</div>
                <h4>Properties:</h4>
                ${propertiesListHtml}
                <div class="jail-cards">Get Out of Jail Free Cards: ${player.getOutOfJailCards}</div>
                <div class="jail-status font-semibold text-red-600">${player.inJail ? `In Jail (Turn ${player.jailTurns + 1} of 3)` : ''}</div>
            `;
            DOM.tabContentContainer.appendChild(playerTabContent);
        });
    }

    function updateGameControls() {
        const isAnimating = gameState.isAnimating;
        DOM.rollButton.disabled = isAnimating;
        DOM.endTurnButton.disabled = isAnimating;
        DOM.mortgageButton.disabled = isAnimating;
        DOM.unmortgageButton.disabled = isAnimating;

        if (!gameState.gameStarted) {
            DOM.rollButton.classList.add('hidden');
            DOM.endTurnButton.classList.add('hidden');
            DOM.newGameButton.classList.remove('hidden');
            DOM.actionButtonsRow.classList.add('hidden');
            DOM.jailOptionsRow.classList.add('hidden');
            DOM.turnIndicator.classList.add('hidden');
            return;
        }

        const player = gameState.players[gameState.currentPlayer];

        const nextPlayerIndex = (gameState.currentPlayer + 1) % gameState.players.length;
        const nextPlayer = gameState.players[nextPlayerIndex];
        DOM.currentPlayerTurnText.innerHTML = `It's <strong style="color: ${player.primaryColor};">${player.name}</strong>'s turn!`;
        DOM.nextPlayerTurnText.textContent = `Next up: ${nextPlayer.name}`;
        DOM.turnIndicator.classList.remove('hidden');

        if (player.inJail) {
            DOM.rollButton.classList.add('hidden');
            DOM.actionButtonsRow.classList.add('hidden');
            DOM.endTurnButton.classList.add('hidden');
            DOM.jailOptionsRow.classList.remove('hidden');

            DOM.jailPayButton.disabled = isAnimating || player.hasRolledInJail || player.money < 250;
            DOM.jailCardButton.disabled = isAnimating || player.hasRolledInJail || player.getOutOfJailCards === 0;
            DOM.jailRollButton.disabled = isAnimating || player.hasRolledInJail;

            if (player.hasRolledInJail) {
                DOM.endTurnButton.classList.remove('hidden');
                DOM.jailOptionsRow.classList.add('hidden');
            }
        } else {
            DOM.jailOptionsRow.classList.add('hidden');
            DOM.newGameButton.classList.add('hidden');
        }
    }

    function updateBoardVisuals() {
        document.querySelectorAll('.space').forEach(spaceEl => {
            const position = parseInt(spaceEl.dataset.space);
            const property = gameState.properties[position];
            if (!property) return;

            spaceEl.classList.remove('owned', 'mortgaged');
            spaceEl.style.borderColor = '';
            spaceEl.style.borderStyle = 'solid';

                // Remove existing development visuals
                const existingDev = spaceEl.querySelector('.development');
                if (existingDev) {
                    existingDev.remove();
                }

            if (property.owner !== null) {
                const owner = gameState.players.find(p => p.id === property.owner);
                if (owner) {
                    spaceEl.classList.add('owned');
                    spaceEl.style.borderColor = owner.primaryColor;
                    if (property.currently_mortgaged) {
                        spaceEl.classList.add('mortgaged');
                    }

                        if (property.development.houses > 0) {
                            const devContainer = document.createElement('div');
                            devContainer.className = 'development';
                            if (property.development.hotels > 0) {
                                const hotelEl = document.createElement('div');
                                hotelEl.className = 'hotel';
                                devContainer.appendChild(hotelEl);
                            } else {
                                for (let i = 0; i < property.development.houses; i++) {
                                    const houseEl = document.createElement('div');
                                    houseEl.className = 'house';
                                    devContainer.appendChild(houseEl);
                                }
                            }
                            spaceEl.appendChild(devContainer);
                        }
                }
            }
        });
    }

    function activateTab(tabId) {
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.tab-content-section').forEach(section => section.classList.remove('active'));

        const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);

        if (activeButton) activeButton.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }


    // --- INITIALIZATION & SETUP ---

    function initGame() {
        resetGameState();
        createBoard(); // NEW: Board is now dynamically generated
        setupEventListeners();
        setupPlayerInputs(2);
        updateUI();
        DOM.diceOutputText.textContent = 'Click "New Game" to start!';
    }

    /**
     * NEW: Dynamically creates the board spaces and center area.
     */
    function createBoard() {
        DOM.board.innerHTML = ''; // Clear board
        const spaceNames = [
            'GO', 'Mediterranean Ave<br>$60', 'Community Chest', 'Baltic Ave<br>$60', 'Income Tax<br>$200', 'Reading RR<br>$200', 'Oriental Ave<br>$100', 'Chance', 'Vermont Ave<br>$100', 'Connecticut Ave<br>$120', 'JAIL', 'St. Charles Pl<br>$140', 'Electric Co<br>$150', 'States Ave<br>$140', 'Virginia Ave<br>$160', 'Pennsylvania RR<br>$200', 'St. James Pl<br>$180', 'Community Chest', 'Tennessee Ave<br>$180', 'New York Ave<br>$200', 'Free Parking', 'Kentucky Ave<br>$220', 'Chance', 'Indiana Ave<br>$220', 'Illinois Ave<br>$240', 'B&O RR<br>$200', 'Atlantic Ave<br>$260', 'Ventnor Ave<br>$260', 'Water Works<br>$150', 'Marvin Gardens<br>$280', 'Go to Jail', 'Pacific Ave<br>$300', 'North Carolina Ave<br>$300', 'Community Chest', 'Pennsylvania Ave<br>$320', 'Short Line RR<br>$200', 'Chance', 'Park Place<br>$350', 'Luxury Tax<br>$100', 'Boardwalk<br>$400'
        ];
        const cornerSpaces = [0, 10, 20, 30];

        for (let i = 0; i < 40; i++) {
            const spaceEl = document.createElement('div');
            spaceEl.className = 'space';
            if (cornerSpaces.includes(i)) {
                spaceEl.classList.add('corner');
            }
            spaceEl.dataset.space = i;
            spaceEl.innerHTML = spaceNames[i];
            DOM.board.appendChild(spaceEl);
        }

        const centerArea = document.createElement('div');
        centerArea.className = 'center-area';
        centerArea.innerHTML = `
            <div>MONOPOLY</div>
            <div id="turn-indicator" class="turn-indicator hidden">
                <span id="current-player-turn"></span><br>
                <span id="next-player-turn" class="text-xs"></span>
            </div>
            <div class="dice-display" id="dice-result">
                <span id="dice-output-text"></span>
                <button id="new-game-button" class="control-button">New Game</button>
                <button id="roll-button" class="control-button hidden">Roll Dice</button>
                <button id="end-turn-button" class="control-button hidden">End Turn</button>
                <div id="action-buttons-row" class="action-buttons-row hidden">
                    <button id="buy-house-button" class="control-button">Buy House</button>
                    <button id="sell-house-button" class="control-button">Sell House</button>
                    <button id="mortgage-button" class="control-button">Mortgage</button>
                    <button id="unmortgage-button" class="control-button">Unmortgage</button>
                    <button id="trade-button" class="control-button">Trade</button>
                </div>
                <div id="jail-options-row" class="jail-options-row hidden">
                    <button id="jail-pay-button" class="control-button">Pay $250 to Get Out</button>
                    <button id="jail-card-button" class="control-button">Use Get Out of Jail Free Card</button>
                    <button id="jail-roll-button" class="control-button">Roll for Doubles</button>
                </div>
            </div>
        `;
        DOM.board.appendChild(centerArea);
        // Re-assign DOM elements inside the newly created center area
        Object.assign(DOM, {
            turnIndicator: document.getElementById('turn-indicator'),
            currentPlayerTurnText: document.getElementById('current-player-turn'),
            nextPlayerTurnText: document.getElementById('next-player-turn'),
            diceOutputText: document.getElementById('dice-output-text'),
            newGameButton: document.getElementById('new-game-button'),
            rollButton: document.getElementById('roll-button'),
            endTurnButton: document.getElementById('end-turn-button'),
            actionButtonsRow: document.getElementById('action-buttons-row'),
            jailOptionsRow: document.getElementById('jail-options-row'),
            jailPayButton: document.getElementById('jail-pay-button'),
            jailCardButton: document.getElementById('jail-card-button'),
            jailRollButton: document.getElementById('jail-roll-button'),
            mortgageButton: document.getElementById('mortgage-button'),
            unmortgageButton: document.getElementById('unmortgage-button'),
            buyHouseButton: document.getElementById('buy-house-button'),
            sellHouseButton: document.getElementById('sell-house-button'),
            tradeButton: document.getElementById('trade-button'),
        });
    }

    function setupEventListeners() {
        DOM.newGameButton.addEventListener('click', showNewGameModal);
        DOM.playerCountRadios.forEach(radio => {
            radio.addEventListener('change', (e) => setupPlayerInputs(parseInt(e.target.value)));
        });
        DOM.setupStartGameButton.addEventListener('click', startGameSetup);
        DOM.beginGameButton.addEventListener('click', beginActualGame);
        DOM.rollButton.addEventListener('click', handleRoll);
        DOM.endTurnButton.addEventListener('click', endTurn);
        DOM.modalPassButton.addEventListener('click', closePropertyModal);
        DOM.propertyModal.addEventListener('click', (e) => { if (e.target === DOM.propertyModal) closePropertyModal(); });
        DOM.newGameModal.addEventListener('click', (e) => { if (e.target === DOM.newGameModal) DOM.newGameModal.classList.add('hidden'); });
        DOM.gameLogTabButton.addEventListener('click', (e) => activateTab(e.target.dataset.tab));
        DOM.jailPayButton.addEventListener('click', handleJailPay);
        DOM.jailCardButton.addEventListener('click', handleJailCard);
        DOM.jailRollButton.addEventListener('click', handleJailRoll);
        DOM.mortgageButton.addEventListener('click', showMortgageModal);
        DOM.unmortgageButton.addEventListener('click', showUnmortgageModal);
        DOM.closeMortgageModalButton.addEventListener('click', () => DOM.mortgageModal.classList.add('hidden'));
        DOM.closeUnmortgageModalButton.addEventListener('click', () => DOM.unmortgageModal.classList.add('hidden'));
            DOM.buyHouseButton.addEventListener('click', showBuyHouseModal);
            DOM.sellHouseButton.addEventListener('click', showSellHouseModal);
            DOM.closeBuyHouseModalButton.addEventListener('click', () => DOM.buyHouseModal.classList.add('hidden'));
            DOM.closeSellHouseModalButton.addEventListener('click', () => DOM.sellHouseModal.classList.add('hidden'));
            DOM.tradeButton.addEventListener('click', showTradeModal);
            DOM.closeTradeModal.addEventListener('click', () => DOM.tradeModal.classList.add('hidden'));
            DOM.proposeTradeButton.addEventListener('click', proposeTrade);
            DOM.acceptTradeButton.addEventListener('click', acceptTrade);
            DOM.rejectTradeButton.addEventListener('click', rejectTrade);
        }

        function proposeTrade() {
            const proposer = gameState.players[gameState.currentPlayer];
            const recipientIndex = DOM.tradeRecipientSelect.value;
            const recipient = gameState.players[recipientIndex];

            const proposerMoney = parseInt(document.getElementById('proposer-money').value);
            const recipientMoney = parseInt(document.getElementById('recipient-money').value);

            const proposerProperties = Array.from(document.querySelectorAll('#proposer-assets input[type="checkbox"]:checked')).map(cb => parseInt(cb.dataset.pos));
            const recipientProperties = Array.from(document.querySelectorAll('#recipient-assets input[type="checkbox"]:checked')).map(cb => parseInt(cb.dataset.pos));

            if (proposerMoney > proposer.money || recipientMoney > recipient.money) {
                logMessage("A player does not have enough money for this trade.");
                return;
            }

            activeTrade = {
                proposer: gameState.currentPlayer,
                recipient: parseInt(recipientIndex),
                proposerAssets: { money: proposerMoney, properties: proposerProperties },
                recipientAssets: { money: recipientMoney, properties: recipientProperties },
            };

            DOM.tradeSummary.innerHTML = `
                <p><strong>${proposer.name} offers:</strong></p>
                <ul>
                    ${proposerProperties.map(pos => `<li>${gameState.properties[pos].name}</li>`).join('')}
                    ${proposerMoney > 0 ? `<li>$${proposerMoney}</li>` : ''}
                </ul>
                <p><strong>For:</strong></p>
                <ul>
                    ${recipientProperties.map(pos => `<li>${gameState.properties[pos].name}</li>`).join('')}
                    ${recipientMoney > 0 ? `<li>$${recipientMoney}</li>` : ''}
                </ul>
            `;

            DOM.tradeModal.classList.add('hidden');
            DOM.tradeConfirmationModal.classList.remove('hidden');
        }

        function acceptTrade() {
            const { proposer, recipient, proposerAssets, recipientAssets } = activeTrade;
            const proposerPlayer = gameState.players[proposer];
            const recipientPlayer = gameState.players[recipient];

            // Exchange money
            proposerPlayer.money -= proposerAssets.money;
            recipientPlayer.money += proposerAssets.money;
            recipientPlayer.money -= recipientAssets.money;
            proposerPlayer.money += recipientAssets.money;

            // Exchange properties
            proposerAssets.properties.forEach(pos => {
                proposerPlayer.properties = proposerPlayer.properties.filter(p => p !== pos);
                recipientPlayer.properties.push(pos);
                gameState.properties[pos].owner = recipient;
            });
            recipientAssets.properties.forEach(pos => {
                recipientPlayer.properties = recipientPlayer.properties.filter(p => p !== pos);
                proposerPlayer.properties.push(pos);
                gameState.properties[pos].owner = proposer;
            });

            logMessage(`Trade between ${proposerPlayer.name} and ${recipientPlayer.name} accepted.`);
            activeTrade = null;
            DOM.tradeConfirmationModal.classList.add('hidden');
            updateUI();
        }

        function rejectTrade() {
            logMessage("Trade rejected.");
            activeTrade = null;
            DOM.tradeConfirmationModal.classList.add('hidden');
        }

        function handleBankruptcy(playerIndex, creditor) {
            const player = gameState.players[playerIndex];
            player.bankrupt = true;
            logMessage(`${player.name} has gone bankrupt!`);

            player.properties.forEach(pos => {
                const property = gameState.properties[pos];
                if (creditor) {
                    creditor.properties.push(pos);
                    property.owner = creditor.id;
                } else {
                    property.owner = null;
                    property.currently_mortgaged = false;
                    property.development = { houses: 0, hotels: 0 };
                }
            });

            player.properties = [];
            updateUI();
            checkForWinner();
        }

        function checkForWinner() {
            const activePlayers = gameState.players.filter(p => !p.bankrupt);
            if (activePlayers.length === 1) {
                logMessage(`Game over! ${activePlayers[0].name} is the winner!`);
                // Disable all game actions
                DOM.rollButton.disabled = true;
                DOM.endTurnButton.disabled = true;
                DOM.buyHouseButton.disabled = true;
                DOM.sellHouseButton.disabled = true;
                DOM.mortgageButton.disabled = true;
                DOM.unmortgageButton.disabled = true;
                DOM.tradeButton.disabled = true;
            }
        }

        function showTradeModal() {
            const player = gameState.players[gameState.currentPlayer];
            DOM.tradeProposerName.textContent = player.name;

            DOM.tradeRecipientSelect.innerHTML = '';
            gameState.players.forEach((p, index) => {
                if (index !== gameState.currentPlayer) {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = p.name;
                    DOM.tradeRecipientSelect.appendChild(option);
                }
            });

            populateTradeAssets();

            DOM.tradeRecipientSelect.addEventListener('change', populateTradeAssets);
            DOM.tradeModal.classList.remove('hidden');
        }

        function populateTradeAssets() {
            const player = gameState.players[gameState.currentPlayer];
            const recipientIndex = DOM.tradeRecipientSelect.value;
            const recipient = gameState.players[recipientIndex];

            DOM.proposerAssets.innerHTML = '<h3>Your Assets:</h3>';
            player.properties.forEach(pos => {
                const property = gameState.properties[pos];
                DOM.proposerAssets.innerHTML += `<div><input type="checkbox" id="prop-${pos}" data-player="proposer" data-pos="${pos}"> <label for="prop-${pos}">${property.name}</label></div>`;
            });
            DOM.proposerAssets.innerHTML += `<div>Money: <input type="number" id="proposer-money" class="border p-1 w-24" value="0" min="0" max="${player.money}"></div>`;

            DOM.recipientAssets.innerHTML = `<h3>Their Assets:</h3>`;
            recipient.properties.forEach(pos => {
                const property = gameState.properties[pos];
                DOM.recipientAssets.innerHTML += `<div><input type="checkbox" id="prop-${pos}" data-player="recipient" data-pos="${pos}"> <label for="prop-${pos}">${property.name}</label></div>`;
            });
            DOM.recipientAssets.innerHTML += `<div>Money: <input type="number" id="recipient-money" class="border p-1 w-24" value="0" min="0" max="${recipient.money}"></div>`;
        }

        function showBuyHouseModal() {
            const player = gameState.players[gameState.currentPlayer];
            DOM.buyHousePropertyList.innerHTML = '';

            const monopolies = getPlayerMonopolies(player);

            if (monopolies.length === 0) {
                DOM.buyHousePropertyList.innerHTML = '<p>You do not own any monopolies.</p>';
            } else {
                monopolies.forEach(group => {
                    const propertiesInGroup = Object.values(gameState.properties).filter(p => p.group === group);
                    propertiesInGroup.forEach(prop => {
                        const propPosition = Object.keys(gameState.properties).find(key => gameState.properties[key] === prop);
                        const listItem = document.createElement('div');
                        listItem.className = 'flex justify-between items-center bg-gray-50 p-2 rounded-md';
                        listItem.innerHTML = `
                            <span>${prop.name} (${prop.development.houses} houses)</span>
                            <button class="control-button text-sm px-3 py-1" data-position="${propPosition}">Buy House ($${prop.house_cost})</button>
                        `;
                            listItem.querySelector('button').addEventListener('click', () => buyHouse(propPosition));
                        DOM.buyHousePropertyList.appendChild(listItem);
                    });
                });
            }

            DOM.buyHouseModal.classList.remove('hidden');
        }

        function buyHouse(position) {
            const player = gameState.players[gameState.currentPlayer];
            const property = gameState.properties[position];

            if (!property || property.owner !== player.id) {
                logMessage("You do not own this property.");
                return;
            }

            if (player.money < property.house_cost) {
                logMessage("You cannot afford to buy a house for this property.");
                return;
            }

            if (property.development.houses >= 4) {
                logMessage("You cannot build any more houses on this property.");
                return;
            }

            // Even build rule
            const propertyGroup = Object.values(gameState.properties).filter(p => p.group === property.group && p.owner === player.id);
            const housesOnGroup = propertyGroup.map(p => p.development.houses);
            const minHouses = Math.min(...housesOnGroup);

            if (property.development.houses > minHouses) {
                logMessage("You must build evenly across all properties in this group.");
                return;
            }

            player.money -= property.house_cost;
            property.development.houses++;
            logMessage(`Bought a house for ${property.name}.`);
            updateUI();
            showBuyHouseModal(); // Refresh the modal
        }

        function getPlayerMonopolies(player) {
            const monopolies = [];
            const propertyGroups = {};

            player.properties.forEach(pos => {
                const property = gameState.properties[pos];
                if (property.group !== 'railroad' && property.group !== 'utility') {
                    if (!propertyGroups[property.group]) {
                        propertyGroups[property.group] = [];
                    }
                    propertyGroups[property.group].push(property);
                }
            });

            for (const group in propertyGroups) {
                const propertiesInGroup = Object.values(gameState.properties).filter(p => p.group === group);
                if (propertyGroups[group].length === propertiesInGroup.length) {
                    monopolies.push(group);
                }
            }

            return monopolies;
        }

        function showSellHouseModal() {
            const player = gameState.players[gameState.currentPlayer];
            DOM.sellHousePropertyList.innerHTML = '';

            const propertiesWithHouses = player.properties.map(pos => gameState.properties[pos]).filter(prop => prop && prop.development.houses > 0);

            if (propertiesWithHouses.length === 0) {
                DOM.sellHousePropertyList.innerHTML = '<p>You do not have any houses to sell.</p>';
            } else {
                propertiesWithHouses.forEach(prop => {
                    const propPosition = Object.keys(gameState.properties).find(key => gameState.properties[key] === prop);
                    const listItem = document.createElement('div');
                    listItem.className = 'flex justify-between items-center bg-gray-50 p-2 rounded-md';
                    listItem.innerHTML = `
                        <span>${prop.name} (${prop.development.houses} houses)</span>
                        <button class="control-button text-sm px-3 py-1" data-position="${propPosition}">Sell House ($${prop.house_cost / 2})</button>
                    `;
                    listItem.querySelector('button').addEventListener('click', () => sellHouse(propPosition));
                    DOM.sellHousePropertyList.appendChild(listItem);
                });
            }

            DOM.sellHouseModal.classList.remove('hidden');
    }

        function sellHouse(position) {
            const player = gameState.players[gameState.currentPlayer];
            const property = gameState.properties[position];

            if (!property || property.owner !== player.id) {
                logMessage("You do not own this property.");
                return;
            }

            if (property.development.houses === 0) {
                logMessage("This property has no houses to sell.");
                return;
            }

            // Even build rule
            const propertyGroup = Object.values(gameState.properties).filter(p => p.group === property.group && p.owner === player.id);
            const housesOnGroup = propertyGroup.map(p => p.development.houses);
            const maxHouses = Math.max(...housesOnGroup);

            if (property.development.houses < maxHouses) {
                logMessage("You must sell evenly across all properties in this group.");
                return;
            }

            player.money += property.house_cost / 2;
            property.development.houses--;
            logMessage(`Sold a house from ${property.name}.`);
            updateUI();
            showSellHouseModal(); // Refresh the modal
        }

    function showNewGameModal() {
        DOM.newGameModal.classList.remove('hidden');
        DOM.initialRollResultsDiv.classList.add('hidden');
        DOM.beginGameButton.classList.add('hidden');
        DOM.setupStartGameButton.classList.remove('hidden');
        DOM.playerSetupForm.classList.remove('hidden');
        const defaultPlayerCount = parseInt(document.querySelector('input[name="player-count"]:checked').value);
        setupPlayerInputs(defaultPlayerCount);
    }

    function setupPlayerInputs(count) {
        DOM.playerSetupForm.innerHTML = '';
        const availableColors = ['red', 'green', 'blue', 'black'];

        for (let i = 0; i < count; i++) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-input-group';
            playerDiv.innerHTML = `
                <label for="player-${i}-name">Player ${i + 1} Username:</label>
                <input type="text" id="player-${i}-name" placeholder="Enter username" value="Player ${i + 1}" class="mb-2">
                <label>Choose Color:</label>
                <div class="color-options" id="player-${i}-colors">
                    ${availableColors.map(color => `<div class="color-option ${color}" data-color="${color}" data-player-index="${i}"></div>`).join('')}
                </div>
            `;
            DOM.playerSetupForm.appendChild(playerDiv);
        }

        DOM.playerSetupForm.querySelectorAll('.color-option').forEach(option => option.addEventListener('click', handleColorSelection));

        for (let i = 0; i < count; i++) {
            const defaultColorOption = document.querySelector(`#player-${i}-colors .color-option.${availableColors[i]}`);
            if (defaultColorOption) defaultColorOption.classList.add('selected');
        }
    }

    function handleColorSelection(e) {
        const target = e.currentTarget;
        const playerIndex = target.dataset.playerIndex;
        const selectedColor = target.dataset.color;

        document.querySelectorAll(`#player-${playerIndex}-colors .color-option.selected`).forEach(option => option.classList.remove('selected'));
        target.classList.add('selected');

        document.querySelectorAll('.color-option.selected').forEach(otherSelected => {
            if (otherSelected.dataset.playerIndex !== playerIndex && otherSelected.dataset.color === selectedColor) {
                otherSelected.classList.remove('selected');
            }
        });
    }

    function startGameSetup() {
        const playerCount = parseInt(document.querySelector('input[name="player-count"]:checked').value);
        const players = [];
        let allInputsValid = true;

        for (let i = 0; i < playerCount; i++) {
            const name = document.getElementById(`player-${i}-name`).value.trim();
            const selectedColorOption = document.querySelector(`#player-${i}-colors .color-option.selected`);
            const color = selectedColorOption ? selectedColorOption.dataset.color : null;

            if (!name || !color) {
                alert("Please ensure every player has a name and a unique color.");
                allInputsValid = false;
                break;
            }

            players.push({
                id: i, name: name, money: 1500, position: 0, properties: [], getOutOfJailCards: 0, color: color, primaryColor: playerColorMap[color].primary, bgColor: playerColorMap[color].background, inJail: false, jailTurns: 0, doublesCount: 0, hasRolledInJail: false, bankrupt: false
            });
        }

        if (!allInputsValid) return;

        gameState.players = players;
        DOM.playerSetupForm.classList.add('hidden');
        DOM.setupStartGameButton.classList.add('hidden');
        DOM.initialRollResultsDiv.classList.remove('hidden');
        performInitialRolls();
    }

    async function performInitialRolls() {
        gameState.initialRolls = [];
        DOM.initialRollsList.innerHTML = '';

        for (let i = 0; i < gameState.players.length; i++) {
            const total = rollDice() + rollDice();
            gameState.initialRolls.push({ playerIndex: i, totalRoll: total });
        }

        gameState.initialRolls.sort((a, b) => b.totalRoll - a.totalRoll);
        const orderedPlayers = gameState.initialRolls.map(roll => gameState.players[roll.playerIndex]);
        gameState.players = orderedPlayers;
        gameState.players.forEach((player, index) => player.id = index);

        logMessage("Turn order determined by initial rolls:");
        gameState.players.forEach((player, index) => {
            const rollData = gameState.initialRolls.find(r => r.playerIndex === player.id);
            const rollItem = document.createElement('div');
            rollItem.className = 'initial-roll-item';
            rollItem.innerHTML = `<span>${index + 1}. ${player.name}</span> <span>Rolled ${rollData.totalRoll}</span>`;
            DOM.initialRollsList.appendChild(rollItem);
            logMessage(`${index + 1}. ${player.name}`);
        });

        DOM.beginGameButton.classList.remove('hidden');
    }

    function beginActualGame() {
        DOM.newGameModal.classList.add('hidden');
        gameState.gameStarted = true;
        createPlayerPieces();

        gameState.chanceDeck = shuffleArray([...allChanceCards]);
        gameState.commChestDeck = shuffleArray([...allCommunityCards]);
        logMessage("Chance and Community Chest cards shuffled!");

        startPlayerTurn();

        if (gameState.players.length > 0) {
            activateTab(`player-${gameState.players[0].name.replace(/\s+/g, '-')}-tab-content`);
        }
    }

    function createPlayerPieces() {
        document.querySelectorAll('.piece').forEach(piece => piece.remove());
        gameState.players.forEach((player, index) => {
            const piece = document.createElement('div');
            piece.className = `piece player-${index}`;
            piece.id = `player-${player.id}-piece`;
            piece.style.backgroundColor = player.primaryColor;

            const { top, left } = getSpaceCoordinates(0);
            piece.style.top = top;
            piece.style.left = left;
            // Add a slight offset for each piece so they don't overlap perfectly
            const offset = index * 4; // 4px offset per player
            piece.style.transform = `translate(${offset}px, ${offset}px)`;

            DOM.board.appendChild(piece);
        });
    }


    // --- CORE GAME LOGIC ---

    function startPlayerTurn() {
        const player = gameState.players[gameState.currentPlayer];
        logMessage(`--- ${player.name}'s turn ---`);

        DOM.rollButton.classList.add('hidden');
        DOM.endTurnButton.classList.add('hidden');
        DOM.actionButtonsRow.classList.add('hidden');
        DOM.jailOptionsRow.classList.add('hidden');

        if (player.inJail) {
            if (player.jailTurns >= 3) {
                logMessage(`${player.name} has spent 3 turns in Jail and must pay to get out.`);
                player.money -= 250;
                getOutOfJail(gameState.currentPlayer);
                DOM.diceOutputText.textContent = `Paid $250. You are out! Roll to play!`;
                DOM.rollButton.classList.remove('hidden');
            } else {
                DOM.diceOutputText.textContent = `${player.name}, you are in Jail!`;
                DOM.jailOptionsRow.classList.remove('hidden');
            }
        } else {
            DOM.diceOutputText.textContent = `${player.name}, roll to play!`;
            DOM.rollButton.classList.remove('hidden');
        }
        updateUI();
    }

    async function handleRoll() {
        const player = gameState.players[gameState.currentPlayer];
        if (gameState.isAnimating || gameState.awaitingPropertyDecision || player.inJail) return;

        DOM.rollButton.classList.add('hidden');

        const dice1 = rollDice();
        const dice2 = rollDice();
        const total = dice1 + dice2;
        gameState.lastRoll = total;

        DOM.diceOutputText.textContent = `Rolled: ${dice1} + ${dice2} = ${total}`;
        logMessage(`${player.name} rolled a ${total}.`);

        if (dice1 === dice2) {
            player.doublesCount++;
            if (player.doublesCount === 3) {
                logMessage(`${player.name} rolled doubles three times! Go to Jail!`);
                await movePlayerToJail(gameState.currentPlayer);
                endTurn();
                return;
            }
        } else {
            player.doublesCount = 0;
        }

        await movePlayer(gameState.currentPlayer, total);
        handleSpaceLanding(gameState.currentPlayer, player.position);

        if (!gameState.awaitingPropertyDecision) {
            if (player.doublesCount > 0 && !player.inJail) {
                logMessage("Rolled doubles, roll again!");
                DOM.rollButton.classList.remove('hidden');
            } else {
                DOM.actionButtonsRow.classList.remove('hidden');
                DOM.endTurnButton.classList.remove('hidden');
            }
        }
        updateUI();
    }

    function endTurn() {
        if (gameState.awaitingPropertyDecision) {
            closePropertyModal();
        }

        const player = gameState.players[gameState.currentPlayer];
        if (player.inJail) {
            player.jailTurns++;
        }
        player.doublesCount = 0;
        player.hasRolledInJail = false;

        gameState.currentPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
        startPlayerTurn();

        activateTab(`player-${gameState.players[gameState.currentPlayer].name.replace(/\s+/g, '-')}-tab-content`);
    }

    async function movePlayer(playerIndex, steps) {
        gameState.isAnimating = true;
        updateUI(); // Disable buttons

        const player = gameState.players[playerIndex];
        const piece = document.getElementById(`player-${player.id}-piece`);
        const moveDelay = 250; // ms per space

        for (let i = 0; i < steps; i++) {
            player.position = (player.position + 1) % 40;
            const { top, left } = getSpaceCoordinates(player.position);
            piece.style.top = top;
            piece.style.left = left;

            if (player.position === 0) {
                player.money += 200;
                logMessage(`${player.name} passed GO and collected $200!`);
                updatePlayerTabsAndInfo(); // Update money display immediately
            }
            await new Promise(resolve => setTimeout(resolve, moveDelay));
        }

        logMessage(`${player.name} moved to ${getSpaceName(player.position)}`);

        gameState.isAnimating = false;
        updateUI(); // Re-enable buttons
    }

    function handleSpaceLanding(playerIndex, position) {
        const spaceType = getSpaceType(position);

        switch (spaceType) {
            case 'property':
                handlePropertyLanding(playerIndex, position);
                break;
            case 'tax':
                handleTaxLanding(playerIndex, position);
                break;
            case 'card':
                handleCardLanding(playerIndex, position);
                break;
            case 'go_to_jail':
                logMessage(`${gameState.players[playerIndex].name} landed on Go to Jail!`);
                movePlayerToJail(playerIndex).then(endTurn);
                break;
            case 'go':
            case 'jail_visiting':
            case 'free_parking':
                logMessage(`${gameState.players[playerIndex].name} landed on ${getSpaceName(position)}.`);
                break;
        }
    }

    function getSpaceType(position) {
        if (gameState.properties[position]) return 'property';
        if ([4, 38].includes(position)) return 'tax';
        if ([2, 7, 17, 22, 33, 36].includes(position)) return 'card';
        if (position === 30) return 'go_to_jail';
        if (position === 0) return 'go';
        if (position === 10) return 'jail_visiting';
        if (position === 20) return 'free_parking';
        return 'other';
    }

    function handlePropertyLanding(playerIndex, position) {
        const property = gameState.properties[position];
        const player = gameState.players[playerIndex];

        if (property.owner === null) {
            gameState.awaitingPropertyDecision = true;
            showPropertyModal(position);
            DOM.rollButton.classList.add('hidden');
        } else if (property.owner !== player.id) {
            if (property.currently_mortgaged) {
                logMessage(`${player.name} landed on ${property.name}, but it's mortgaged. No rent due.`);
                return;
            }
            const owner = gameState.players.find(p => p.id === property.owner);
            let rent = 0;

            if (property.group === 'railroad') {
                const railroadsOwned = owner.properties.map(p => gameState.properties[p]).filter(p => p.group === 'railroad').length;
                rent = 25 * Math.pow(2, railroadsOwned - 1);
            } else if (property.group === 'utility') {
                const utilitiesOwned = owner.properties.map(p => gameState.properties[p]).filter(p => p.group === 'utility').length;
                const lastRoll = gameState.lastRoll;
                rent = utilitiesOwned === 1 ? lastRoll * 4 : lastRoll * 10;
            } else if (property.development.hotels > 0) {
                rent = property.hotel_rent;
            } else if (property.development.houses > 0) {
                const houseRentKey = { 1: 'one', 2: 'two', 3: 'three', 4: 'four' };
                rent = property.house_rent[houseRentKey[property.development.houses]];
            } else {
                rent = property.rent;
            }

            if (player.money < rent) {
                logMessage(`${player.name} cannot afford rent to ${owner.name}.`);
                handleBankruptcy(playerIndex, owner);
            } else {
                player.money -= rent;
                owner.money += rent;
                logMessage(`${player.name} paid $${rent} rent to ${owner.name}.`);
            }
        } else {
            logMessage(`${player.name} landed on their own property, ${property.name}.`);
        }
    }

    function handleTaxLanding(playerIndex, position) {
        const tax = position === 4 ? 200 : 100;
        const player = gameState.players[playerIndex];
        logMessage(`${player.name} landed on ${getSpaceName(position)} and must pay $${tax}.`);
        if (player.money < tax) {
            handleBankruptcy(playerIndex, null);
        } else {
            player.money -= tax;
        }
    }

    function handleCardLanding(playerIndex, position) {
        if ([7, 22, 36].includes(position)) {
            drawCard('chance', playerIndex);
        } else {
            drawCard('community', playerIndex);
        }
    }


    // --- PLAYER ACTIONS ---

    function showPropertyModal(position) {
        const property = gameState.properties[position];
        const player = gameState.players[gameState.currentPlayer];

        const imageUrl = propertyImageMap[property.name] || 'https://placehold.co/300x400/cccccc/333333?text=Property+Card';
        DOM.propertyCardImage.src = imageUrl;
        DOM.propertyCardImage.alt = `${property.name} Property Card`;

        DOM.modalBuyButton.style.display = (player.money >= property.price) ? 'block' : 'none';
        DOM.modalBuyButton.onclick = () => buyProperty(position);

        DOM.propertyModal.classList.remove('hidden');
    }

    function closePropertyModal() {
        DOM.propertyModal.classList.add('hidden');
        gameState.awaitingPropertyDecision = false;

        const player = gameState.players[gameState.currentPlayer];
        if (player.doublesCount > 0) {
            DOM.rollButton.classList.remove('hidden');
        } else {
            DOM.actionButtonsRow.classList.remove('hidden');
            DOM.endTurnButton.classList.remove('hidden');
        }
        updateUI();
    }

    function buyProperty(position) {
        const property = gameState.properties[position];
        const player = gameState.players[gameState.currentPlayer];

        if (player.money >= property.price) {
            player.money -= property.price;
            property.owner = player.id;
            player.properties.push(position);

            logMessage(`${player.name} bought ${property.name} for $${property.price}`);
            updateBoardVisuals();
        }
        closePropertyModal();
    }


    // --- JAIL LOGIC ---

    async function movePlayerToJail(playerIndex) {
        gameState.isAnimating = true;
        updateUI();

        const player = gameState.players[playerIndex];
        player.position = 10;
        player.inJail = true;
        player.jailTurns = 0;
        player.doublesCount = 0;
        player.hasRolledInJail = false;

        const piece = document.getElementById(`player-${player.id}-piece`);
        const { top, left } = getSpaceCoordinates(10);
        piece.style.top = top;
        piece.style.left = left;

        logMessage(`${player.name} was sent to Jail.`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Animation time

        gameState.isAnimating = false;
        updateUI();
    }

    function getOutOfJail(playerIndex) {
        const player = gameState.players[playerIndex];
        player.inJail = false;
        player.jailTurns = 0;
        player.hasRolledInJail = false;
        logMessage(`${player.name} is out of Jail!`);
    }

    function handleJailPay() {
        const player = gameState.players[gameState.currentPlayer];
        const cost = 250;
            if (player.money < cost) {
                logMessage(`${player.name} does not have enough money to pay.`);
                handleBankruptcy(gameState.currentPlayer, null);
            } else {
            player.money -= cost;
            logMessage(`${player.name} paid $${cost} to get out of Jail.`);
            getOutOfJail(gameState.currentPlayer);
            DOM.diceOutputText.textContent = 'You are out! Roll to play!';
            DOM.jailOptionsRow.classList.add('hidden');
            DOM.rollButton.classList.remove('hidden');
        }
        updateUI();
    }

    function handleJailCard() {
        const player = gameState.players[gameState.currentPlayer];
        if (player.getOutOfJailCards > 0) {
            player.getOutOfJailCards--;
            logMessage(`${player.name} used a Get Out of Jail Free Card.`);
            getOutOfJail(gameState.currentPlayer);
            DOM.diceOutputText.textContent = 'You are out! Roll to play!';
            DOM.jailOptionsRow.classList.add('hidden');
            DOM.rollButton.classList.remove('hidden');
        }
        updateUI();
    }

    async function handleJailRoll() {
        const player = gameState.players[gameState.currentPlayer];
        player.hasRolledInJail = true;

        const dice1 = rollDice();
        const dice2 = rollDice();
        DOM.diceOutputText.textContent = `Rolled: ${dice1} + ${dice2}`;
        logMessage(`${player.name} rolled a ${dice1} and ${dice2} in Jail.`);

        if (dice1 === dice2) {
            logMessage(`Rolled doubles! ${player.name} is out of Jail!`);
            getOutOfJail(gameState.currentPlayer);
            DOM.jailOptionsRow.classList.add('hidden');

            // Now move the player by the doubles roll
            await movePlayer(gameState.currentPlayer, dice1 + dice2);
            handleSpaceLanding(gameState.currentPlayer, player.position);
            DOM.actionButtonsRow.classList.remove('hidden');
            DOM.endTurnButton.classList.remove('hidden');

        } else {
            logMessage(`Did not roll doubles. Turn ends.`);
            endTurn();
        }
        updateUI();
    }


    // --- CARD LOGIC ---

    function drawCard(deckType, playerIndex) {
        const deck = deckType === 'chance' ? gameState.chanceDeck : gameState.commChestDeck;
        const player = gameState.players[playerIndex];

        if (deck.length === 0) {
            logMessage("Deck is empty! This should not happen.");
            return;
        }

        const card = deck.shift();
        logMessage(`${player.name} drew a ${deckType} card: "${card.name}"`);

        processCardEffect(playerIndex, card);

        if (card.type !== 'get_out_of_jail_free') {
            deck.push(card);
        }
        updateUI();
    }

    async function processCardEffect(playerIndex, card) {
        const player = gameState.players[playerIndex];
        switch (card.type) {
            case 'advance_to':
                const currentPos = player.position;
                const targetPos = card.target;
                const steps = (targetPos > currentPos) ? targetPos - currentPos : (40 - currentPos) + targetPos;
                await movePlayer(playerIndex, steps);
                handleSpaceLanding(playerIndex, player.position);
                break;
            case 'go_to_jail':
                await movePlayerToJail(playerIndex);
                endTurn();
                break;
            case 'collect_money':
                player.money += card.amount;
                logMessage(`${player.name} collected $${card.amount}.`);
                break;
            case 'pay_tax':
                player.money -= card.amount;
                logMessage(`${player.name} paid $${card.amount}.`);
                break;
            case 'get_out_of_jail_free':
                player.getOutOfJailCards++;
                break;
            default:
                logMessage(`Card type "${card.type}" not yet implemented.`);
        }
    }


    // --- MORTGAGE LOGIC ---

    function showMortgageModal() {
        const player = gameState.players[gameState.currentPlayer];
        DOM.mortgagePropertyList.innerHTML = '';

        const unmortgagedProperties = player.properties
            .map(pos => gameState.properties[pos])
            .filter(prop => prop && !prop.currently_mortgaged);

        if (unmortgagedProperties.length === 0) {
            DOM.mortgagePropertyList.innerHTML = '<p>No properties available to mortgage.</p>';
        } else {
            unmortgagedProperties.forEach(prop => {
                const propPosition = Object.keys(gameState.properties).find(key => gameState.properties[key] === prop);
                const listItem = document.createElement('div');
                listItem.className = 'flex justify-between items-center bg-gray-50 p-2 rounded-md';
                listItem.innerHTML = `
                    <span>${prop.name} (Value: $${prop.mortgage_value})</span>
                    <button class="control-button text-sm px-3 py-1" data-position="${propPosition}">Mortgage</button>
                `;
                DOM.mortgagePropertyList.appendChild(listItem);
            });
            DOM.mortgagePropertyList.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => mortgageProperty(parseInt(e.target.dataset.position)));
            });
        }
        DOM.mortgageModal.classList.remove('hidden');
    }

    function mortgageProperty(position) {
        const player = gameState.players[gameState.currentPlayer];
        const property = gameState.properties[position];

        if (property && !property.currently_mortgaged && property.owner === player.id) {
            property.currently_mortgaged = true;
            player.money += property.mortgage_value;
            logMessage(`${player.name} mortgaged ${property.name} for $${property.mortgage_value}.`);

            DOM.mortgageModal.classList.add('hidden');
            updateUI();
        }
    }

    function showUnmortgageModal() {
        const player = gameState.players[gameState.currentPlayer];
        DOM.unmortgagePropertyList.innerHTML = '';

        const mortgagedProperties = player.properties
            .map(pos => ({ pos, prop: gameState.properties[pos] }))
            .filter(({ prop }) => prop && prop.currently_mortgaged);

        if (mortgagedProperties.length === 0) {
            DOM.unmortgagePropertyList.innerHTML = '<p>No properties to unmortgage.</p>';
        } else {
            mortgagedProperties.forEach(({ pos, prop }) => {
                const listItem = document.createElement('div');
                listItem.className = 'flex justify-between items-center bg-gray-50 p-2 rounded-md';
                listItem.innerHTML = `
                    <span>${prop.name} (Cost: $${prop.mortgage_payment})</span>
                    <button class="control-button text-sm px-3 py-1" data-position="${pos}">Unmortgage</button>
                `;
                DOM.unmortgagePropertyList.appendChild(listItem);
            });
            DOM.unmortgagePropertyList.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => unmortgageProperty(parseInt(e.target.dataset.position)));
            });
        }
        DOM.unmortgageModal.classList.remove('hidden');
    }

    function unmortgageProperty(position) {
        const player = gameState.players[gameState.currentPlayer];
        const property = gameState.properties[position];
        const cost = property.mortgage_payment;

        if (property && property.currently_mortgaged && property.owner === player.id) {
            if (player.money >= cost) {
                player.money -= cost;
                property.currently_mortgaged = false;
                logMessage(`${player.name} unmortgaged ${property.name} for $${cost}.`);

                DOM.unmortgageModal.classList.add('hidden');
                updateUI();
            } else {
                logMessage(`${player.name} cannot afford to unmortgage ${property.name}.`);
            }
        }
    }

    // --- MAIN ---
    initGame();
});
