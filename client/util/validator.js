export const validator = (function() {
  const _getArrayOfTrimmedWords = str => str.split(' ').filter(word => word.length > 0);
  const _removeSpaces = str => _getArrayOfTrimmedWords(str).join('');
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
      const nameForId = _removeSpaces(name);
      return JSON.stringify(length) + nameForId;
    },

    removeSpaces(str) {
      return _removeSpaces(str);
    },

    generateId(poolName, username, timestamp) {
      const clearedName = _removeSpaces(poolName);
      const timestampNumber = parseInt(timestamp);
      const randomString = JSON.stringify(Math.round(Math.round(timestampNumber * Math.random())));
      const pieceOfTimestamp = JSON.stringify(timestampNumber).slice(6);
      return clearedName + username + randomString + pieceOfTimestamp;
    }
  }
})();
