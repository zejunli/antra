/*

Author: Zejun Li
Date: May 05, 2023
Project: Word Guessing Game With MVC Pattern.

*/

const API = 'https://random-word-api.herokuapp.com/word'
const MAX_CHANCE = 10;

const GetRandomWordAPI = (apiURL => {
    const getWord = fetch(apiURL).then(res => res.json()).catch(err => console.log('Error is: ' + err));

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
    }
    
    // this function wraps each letter with a <span>, this is so we can customize
    // the letter's style on the finer granularity.
    const createWordTemplate = letters => {
        let template = '';
        letters.forEach(letter => {
            template += `<span class="wrappercard__word__letter>${letter}</span>`
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
    const { getRandomWord } = api;

    class State {
        constructor() {
            this._chance = '';
            this._guessWord = '';
        }

        get getGuessWord() {
            return this._guessWord;
        }

        set newGuessWord(word) {
            this._guessWord = word;
            let wordElement = document.querySelector(domSelector.guessWord);
            let template = createWordTemplate(this._guessWord.split(''));
            render(wordElement, template)
        }
        
        set newChance(chance) {
            this._chance = chance;
            let chanceElement = document.querySelector(domSelector.chance);
            render(chanceElement, this._chance);
        }
    }

    return {
        State,
        getRandomWord
    }

})(GetRandomWordAPI, View);
