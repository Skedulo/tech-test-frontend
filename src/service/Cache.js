import { DataService } from "./DataService";

// globally caching jobs and contacts data to avoid making request to server again and again
let jobsCache,
  contactsCache = [];

const cacheData = async () => {
  try {
    jobsCache = await DataService.getJobs();
    contactsCache = await DataService.getContacts();
    // add attribute "contactName" to each job (to match displayed data format in q1)
    jobsCache.forEach((job) => {
      job.contactName = contactsCache[job.contactId]
        ? contactsCache[job.contactId].name
        : "";
    });
  } catch (e) {
    alert("failed to fetch jobs or contacts from axois client");
  }
};

cacheData();

export { jobsCache, contactsCache };
