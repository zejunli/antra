
// 1. reverse a number.
const reverseNumber = num => parseInt(num.toString().split('').reverse().join('')) * Math.sign(num);

// 2. check if given string is a palindrome.
const isPalindrome = str => {
    let reversed = str.split('').reverse().join('');
    return reversed === str;
}

// 3. all combinations of a given string.
const generateAllCombination = str => {
    let res = [];
    // closure.
    const dfs = (u, cur, str) => {
        if (cur.length) {
            res.push(cur.join(''));
        }
        for (let i = u; i < str.length; ++i) {
            cur.push(str[i]);
            dfs(i + 1, cur, str);
            cur.pop();
        }
    }

    dfs(0, [], str);
    return res;
}

// 4. sort string in alphabetical order.
const sortString = str => str.split('').sort().join('');

// 5. convert first letter of each word to upper case letter.
const firstLetterToUpper = str => {
    let words = str.split(' ');
    for (let i = 0; i < words.length; ++i) {
        let cur = words[i];
        words[i] = cur[0].toUpperCase() + cur.slice(1);
    }
    return words.join(' ');
}

// 6. find the longest word within the given string.
const getLongestWord = str => {
    let words = str.split(' ');
    let res = "";
    for (let word of words) {
        if (word.length > res.length) {
            res = word;
        }
    }
    return res;
}

// 7. count the number of vowels within the given string.
const getNumberofVowels = str => {
    let vowels = {
        'a': null, 'e': null, 'i': null, 'o': null, 'u': null
    }
    
    let res = 0;
    for (let chr of str) {
        if (chr in vowels) {
            res ++;
        }
    }
    return res;
}

// 8. check the input number is prime or not.
const isPrime = num => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; ++i) {
        if (num % i == 0) return false;
    }
    return true;
}

// 9. return the type of the given argument.
const getParamType = param => {
    return typeof param;
}

// 10. return n * n identity matrix.
const getIdentityMat = n => {
    let res = Array(n).fill().map(() => Array(n).fill(0));
    for (let i = 0; i < n; ++i) res[i][i] = 1;
    return res;
}

// 11. get second smallest and greatest number from array.
const getNumbers = arr => {
    // a is min, b is second min.
    let a = Number.MAX_SAFE_INTEGER;
    let b = Number.MAX_SAFE_INTEGER;
    // c is max, d is second max.
    let c = Number.MIN_SAFE_INTEGER;
    let d = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; ++i) {
        let cur = arr[i];
        if (cur < a) {
            b = a;
            a = cur;
        } else if (cur < b) {
            b = cur;
        }

        if (cur > c) {
            d = c;
            c = cur
        } else if (cur > d) {
            d = cur;
        }
    }

    return [b, d];
}

// 12. check if a number if perfect.
const isPerfectNumber = num => {
    let factors = [];
    for (let i = 1; i <= num / i; ++i) {
        if (num % i === 0) {
            factors.push(i);
            if (i !== num / i) factors.push(num / i);
        }
    }
    let S = 0;
    for (let x of factors) {
        if (x === num) continue;
        S += x;
    }
    return S === num;
}

// 13. find all positive factors of a positive integer.
const findAllFactors = n => {
    let factors = [];
    for (let i = 1; i <= n / i; ++i) {
        if (n % i === 0) {
            factors.push(i);
            if (i !== n) factors.push(n / i);
        }
    }
    return factors;
}

// 14. convert amount to coins.
const convertToCoin = (amount, coins) => {
    if (!amount) {
        return [];
    }
    if (amount >= coins[0]) {
        return [coins[0]].concat(convertToCoin(amount - coins[0], coins));
    } else {
        coins.shift();
        return convertToCoin(amount, coins);
    }
}

// 15. compute b^n, both of which are input taken from the user.
const calcExpo = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    readline.question("Input base and exponent separated by single space: ", n => {
        let nums = n.split(' ').map(n => parseInt(n));
        console.log(nums);
        console.log("result is: ", Math.pow(nums[0], nums[1]));
        readline.close();
    })
}

// 16. extract unique characters from a given string.
const getUniqueCharNum = str => {
    let mem = new Set();
    let res = '';
    for (let chr of str) {
        if (!mem.has(chr)) {
            res += chr;
            mem.add(chr);
        }
    }
    return res; 
}

// 17. get occurrences of each characters of a given string;
const getFreq = str => {
    let mem = {};
    for (let chr of str) {
        if (!(chr in mem)) {
            mem[chr] = 1;
        }
        else {
            mem[chr] ++;
        }
    }
    return mem;
}

// 18. implement binary search.
const bsearch = (arr, target) => {
    let l = 0, r = arr.length - 1;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] >= target) r = mid;
        else l = mid + 1;
    }

    return l;
}

// 19. return elements that are larger than given number.
const getLargerNums = (arr, target) => {
    let res = [];
    for (let x of arr) {
        if (x > target) {
            res.push(x);
        }
    }
    return res;
}

// 20. generate a string id of given length.
const getRandomStr = len => {
    let mem = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let res = '';
    for (let i = 0; i < len; ++i) {
        res += mem[Math.floor(Math.random() * mem.length)];
    }
    return res;
}

// 21. get subset of fixed length.
const getSubsetWithLen = (arr, len) => {
    let res = [];
    const dfs = (u, path) => {
        if (path.length === len) {
            res.push([...path]);
            return ;
        }
        for (let i = u; i < arr.length; ++i) {
            path.push(arr[i]);
            dfs(i + 1, path);
            path.pop();
        }
    }
    dfs(0, []);
    return res;
}

// 22. get frequency of the target character from the string.
const countFreqOfChar = (str, target) => {
    let res = 0;
    for (let chr of str) {
        if (chr === target) {
            res ++;
        }
    }
    return res;
}

// 23. find first non-repeated character from string.
const getFirstNonRepeatedChar = str => {
    let mem = {};
    for (let chr of str) {
        if (chr in mem) {
            mem[chr] ++;
        } else {
            mem[chr] = 1;
        }
    }

    for (let chr of str) {
        if (mem[chr] === 1) {
            return chr;
        }
    }
    return undefined;
}

// 24. bubble sort
const bubbleSort = arr => {
    for (let i = 1; i < arr.length; ++i) {
        for (let j = 0; j < arr.length - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 25. return the longest country name.
const getLongestCountryName = countryNames => {
    let res = '';
    for (let name of countryNames) {
        if (name.length > res.length) {
            res = name;
        }
    }
    return res;
}

// 26. find the longest substring without repeating characters.
const findLongestSubstr = str => {
    let mem = {};
    let res = '';
    for (let i = 0, j = 0; i < str.length;) {
        while (!(str[i] in mem)) {
            mem[str[i]] = i;
            i ++;
        }
        if (i - j > res.length) {
            res = str.slice(j, i);
        }
        
        j = mem[str[i]] + 1;
        delete mem[str[i]];
    }
    return res;
}

// 27. get the longest palimdrome from a string.
const getLongestPalindrome = str => {
    if (isPalindrome(str)) return str;
    let res = '';
    for (let i = 0; i < str.length; ++i) {
        for (let j = i + 1; j <= str.length; ++j) {
            let cur = str.slice(i, j);
            if (isPalindrome(cur)) {
                if (cur.length > res.length) {
                    res = cur;
                }
            }
        }
    }
    return res;
}

// 28. function that takes a function as parameter.
const execute = (func, ...args) => {
    // variadic function.
    func(...args)
    return 0;
}

// 28. get the name of the argument function.
const reflectFuncName = (func) => {
    return func.name
}

console.log(reverseNumber(-123));
console.log(isPalindrome("abba"));
console.log(generateAllCombination("dog"));
console.log(sortString("webmaster"));
console.log(firstLetterToUpper("the quick brown fox"));
console.log(getLongestWord("Web Development Tutorial"));
console.log(getNumberofVowels("The quick brown fox"))
console.log(isPrime(2));
console.log(getParamType(() => 5));
console.log(getIdentityMat(4));
console.log(getNumbers([5, 3, 1, 2, 4]));
console.log(isPerfectNumber(8128));
console.log(findAllFactors(6));
console.log(convertToCoin(46, [25, 10, 10, 1]));
// console.log(calcExpo());
console.log(getUniqueCharNum('thequickbrownfoxjumpsoverthelazydog'))
console.log(getFreq("aabb"));
console.log(bsearch([1, 2, 3, 4, 5], 2));
console.log(getLargerNums([1, 2, 3, 4], 1));
console.log(getRandomStr(10));
console.log(getSubsetWithLen([1, 2, 3], 2));
console.log(countFreqOfChar("hello", 'l'));
console.log(getFirstNonRepeatedChar("abacddbec"))
console.log(bubbleSort([3, 2, 1, 5, 7, 10, 8]));
console.log(getLongestCountryName((["Australia", "Germany", "United States of America"])))
console.log(findLongestSubstr("pwwkew"));
console.log(getLongestPalindrome("abccccdd"));
console.log(execute((...args) => console.log(args), true, undefined, 'hello', 1));

const hello = () => {console.log("hello")};
console.log(reflectFuncName(hello));
