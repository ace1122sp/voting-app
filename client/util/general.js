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
          allObjects[obj._id] = { _id: obj._id, name: obj.name }
        });
      });

      for (let obj in allObjects) {
        uniqueResults.push(allObjects[obj]);
      }

      return uniqueResults;
    },

    roundString: (str, maxLength) => {
      const currentLength = str.length;
      let validString = str;
       
      if (currentLength > maxLength) validString = validString.substr(0, maxLength - 2) + '...';
 
      return validString;
    },
    
    getRandomColor: () => {
      const randomPercentage = () => 30 + Math.floor(Math.random() * 70);

      const h = Math.floor(Math.random() * 360);
      const l = randomPercentage();

      return `hsl(${h}, 50%, ${l}%)`;
    },

    formatMongooseDate: date => date.substring(0, 10)
  }
})();