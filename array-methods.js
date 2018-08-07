var dataset = require('./dataset.json');

var acctInfo = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;

let hundredThousand = acctInfo.filter(arr =>
  arr.amount > 100000
);

hundredThousandairs = hundredThousand;

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;

const roundedDollar = acctInfo.map(element => {
  var rObj = {};
  rObj["amount"] = element.amount;
  rObj["state"] = element.state;
  rObj["rounded"] = Math.round(Number(element.amount));
  return rObj;
});

datasetWithRoundedDollar = roundedDollar;

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;

const roundedDime = acctInfo.map(element => {
  var rObj = {};
  rObj["amount"] = element.amount;
  rObj["state"] = element.state;
  rObj["roundedDime"] = (Math.round(Number(element.amount) * 10) / 10);
  return rObj;
});

datasetWithRoundedDime = roundedDime;

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

// const sumBalance = (accumulator, currentValue) => accumulator + currentValue;


sumOfBankBalances = acctInfo.reduce((accumulator, currentValue) => {
  let answer = accumulator + Number(currentValue.amount);
  return ((Math.round(answer * 100)) / 100);
}, 0);


/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;

sumOfInterests = (acctInfo.filter(arr => arr.state === "WI" || arr.state === "IL" || arr.state === "WY" || arr.state === "OH" || arr.state === "GA" || arr.state === "DE")).reduce((accumulator, currentValue) => {
  let answer = accumulator + (Number(currentValue.amount) * 0.189);
  return ((Math.round(answer * 100)) / 100);
}, 0)

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = {};

const stateObj = acctInfo.map(arr => {
  if (!stateSums.hasOwnProperty(arr.state)) {
    stateSums[arr.state] = Number(arr.amount);
  } else {
    stateSums[arr.state] = (Math.round((stateSums[arr.state] + Number(arr.amount)) * 100) / 100);
  }
})




/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`
 
  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = 0;

let highInterestArr = acctInfo.filter(arr => arr.state !== "WI" && arr.state !== "IL" && arr.state !== "WY" && arr.state !== "OH" && arr.state !== "GA" && arr.state !== "DE");

var stateHighSums = {};

const stateHighIntObj = highInterestArr.map(arr => {
  if (!stateHighSums.hasOwnProperty(arr.state)) {
    stateHighSums[arr.state] = Number(arr.amount);
  } else {
    stateHighSums[arr.state] = stateHighSums[arr.state] + Number(arr.amount);
  }
})

const numberAmounts = Object.values(stateHighSums);

const interestAmounts = numberAmounts.map(num => {
  if ((Math.round((num * 0.189) * 100) / 100) > 50000) {
    return num;
  }
})

const filteredInterestAmounts = interestAmounts.filter(arr => arr !== undefined);

sumOfHighInterests = filteredInterestAmounts.reduce((accumulator, currentValue) => {
  let answer = accumulator + (currentValue * 0.189);
  return ((Math.round(answer * 100) / 100))
}, 0);


/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

var stateLow = {};

const stateLowObj = acctInfo.map(arr => {
  if (!stateLow.hasOwnProperty(arr.state)) {
    stateLow[arr.state] = Number(arr.amount);
  } else {
    stateLow[arr.state] = stateLow[arr.state] + Number(arr.amount);
  }
})

const lowStates = Object.keys(stateLow);
const lowSums = Object.values(stateLow);

const lowMapping = lowStates.map((value, index) => {
  return linkContent = {
    state: value,
    amount: lowSums[index]
  }
})

const lookingLowStates = lowMapping.map(arr => {
  if (arr.amount < 1000000) {
    return arr.state;
  }
})

lowerSumStates = lookingLowStates.filter(arr => arr !== undefined);


// const filteredInterestAmounts = interestAmounts.filter(arr => arr !== undefined);

// sumOfHighInterests = filteredInterestAmounts.reduce((accumulator, currentValue) => {
//   let answer = accumulator + (currentValue * 0.189);
//   return ((Math.round(answer * 100) / 100))
// }, 0);


/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
 
  Check if all of these states have a sum of account values
  greater than 2,550,000
 
  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss
 
  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
