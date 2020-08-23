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
  searchJobsByName: function (searchTerm) {
    return this.getJobs().then((result) =>
      result.filter((x) =>
        x.name.toUpperCase().includes(searchTerm.toUpperCase())
      )
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
