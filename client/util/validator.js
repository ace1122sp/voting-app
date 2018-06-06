export const validator = (function() {
  const _getArrayOfTrimmedWords = str => str.split(' ').filter(word => word.length > 0)
  return {
    trimEverything(str) {
      return _getArrayOfTrimmedWords(str).join(' ');
    },

    isUnique(element, arr) {
      return !(arr.some(el => el == element));
    },

    isValidPool(name, options) {
      return options.length > 1 && name.length > 2;
    },

    createId(name, length) {
      const nameForId = _getArrayOfTrimmedWords(name).join('');
      return JSON.stringify(length) + nameForId;
    }
  }
})();
