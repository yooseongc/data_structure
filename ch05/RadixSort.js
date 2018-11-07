
var Queue = require('./Queue');

/**
 * 5.4 Radix Sort
 * 
 * 나름 빠르고 단순하며 강력하지만
 * 많은 메모리가 필요하며, 실수 같은 자료형은
 * 정렬하기 힘들다는 단점도 있다.
 * 
 * 복잡도는 d자리 수 일 때 O(d*n)
 * 
 * ref : https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%88%98_%EC%A0%95%EB%A0%AC
 * 
 */

 /**
  * [min, max) 사이의 크기가 n개인 0 이상의 정수 배열을 생성
  * 
  * @param min: minimum int value 
  * @param max: maximum int value 
  * @param {*} n: length of array
  * @returns Uint32Array 
  */
function createRandIntArray(min, max, n) {
    var arr = new Uint32Array(n);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(min + Math.random() * (max - min));
    }
    return arr;
}

/**
 * 기수정렬을 해 보자.
 * @param {*} arr: 기수정렬을 할 배열
 * @param maxDigit: 가장 높은 자릿수 
 * @returns: javascript Array
 */
function radixSort(arr, maxDigit) {
    // initialization
    var bins = [];
    for (var i = 0; i < 10; i++) {
        bins.push(new Queue('l', arr.length));
    }

    function sort(arr, bins, maxDigit) {
        var digit = 1;
        while (digit <= maxDigit) {
            for (var i = 0; i < arr.length; i++) {
                bins[ Math.floor(arr[i] / Math.pow(10, digit-1))%10 ].enqueue(arr[i]);
            }
            arr = collect(bins);
            //console.log(digit, arr);
            digit++;
        }
        return arr;
    }

    function collect(bins) {
        var newArr = [];
        bins.reduce((newArr, currBin) => {
            while (!currBin.isEmpty()) {
                newArr.push(currBin.dequeue());
            }
            return newArr;
        }, newArr);
        return newArr;
    }

    return sort(arr, bins, maxDigit);
}

var arr = createRandIntArray(0, 9999, 10);
console.log('before : ', arr);
var res = radixSort(arr, 4);
console.log('after : ', res);






