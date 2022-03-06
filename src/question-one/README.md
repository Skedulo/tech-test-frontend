## Question 1 response

I originally wanted to demonstrate having components and hooks that had single responsibility, by separating out multiple concerns:

* Handling the GraphQL query response, error messaging and loading state
* Having more logic specific to search results

Both are very common scenarios, so in the real world, it would be sensible to separate these out.

I thought I would lean on the side of over-engineering, rather than the other way around, for the sake of considering "future maintainability".
But then I ran out of time.  In hindsight, it's probably better to have one thing definitely working (search-specific functionality), rather than
trying to get more generic query logic handled as well, but not working as well as it should.

Because the logic for handling the query itself outside of search results isn't being used, I wouldn't be confident 
that it actually works, but at least it can be iterated on.  It could actually be applied to question 2.

This repo is really old so I upgraded the versions of React, React Testing Library and React Scripts because it was missing some expected functionality.

I made a minor change on the package.json removing the string around the "exec", because I had issues running it on my Windows machine.

yarn dev:api
Before: 
nodemon --exec 'babel-node index.js'

After:
nodemon --exec babel-node index.js

Compromises:
* There are still some "any" Typescript types
* Ran out of time writing tests for useQuery and useSearchQuery.  If I were to rewrite it, I'd update useQuery to use a library such as react-query.
* useQuery is still not generic enough for loading queries
  * Currently it exposes a function "fetchData" that can be called as an event, such as onInputChange.
  * Ideally, "fetchData" should pass in an object which are the query variables (filters) coming from GraphQL to make it more generic and able to handle more filters
  * fetchData is still expecting an array to be returned, when it could be an object as well
  * More development needs to be done for queries that render on the page to just handle it automatically rather than putting it in useEffect in Question 2 and 3
  * Displaying a query needs to be wrapped in a React error boundary to handle errors.
* It's really hard to write plain CSS with the specificity I'd prefer.  I'd like them to be encapsulated around a className in that container, to avoid being able to reference it other components, but that's a lot of extra typing using CSS.
* Once I got to Question 3, I started to write BEM style CSS classes like on App.css for consistency
* I didn't get around to adding a debounce on the search query to avoid too many API requests if someone types quickly


