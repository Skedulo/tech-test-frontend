## Question 1

For this question we want you to setup a page with a text field that we can use to get a list of jobs that having matching names.

So first we need a input box that will be a live search field.  Typing anything into this field will begin the fetch of data from the server.  However, it should not fetch any records until at least 3 characters have been entered.  Clearing this field should clear the list of results.

We also need a loading indicator that will show up while the app is fetching results from the server.

And finally when the results are displayed we will need to see:

- The job’s name
- The start and end date of the job
- The name of the Contact assigned to the job

Note: We have provided a `service` prop to the component that is defined in /src/service/DataService.js.  It has access to a graphql client and a http request library.  If you wish to fetch data from the server we suggest you do it from there.