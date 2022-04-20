let apiCalls = {
fetchOne(param) {
    return fetch(`http://localhost:3001/api/v1/${param}`)
      .then((response) => response.json())
      .catch((error) => displayError(error));
  },

fetchAllApiData() {
    return[this.fetchOne("customers"),this.fetchOne("rooms"), this.fetchOne("bookings")];
  },

// fetchAll() {
//
// },
//
// fetchOnly() {}
//
//
// };
};
export default apiCalls;
