/*

Author: Zejun Li
Date: May 05, 2023
Project: Word Guessing Game With MVC Pattern.

*/

const API = 'https://random-word-api.herokuapp.com/word'

const GetRandomWordAPI = (apiURL => {
    const getWord = fetch(apiURL).then(res => res.json()).catch(err => console.log('Error is: ' + err));

    return {
        getWord
    }
})(API)

GetRandomWordAPI.getWord.then(data => console.log(data[0]));



