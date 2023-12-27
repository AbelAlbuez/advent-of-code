// Instructions:
// URL: https://adventofcode.com/2023/day/1

const fs = require('fs');
const readline = require('readline');

const filePath = './input.txt';

const fileStream = fs.createReadStream(filePath);
const numbers = [
    { text: "one", value: 1 },
    { text: "two", value: 2 },
    { text: "three", value: 3 },
    { text: "four", value: 4 },
    { text: "five", value: 5 },
    { text: "six", value: 6 },
    { text: "seven", value: 7 },
    { text: "eight", value: 8 },
    { text: "nine", value: 9 }
];

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const calibrationValues = [];
let response = 0;

rl.on('line', (line) => {
    let first = 0;
    let last = 0;
    let word = ''
    let calibrationValue = '';
    const numbersText = numbers.map(item => item.text);


    line.split('').forEach((element, index) => {

        if (!isNaN(element)) {
            const value = Number(element);
            if (first < 1) {
                first = value
            }

            last = value
        } else {

            word = word + element
            numbersText.forEach(current => {
                const hasNumber = word.includes(current);
                if (hasNumber) {
                    const position = numbersText.indexOf(current);;
                    const number = numbers[position];
                    console.log('found word: ', word)
                    console.log('found number: ', number.value)
                    if (first < 1) {
                        first = number.value
                    }

                    last = number.value

                    word = ''
                }

            })

        }

    });

    calibrationValue = `${first}${last}`;
    calibrationValues.push(calibrationValue)
});


rl.on('close', () => {
    calibrationValues.forEach(calibrationValue => {
        response += Number(calibrationValue)

    })
    console.log(response);
    console.log('File has been read completely.');
});
