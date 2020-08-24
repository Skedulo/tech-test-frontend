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
  getActivities: () =>
    axiosClient
      .get("/activities")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      ),
  getResources: () =>
    axiosClient
      .get("/resources")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      ),
  getJobAllocations: () =>
    axiosClient
      .get("/jobAllocations")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      ),
  getActivityAllocations: () =>
    axiosClient
      .get("/activityAllocations")
      .then((result) =>
        result.data.map((x) => Object.assign({}, x, { id: x.id + "" }))
      ),
};
