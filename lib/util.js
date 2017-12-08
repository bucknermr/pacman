export const equalArrays = function(arr1, arr2) {
  if (arr1.length !== arr2.length) { return false; }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) { return false; }
  }
  return true;
};

export const deleteFromArray = (arr, el) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === el) { arr.splice(i, 1); }
  }
};
