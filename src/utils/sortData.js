/**
 * Created by kare2436 on 2/11/17.
 */
/**
 *
 * @param data
 * @param propertyToSort
 */
function sort(data, propertyToSort) {
    // At one hundred items and a weekend project this seemed more appropriate than
    // bringing in lodash for the sort function
    // Though that would've saved me some effort
    // Good practice though
    const lengthOfData = data.length;

    let shouldSwapItems;
    switch (typeof data[0][propertyToSort]) {
        case 'string':
            shouldSwapItems = compareStrings;
            break;
        case 'number':
            shouldSwapItems = compareNumbers;
            break;
        default:
            throw new Error('This function doesn\'t support sorting this type of data');
            break;
    }

    let swaps;

    do {
        swaps = 0;
        for (let i = 0; i < lengthOfData - 1; i++) {
            let item1 = data[i][propertyToSort];
            let item2 = data[i + 1][propertyToSort];
            if (shouldSwapItems(item1, item2)) {
                swap(data, i, i + 1);
                swaps++;
            }
        }
    } while ((swaps > 0));
}


/**
 * @description returns true if the first string comes after the second, lexicographically
 * returns false if the second string comes before the first
 * @example
 * compareStrings("ab", "aa") === true
 * compareStrings("ac", "ab") === false
 *
 * @param string1
 * @param string2
 * @return {boolean} - boolean representing whether or not they need to be swapped
 */
function compareStrings (string1, string2) {
    const shorterStringLength = string1.length < string2.length ? string1.length : string2.length;
    const isLongerStringFirst = string1.length > string2.length;
    let charCode1;
    let charCode2;

    for(let i = 0; i < shorterStringLength; i++) {
        charCode1 = string1.charCodeAt(i);
        charCode2 = string2.charCodeAt(i);
        if(charCode1 === charCode2) {
            continue;
        } else {
            // If the character is greater then that means is comes after
            return charCode1 > charCode2
        }
    }
    // We are at the end of the shortest string
    // So the longer string must come after the shorter, lexicographically
    return isLongerStringFirst;

}

/**
 *
 * @param num1
 * @param num2
 * @return {boolean} - boolean representing whether or not they need to be swapped
 */
function compareNumbers (num1, num2) {
    return num1 > num2;
}


function swap (data, index1, index2) {
    let temp = data[index1];
    data[index1] = data[index2];
    data[index2] = temp;
}




export default sort
export {swap, compareNumbers, compareStrings}
