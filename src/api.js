export default class RatingApi {
   constructor() {
      this.url = "http://localhost:5000";
   }

   getEntries() {
      return fetch(this.url + "/profs")
	  .then(response => response.json());
   }

   addEntry(entry) {
      return fetch(this.url + "/profs", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(entry)
      });
   }

   updateEntry(entry) {
      let id = entry.id;
      entry.id = undefined;

      return fetch(this.url + "/profs/" + id, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(entry)
      });
   }

   deleteEntry(id) {
      return fetch(this.url + "/profs/" + id, {
         method: 'DELETE'
      });
   }
}