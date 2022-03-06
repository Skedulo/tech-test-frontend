## Question 2 Response

I chose to fetch data by putting three different existing queries into the same GraphQL query.  This is a relatively clean
solution without hitting too many API calls, and without having to do promise chains.

I briefly thought to do a more complicated GraphQL structure, but I don't think there was any batch call mechanism to avoid
too many API calls, and also the data structure was quite tricky.

Compromises
* Not writing test for data mapper.  The syntax would have looked much nicer than in the test file, and it's easy and good to test pure functions.
* Could add a better mechanism for loading query in the future, and also show a spinner (but not really a priority in this task)
* In the data mapper, sorting of allocations wasn't added:
  * The function "_getMatchingResources" is a bit awkward because it passes in a generic allocations, but has behaviour that varies based on whether it is a Job type or Activity type.
  * I originally intended it to be more generic, but then noticed the differences in structure between the two.
