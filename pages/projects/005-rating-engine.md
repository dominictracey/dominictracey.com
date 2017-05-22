---
title: Player Rating Engine
tagline: Cloud-based workflow for large-scale resilient data processing
type: Closedsource
platform: Microservices
status: released
technologies:
  - Java
  - Google App Engine, Datastore, Task Queues, Memcached, Logging
  - Mapreduce/Pipeline API
  - Google Cloud Endpoints
  - NodeJS/Express
  - ES6
  - PhantomJS
  - Winston
  - Docker/Google Compute Engine

header_image_small: url(./assets/projects/banner-lg.png)
header_image_big: url(./assets/projects/banner-lg.png)
header_background_color: '#23201C'
header_background_size: cover

---


-------

## Resilient Foundational Software


At the core of the data-driven rugby media suite was the cloud-based engine that acquired and consumed large amounts of data and created heuristic valuations that allowed apples-to-apples comparisons of players around the world. In the beginning, I did the process in spreadsheets to understand the actual rating mechanisms. While it was time-consuming, it allowed me to rapidly prototype meaningful outputs on a small scale. As tedious as this was, the processing was moved to into a microservices architecture once the problem space was understood. There were a few challenges:


  - I couldn't afford an enterprise-grade workflow engine like Tibco.
  - The data was collected from various sources and often contained mistakes requiring operator intervention.
  - Rugby was played around the clock, around the world.
  - While real-time processing wasn't strictly necessary, data needed to be processed and results presented in a timely manner.
  - The heuristic model used to create the ratings needed to be rapidly and painlessly adjustable.
  - Some of the ratings (e.g. "Best Player in the Last Year") looked across thousands of historical matches and hence processed millions of rugby events.
  - Most importantly, these workflows were big and hairy computationally and temporally so if there was a hiccup you couldn't just start the whole thing over.


The data collection software required PhantomJS and we couldn't run that in the trusty Google App Engine standard environment so we chose an architecture of a NodeJS/Express REST api serving up data collected from the PhantomJS instance wrapped with node-horseman. This involved a custom Docker image that ran nicely in the Google Compute Engine using their cloud build tooling.


With the data now accessible, the workflow could be mapped out and implemented. I used a kick-ass API available in GAE/Standard called the Pipeline API. Google never made much of a big deal out of it as their Dataflow product was on the horizon when I started working with it but it is very cool. It allows you to dynamically create asynchronous job trees. Because it uses the GAE Task Queues (like MQ Series or RabbitMQ) it was pretty bullet-proof, in that it allowed you to retry failed tasks.

<img src='assets/projects/match-state-flow.png' class='media-element center' style='padding-left:50px; padding-top:20px; padding-bottom: 20px; float: left; width:50%;' />


Keep in mind that there could be an in-game event coded incorrectly by the video analysts like "Ben Te'o replaced Owen Farrell at 58 minutes", when Ben Te'o was already be on the field. The system would kick these events out to an administrative console and send a notification to a human to investigate and rectify manually. Programmatically, this was a workflow job being put on hold with the result being a `PromisedValue` that was fulfilled by the administrative UI. As with most workflow implementations I've created or worked with, everything was abstracted such that the workflow was moved between **states** by **jobs** that executed when business **rules** were fulfilled. For example processing a single match looked something like the diagram to the left.


Once the data had been onboarded correctly, player rating could commence and there were a variety of flavors created, each appealing to different groups of fans. The actual algorithm was subject of much debate on various on-line forums and we published it [here](http://www.rugby.net/s/wd0q3wVpzPo#Content:contentId=5171798064758784) if you are interested in the details. A couple of notable design items were:

  - The abstraction of the rating schema, so we could adjust the player ratings based on feedback from fans.
  - The creation of "time series" ratings, which were rolling ratings updated weekly that made the site far stickier and allowed us to make some neat visualizations. Click the *Return to other Projects* button below and check out the Data Visualization project next.

   
