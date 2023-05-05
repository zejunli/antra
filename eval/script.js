/*

Author: Zejun Li
Date: May 05, 2023
Project: Word Guessing Game With MVC Pattern.

*/

const API = 'https://random-word-api.herokuapp.com/word'
const MAX_CHANCE = 10;

// !This is currently not used!
const GetRandomWordAPI = (apiURL => {
    const getWord = fetch(apiURL)
                    .then(res => res.json())
                    .catch(err => console.log('Error is: ' + err));

    return {
        getWord
    }
})(API);

// GetRandomWordAPI.getWord.then(data => console.log(data[0]));

const View = (() => {
    const domSelector = {
        chance: "#chance",
        guessWord: "#guess-word",
        btn: "#new-game-btn",
        inputBox: "#user-input"
    }
    
    // this function wraps each letter with a <span>, this is so we can customize
    // the letter's style on the finer granularity.
    const createWordTemplate = letters => {
        let template = '';
        letters.forEach(letter => {
            template += '<span class=wrappercard__word__letter>' + letter + '</span>'
        });
        return template;
    }

    const render = (element, template) => {
        element.innerHTML = template;
    }

    return {
        domSelector,
        createWordTemplate,
        render
    }
})();


const Model = ((api, view) => {
    const { domSelector, createWordTemplate, render } = view;
    const { getWord } = api;

    class State {
        constructor() {
            this._chance = '';
            this._guessWord = '';
            this._displayedWord = '';
            this._mem = {};
            this._used = 0;
            // the number of words guessed right.
            this._hit = 0;
        }

        get guessWord() {
            return this._guessWord;
        }

        get hiddenChars() {
            return this._mem;
        }

        get displayedWord() {
            return this._displayedWord
        }

        get used() {
            return this._used
        }

        get hit() {
            return this._hit;
        }

        set newDisplayedWord(word) {
            // this is the word to be displayed on the website, i.e. with underscore.
            this._displayedWord = word;
            console.log
            this._mem = {};
            // preprocessing the letters that are hidden.
            for (let i = 0; i < this._guessWord.length; ++i) {
                let realLetter = this._guessWord[i];
                let corr = this._displayedWord[i];
                if (corr === '_') {
                    if (realLetter in this._mem) {
                        this._mem[realLetter].push(i);
                    } else {
                        this._mem[realLetter] = [i];
                    }
                }
            }
            
            console.log(this._mem);
            let wordElement = document.querySelector(domSelector.guessWord);
            let template = createWordTemplate(this._displayedWord.split(''));
            render(wordElement, template)
        }

        set newGuessWord(word) {
            this._guessWord = word;
        }
        
        set newChance(chance) {
            this._chance = chance;
            let chanceElement = document.querySelector(domSelector.chance);
            render(chanceElement, this._chance);
        }

        set used(target) {
            this._used = target;
        }

        set hit(target) {
            this._hit = target;
        }
    }

    return {
        State,
        getWord,
    }

})(GetRandomWordAPI, View);


const Controller = ((view, model) => {
    const { domSelector } = view;
    const { State, getWord } = model;

    const state = new State();
    const init = (isNewGame, keepChance) => {
        fetch(API).then(res => res.json()).catch(err => console.log(err)).then(data => {
            console.log("data is: ", data)
            // If a new game starts, reset chance as well.
            if (isNewGame) {
                if (!keepChance) {
                    state.used = 0;
                    state.newChance = state.used + ' / ' + MAX_CHANCE
                    state.hit = 0;
                }
                console.log(state.used);
            }

            let originalWord = data[0].split('');
            // Generate a random length.
            let randomLen = Math.floor(Math.random() * originalWord.length) + 1;

            // For this random length, generate random index one at a time and 
            // set the corresponding letter to underscore.
            for (let i = 0; i < randomLen; ++i) {
                let randomIdx = Math.floor(Math.random() * originalWord.length);
                originalWord[randomIdx] = '_';
            }

            // Convert array back to string as we pass in string instead of array.
            displayWord = originalWord.join('');
            state.newGuessWord = data[0];
            state.newDisplayedWord = displayWord;
        });
    }

    const registerCallbacks = () => {
        const newGameBtn = document.querySelector(domSelector.btn);
        const inputBox = document.querySelector(domSelector.inputBox);
        
        // On clicking 'New Game', a new random word is retrieved a set up for guess.
        newGameBtn.addEventListener('click', () => {
            init(true, false);
        });
        

        inputBox.addEventListener('input', () => {
            console.log(inputBox.value);
            let inputChar = inputBox.value;

            // Check if the guessed character hits.
            if (inputChar in state.hiddenChars) {
                // hit, reveal the letters being hit.
                let currentDisplay = state.displayedWord;
                currentDisplay = currentDisplay.split('');
                let indices = state.hiddenChars[inputChar];

                for (let i = 0; i < indices.length; ++i) {
                    let idx = indices[i];
                    currentDisplay[idx] = inputChar;
                }
                
                // this char has been revealed, therefore delete it from memory.
                delete state.hiddenChars[inputChar];
                console.log(state.hiddenChars);
                
                currentDisplay = currentDisplay.join('');
                state.newDisplayedWord = currentDisplay;
                setTimeout(() => {inputBox.value = ''}, 200);
                
                // guesse this word right.
                if (currentDisplay === state.guessWord) {
                    console.log("CORRECT!");
                    state.hit = state.hit + 1;
                    init(true, true)
                }
            } else {
                // miss, need to update chance.
                state.used = state.used + 1;
                state.newChance = state.used + ' / ' + MAX_CHANCE;
                setTimeout(() => {inputBox.value = ''}, 200);
                // exhausted all chances, pop up alert and reset the game.
                if (state.used === MAX_CHANCE) {
                    window.alert("Game Over! You have guessed " + state.hit + " words!");
                    init(true, false);
                    return ;
                }
            }
        })

    }

    const bootstrap = () => {
        init(true, false);
        registerCallbacks();
    }

    return {
        bootstrap,
    }
})(View, Model);

Controller.bootstrap();
