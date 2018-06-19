export const validator = (function() {
  const _getArrayOfTrimmedWords = str => str.split(' ').filter(word => word.length > 0);
  const _removeSpaces = str => _getArrayOfTrimmedWords(str).join('');

  return {
    trimEverything: str => _getArrayOfTrimmedWords(str).join(' '),

    isUnique: (element, arr) => !(arr.some(el => el == element)),

    isValidPool: (name, options) => options.length > 1 && name.length > 2,

    createId: (name, length) => JSON.stringify(length) + _removeSpaces(name),

    removeSpaces: str => _removeSpaces(str),

    generateId: (poolName, username) => {
      const clearedName = _removeSpaces(poolName);
      const timestamp = Date.now();
      const randomString = JSON.stringify(Math.round(timestamp * Math.random()));
      const pieceOfTimestamp = JSON.stringify(timestamp).slice(6);
      
      return clearedName + username + randomString + pieceOfTimestamp;
    }
  }
})();
