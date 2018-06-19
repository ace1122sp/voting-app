export const general = (() => {
  return {

    // takes an object and return its objects' usernames in an array
    getUsernamesInArray: obj => {
      const usernames = [];
      for (let key in obj) {
        let username = obj[key].username;
        usernames.push(username);
      }

      return usernames;
    },

    getArrOfOptions: obj => {
      const options = [];
      for (let key in obj) {
        let option = obj[key];
        options.push(option);
      }

      return options;
    },

    getTotalVotes: obj => {
      let totalVotes = 0;
      for (let key in obj) {
        totalVotes += obj[key].votes;
      }

      return totalVotes;
    }
  }
})();
