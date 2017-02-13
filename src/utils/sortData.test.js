/**
 * Created by kare2436 on 2/11/17.
 */
import sort, {compareNumbers, compareStrings, swap} from './sortData'

describe('sortData', ()=> {
    it('should do something', () =>{
        expect(true).toEqual(true)
    });


    describe('swap', () => {
        it('should swap two values', () => {
            let test = [1, 2];
            swap(test, 0, 1);
            expect(test).toEqual([2,1]);
        });

        it('should swap two values far away from each other', () => {
            let test = [1, 2, 3, 4, 6, 7, 2, 9];
            swap(test, 0, 7);
            expect(test).toEqual([9, 2, 3, 4, 6, 7, 2, 1]);
        });
    });

   describe('compareNumbers', () => {
        it('should return false for equal numbers', () => {
            expect(compareNumbers(1, 1)).toEqual(false)
        });

        it('should return true when first arg is greater than second arg', () => {
            expect(compareNumbers(36, 25)).toEqual(true)
        });

       it('should return false when first arg is less than second arg', () => {
           expect(compareNumbers(25, 32)).toEqual(false)
       });
   })

    describe('compareStrings', () => {
        it('should return false for equal strings', () => {
            expect(compareStrings("aa", "aa")).toEqual(false)
        });

        it('should return true when first arg is identical but longer than second arg', () => {
            expect(compareStrings("aaa", "aa")).toEqual(true)
        });

        it('should return false when second arg is identical but longer than first arg', () => {
            expect(compareStrings("aa", "aaa")).toEqual(false)
        });

        it('should return true when first arg comes after second arg lexicographically', () => {
            expect(compareStrings("ab", "aa")).toEqual(true)
        });

        it('should return false when first arg comes before second arg lexicographically', () => {
            expect(compareStrings("af", "ag")).toEqual(false)
        });
    });

    describe('sort', () => {
        it('should sort by number in data object array', () => {
            const numItemsToGen = 100;
            let data = [], expected = [];

            for (let i = 0; i < numItemsToGen; i++ ) {
                data.push({number: (numItemsToGen - 1) - i});
                expected.push({number: i })
            }

            sort(data, 'number');

            expect(data).toEqual(expected);
        });

        //TODO get better data for strings
        it('should sort by strings in data object array', () => {
            let data = [
                {
                    _string: "zb"
                },

                {
                    _string: "za"
                },

                {
                    _string: "bg"
                },

                {
                    _string: "a"
                }
            ];


            let expected = [
                {
                    _string: "a"
                },

                {
                    _string: "bg"
                },

                {
                    _string: "za"
                },

                {
                    _string: "zb"
                }
            ];

            sort(data, '_string');

            expect(data).toEqual(expected);
        });

        it('should throw error if trying to sort on an unsupported type', () => {
            let data = [
                {
                    _array: [],

                },
                {
                    _array: []

                }
            ];

            expect(() => {
                sort(data, '_array')
            }).toThrow(/This function doesn't support sorting this type of data/);
        });

    })

});

