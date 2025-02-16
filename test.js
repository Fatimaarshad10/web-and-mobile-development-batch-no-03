
// // * The function is expected to return an INTEGER.
// // * The function accepts following parameters:
// // *  1. INTEGER_ARRAY startTimes
// // *  2. INTEGER_ARRAY endTimes
// // */


// // minimumRooms([900 ,  1000  , 930 ] , [ 1030 ,  1200 ,  1100])
// // function minimumRooms(startTimes, endTimes) {
// //     if (startTimes.length !== endTimes.length) {
// //         return -1;
// //     }
// //     if (startTimes >= endTimes){
// //         return -1;
// //     }

// //     startTimes.sort((a, b) => a - b);
// //     endTimes.sort((a, b) => a - b);

// //     let rooms = 0;
// //     let maxRooms = 0;
// //     let i = 0;
// //     let j = 0;

// //     while (i < startTimes.length) {
// //         if (startTimes[i] < endTimes[j]) {
// //             rooms++;
// //             maxRooms = Math.max(maxRooms, rooms);
// //             i++;
// //         } else if (endTimes[j] <= startTimes[i]) {
// //             rooms--;
// //             j++;
// //         }
// //     }

// //     return maxRooms;
// // }

// // console.log(minimumRooms([900, 1000, 1100], [1030, 950, 1200]));



// // 'use strict';

// // const fs = require('fs');

// // process.stdin.resume();
// // process.stdin.setEncoding('utf-8');

// // let inputString = '';
// // let currentLine = 0;

// // process.stdin.on('data', function(inputStdin) {
// //     inputString += inputStdin;
// // });

// // process.stdin.on('end', function() {
// //     inputString = inputString.split('\n');

// //     main();
// // });

// // function readLine() {
// //     return inputString[currentLine++];
// // }



// /*
//  * Complete the 'maxProfitability' function below.
//  *
//  * The function is expected to return an INTEGER.
//  * The function accepts following parameters:
//  *  1. INTEGER_ARRAY budgets
//  *  2. INTEGER_ARRAY investments
//  *  3. INTEGER_ARRAY profitability
//  */

//     // function maxProfitability(budgets, investments, profitability) {

//     // }
//     // maxProfitability([50,100 , 200] , [40, 80 , 120 , 150])
//     // 1 each entrepreneur can invest at most one startup
//     // 2 an entrepreneur can only invest in a startup if their budgets meets or exceed the requirement investment 
//     // 3 entrepreneur prioritize startups with the highest profitability score when choosing where to invest
//     // 4 if two startups have the same profitability score, the entrepreneur will choose the one with the lower budget requirement
// function maxProfitability(budgets, investments, profitability) {
//     let totalProfit = 0;
//     let startups = investments.map((investment, index) => ({
//         investment,
//         profitability: profitability[index]
//     }));

//     startups.sort((a, b) => {
//         if (b.profitability === a.profitability) {
//             return a.investment - b.investment;
//         }
//         return b.profitability - a.profitability;
//     });

//     budgets.sort((a, b) => b - a);

//     for (let budget of budgets) {
//         for (let i = 0; i < startups.length; i++) {
//             if (budget >= startups[i].investment) {
//                 totalProfit += startups[i].profitability;
//                 startups.splice(i, 1);
//                 break;
//             }
//         }
//     }

//     return totalProfit;
// }
// console.log(maxProfitability([50, 100, 200], [40, 80, 120, 150], [60, 100, 120, 90]));
// console.log(maxProfitability([50, 100, 200], [40, 80, 120, 150], [60, 100, 120, 90]));


/*
 * Complete the 'jobScheduling' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY jobs as parameter.
 */

function jobScheduling(jobs) {

}
// You are given nth jobs 
// each jobs have a processing time 
// deadline 
// profit 
// schedule the job such as that no 2 jobs 
// overlap and the total profit is maximized

function jobScheduling(jobs) {
    jobs.sort((a, b) => b[2] - a[2]);
    let maxDeadline = 0;
    let maxProfit = 0;
    for (let job of jobs) {
        maxDeadline = Math.max(maxDeadline, job[1]);
        maxProfit = Math.max(maxDeadline, job[2]);

    }


    let slots = new Array(maxDeadline).fill(false);

    for (let job of jobs) {
        for (let j = Math.min(maxDeadline, job[1]) - 1; j >= 0; j--) {
            if (!slots[j]) {
                slots[j] = true;
                break;
            }
        }
    }

    return [maxProfit, maxDeadline];
}

console.log(jobScheduling([[5, 4, 50], [2, 1, 30], [3, 3, 60], [1, 2, 20]])); 