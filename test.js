function moveTheArrayByDistanceIndistanceD(arr, p, d) {
  // corenet cases for length =1

  if (arr.length == 1) {
    return arr;
  }

  // to get the direct right or left;

  let sing = 0;

  // if d=0 right postive direction

  if (d == 0) {
    sign = +1;
  }

  // if d=1 negative direction
  else {
    sign = -1;
  }

  //to hold the iteration of the arr.length

  let count = 0;

  //the start index of the new array is d difstance right or left from the current index;

  //universal for + and -;

  let startIndex = 0 + sign * p;

  //corner case if the index is greater than length;

  if (startIndex >= arr.length) {
    startIndex = startIndex % arr.length;
  }

  //if the index is less than 0
  else if (startIndex < 0) {
    startIndex = arr.length - (startIndex % arr.length);
  }

  //we got the start index for positon of the roated array placing the elements in + = direction

  let arrayAns = new Array(arr.length);

  while (count < arr.length) {
    //corenr cases

    if (startIndex == -1) {
      startIndex = arr.length - 1;
    } else if (startIndex == arr.length) {
      startIndex = 0;
    }
    arrayAns[startIndex] = arr[count];
    startIndex = startIndex + sign * 1;
    count++;
  }

  return arrayAns;
}

//the test cases
// [1, 2 , 3] d =4 and p=0 or 1
// [1]
[];

//time complexicty  O(n);
//space complexicty O(n)
