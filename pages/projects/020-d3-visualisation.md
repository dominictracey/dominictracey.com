---
title: Data Visualization
tagline: Using D3.js to win friends and influence people
type: Closedsource
platform: Web
status: released
technologies:
  - D3.js
  - Google Cloud Endpoints

header_image_small: url(./assets/projects/graph.png)
header_image_big: url(./assets/projects/graph.png)
header_background_color: '#222222'
header_background_size: cover

---

-------

TODO: extract a sample JSON dataset and embed the actual control here. See screenshot above.


At any rate, when we added some structure to player ratings week-over-week through the implementation of Rating Series, we were then positioned to plot how those players had fared over the course of the past twelve months. The __D3.js__ work was really fun and integrates nicely with a REST server so I stood up a Google Endpoints api to expose the needed data. Since our __Google App Engine__ server was running Java, I used __Jersey__ to serialize the POJOs into JSON.


Honestly the most time consuming part of this was optimizing and caching all the data so that the load time was acceptable (<2s). I created some post-processed data structures that stripped down just the properties necessary and were optimized from a de-duplication perspective. We cached these objects in memcached as part of the broader ORM strategy and then cached the JSON in memory on the servlet instances as they spun up and handled the first request.


There are some real limitations with REST apis that I struggled with in this project and I was excited to be able to work with __GraphQL__ in the next project. It allows for much more flexible and efficient request patterns and integrates really well with client side state stores. Click the "Return to other projects" button to read about Rugby Social Media.
