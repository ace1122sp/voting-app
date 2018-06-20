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

    getPropsInArray: obj => {
      const props = [];
      for (let key in obj) {
        let prop = obj[key];
        props.push(prop);
      }

      return props;
    },

    getTotalVotes: obj => {
      let totalVotes = 0;
      for (let key in obj) {
        totalVotes += obj[key].votes;
      }

      return totalVotes;
    },

    getUniqueObjectsArray: (...args) => {
      const allObjects = {};
      const uniqueResults = [];

      args.forEach(arg => {
        arg.forEach(obj => {
          allObjects[obj.id] = { id: obj.id, name: obj.name }
        });
      });

      for (let obj in allObjects) {
        uniqueResults.push(allObjects[obj]);
      }

      return uniqueResults;
   }
  }
})();
