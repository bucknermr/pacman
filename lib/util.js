export const deleteFromArray = (arr, el) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === el) { arr.splice(i, 1); }
  }
};
