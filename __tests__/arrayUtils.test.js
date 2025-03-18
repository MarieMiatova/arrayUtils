import fc from "fast-check";
import { removeDuplicates, sortNumbers, sumPositiveNumbers, groupByParity, findCommonElements }  from "../src/arrayUtils.js";

describe('Array Utilities Tests', () => {
  
  test('removeDuplicates should return an array without duplicates', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat()), 
        fc.array(fc.string()), 
        (numbers, strings) => {
          expect(removeDuplicates(numbers)).toStrictEqual([...new Set(numbers)]);
          expect(removeDuplicates(strings)).toStrictEqual([...new Set(strings)]);
        }
      )
    );

    const emptyArray = [];
    expect(removeDuplicates(emptyArray)).not.toBe(emptyArray);
  });

  test('sortNumbers should return a sorted array', () => {
    const sort = (array) => [...array].sort((a, b) => a - b);

    fc.assert(
      fc.property(fc.array(fc.nat()), (numbers) => {
        expect(sortNumbers(numbers)).toStrictEqual(sort(numbers));
      })
    );

    const emptyArray = [];
    expect(sortNumbers(emptyArray)).not.toBe(emptyArray);
  });

  test('sumPositiveNumbers should calculate the sum of positive numbers in an array', () => {
    const calculateSum = (array) => array.filter((n) => n > 0).reduce((total, n) => total + n, 0);

    fc.assert(
      fc.property(fc.array(fc.nat()), (numbers) => {
        expect(sumPositiveNumbers(numbers)).toEqual(calculateSum(numbers));
      })
    );
  });

  test('groupByParity should separate numbers into even and odd groups', () => {
    const categorize = (array) => array.reduce((accumulator, n) => {
      const key = n % 2 === 0 ? 'even' : 'odd';
      accumulator[key].push(n);
      return accumulator;
    }, { even: [], odd: [] });

    fc.assert(
      fc.property(fc.array(fc.nat()), (numbers) => {
        expect(groupByParity(numbers)).toEqual(categorize(numbers));
      })
    );
  });

  test('findCommonElements should identify common elements between two arrays', () => {
    const getCommonElements = (arr1, arr2) => {
      const elementsSet = new Set(arr2);
      return arr1.filter(item => elementsSet.has(item));
    };

    fc.assert(
      fc.property(
        fc.array(fc.nat()),
        fc.array(fc.nat()),
        fc.array(fc.string()),
        fc.array(fc.string()),
        (nums1, nums2, strs1, strs2) => {
          expect(findCommonElements(nums1, nums2)).toEqual(getCommonElements(nums1, nums2));
          expect(findCommonElements(strs1, strs2)).toEqual(getCommonElements(strs1, strs2));
        }
      )
    );

    const emptyArray1 = [];
    const emptyArray2 = [];
    expect(findCommonElements(emptyArray1, emptyArray2)).not.toBe(emptyArray1);
    expect(findCommonElements(emptyArray1, emptyArray2)).not.toBe(emptyArray2);
  });
});