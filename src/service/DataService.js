import Axios from "axios";

const axiosClient = Axios.create({
  baseURL: "http://localhost:3400",
});

export const DataService = {
  getJobs: () => {
    return axiosClient
      .get("/jobs")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      );
  },
  searchJobsByName: async function (searchTerm) {
    const jobList = await this.getJobs();
    return jobList.filter((x) =>
      x.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
  },
};
