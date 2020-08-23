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
};
