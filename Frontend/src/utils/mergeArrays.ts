export const mergeArrays = (...args: any[][]) => {
  return [...args].reduce((arr, resultArray) => [...resultArray, arr], []);
};
