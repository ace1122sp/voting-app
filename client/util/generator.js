export const generator = (function() {
  return {
    generateId(poolName, username, timestamp) {
      const timestampNumber = parseInt(timestamp);
      const randomString = JSON.stringify(Math.round(Math.round(timestampNumber * Math.random())));
      const pieceOfTimestamp = JSON.stringify(timestampNumber).slice(6);
      return poolName + username + randomString + pieceOfTimestamp;
    },

    generateLocalId(name) {
      const timestamp = JSON.stringify(Date.now());
      return name + timestamp;
    }
  }
})();
