import Axios from "axios";

const axiosClient = Axios.create({
  baseURL: "http://localhost:3400",
});

export const DataService = {
  getJobs: () =>
    axiosClient
      .get("/jobs")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      ),
  getContacts: () =>
    axiosClient
      .get("/contacts")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      ),
  searchJobsByName: function (searchTerm) {
    return this.getJobs().then((result) =>
      result.filter((x, index) => {
        result[index].contactName =
          contactsCaching[result[index].contactId].name;
        return x.name.toUpperCase().includes(searchTerm.toUpperCase());
      })
    );
  },
  // searchJobsByName: (searchTerm) =>
  //   axiosClient
  //     .get("/jobs")
  //     .then((result) =>
  //       result.data
  //         .map((x) => Object.assign({}, x, { id: x.id + "" }))
  //         .filter((x) =>
  //           x.name.toUpperCase().includes(searchTerm.toUpperCase())
  //         )
  //     ),
};

//global caching
let contactsCaching;
DataService.getContacts().then((res) => {
  contactsCaching = res;
});
