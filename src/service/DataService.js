import Axios from "axios";
import { cacheData } from "./Cache";

const axiosClient = Axios.create({
  baseURL: "http://localhost:3400",
});

let jobsCache,
  contactsCache = [];

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
    const searchResult = jobsCache.filter((x) =>
      x.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
    return searchResult;
  },
};

// globally caching jobs and contacts data to avoid making request to server again and again
cacheData().then((res) => {
  jobsCache = res.jobsCache;
});
