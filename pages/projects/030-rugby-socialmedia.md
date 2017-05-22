---
title: Rugby Social Media
tagline: In which our hero plays with all the toys
type: Opensource
platform: Web, Mobile Web
status: released
technologies:
  - React
  - Redux
  - GraphQL
  - MongoDB
  - Meteor
  - Digital Cloud hosting

header_image_small: url(./assets/projects/ReactLogo.png)
header_image_big: url(./assets/projects/ReactLogo.png)
header_background_color: '#23201C'
header_background_size: contain

---


-------


I moved off of the Google Cloud Platform for the rugby social media development work, simply because I had been using __GWT__ for the front end development and it had been back-burnered by Google a few years prior. GWT is a cool cross-compiler that converts Java code into Javascript, creating optimized bundles with support for code-splitting, per-browser optimization and other nifty features. It was nice to have a single code base that generated front and back ends. I grew a little weary of irritating things like how much Java code one had to write to create a simple anonymous function, which is a large amount of what jquery-esque client-side code is.


In the market for a new client-side tech stack, it seemed like Angular (which I've worked with a bit) and Ember were also yesterday's news so I ran with __React__ and __Redux__. At first I didn't want to venture too far from the shade of the spreading branches of the Google tree and did a bunch of prototyping with __Firebase__, Google's "serverless" app development platform that fronts __MongoDB__. I jumped in on a few open source projects that were using Firebase with React/Redux and was pretty impressed but ended up scrapping it for a couple of reasons:
  - Firebase literally has no capability for writing server-side code, the idea being that you don't need it. You *can* write server-side code that interacts with Firebase, but it's really just another client. For a lot of applications, this is 100% A-OK and Firebase is a great platform that gives you turn-key identity and access management, out of the box Android, iOS and web clients and other cross-cutting capabilities. It made me nervous though.
  - The straw that broke the camel's back was how painful it was to configure security. There was a security simulator tool in the cloud console but even with that I spent hours looking at cryptic access violation messages with no good way to debug them - there's no server code to step into! Ultimately that is a real challenge for NoServer technologies like Firebase. Everybody is used to implementing security at their api endpoints, where you can easily map roles to realms (if you're an RBAC proponent) and leave the database just secured to the service accounts. Here you were implementing user-level security on database tables and fields with a powerful but complex hierarchy of rules. Even with __Jolt__, which eases the pain somewhat, it was not fun.


So I was back in the hunt for a new backend platform. I had looked at a open source team on Github called __Telescope__ before I started in on Firebase that had a nice Reddit clone. They were on the __Meteor__ stack, including Blaze for the front-end, which made me say "meh". Meteor is cool and all, but many of its seminal figures are abandoning it and I sort of felt like it had already jumped the shark. When I checked in on them again, after my Firebase detour, they had made a move away from Blaze to embrace React and Redux and renamed themselves __Nova__. I cloned it off of Github to play with and I immediately really liked it. You know that feeling you get when you start looking through a codebase and everything makes sense and, even if you don't understand where everything is, it has an obvious structure to it? That was what Nova had going on. So I start playing with it to learn a bit more, and seeing if I could adapt it to my vision of rugby social media.


To get all the rugby data out of our existing codebase, I needed to hit our REST api and push the data into the Redux store. Because they'd just changed over to React/Redux, nobody has added extensions for using redux-thunk to get REST data, they've just got the Meteor client code that thankfully had a hook so I could inject some middleware. I got to talking with the project owners and they fill me in on the fact that they are tired of Meteor and are moving to __GraphQL__ using the __Apollo__ stack (which is being created by the Meteor dev team). They have a lot of this working on their `devel` branch so I switch over to that and now they've got me hooked. We used Meteor for basically just user management and everything else went through the Apollo client to the MongoDB backend. Because Meteor obviously sits in front of a MongoDB instance, the upgrade path was not unreasonable for teams with Meteor applications to move to GraphQL. Oh, and they renamed their project again, this time to [VulcanJS](http://github.com/VulcanJS).


I really enjoyed working with the VulcanJS team. I had the most aggressive requirements in the community so ended up working on some interesting problems, including:
  - Some debugging in how Apollo implemented their redux middleware to track down a __Server-Side Rendering__ issue. I was very sick of the redux library error "Reducers may not dispatch actions" by the time I sorted it out.
  - Reorganizing the VulcanJS url schema to provide for prettier urls (e.g. (http://live.rugby.net/x/top-thirty-european-locks))
  - Changing the layout from one- to two-column to allow real estate for our rugby specific sidebar widgets
  - Re-work of category system to support social media feeds for teams, competitions and even players.
  - Development of number rugby-specific post types that allowed rugby data, ratings and games to be inserted directly into the social media feeds


We had some great integration with ESPN and embedded video but there just wasn't enough capital on hand to keep things moving forward. Again though, I learned a huge amount over the time I pushed this out.
