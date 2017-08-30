---
title: Mobile Development
tagline: Getting a cool react-native app in the app stores
type: Opensource
platform: Mobile
status: released
technologies:
  - React Native
  - Redux

header_image_small: url(./assets/projects/playstore-icon-feature.png)
header_image_big: url(./assets/projects/playstore-icon-feature.png)
header_background_color: '#23201C'
header_background_size: contain

---


-------


I have always wanted to round out my skillset with mobile development but haven't had the opportunity to do so.
Having worked with the React ecosystem for a while I challenged myself to get a useful application in the Android
Play Store and Apple App Store. My objectives were:
  - To dig into the react-native ecosystem and development paradigm in a meaningful way.
  - To contrast web and mobile development paradigms.
  - To understand the Android Studio and XCode development environments, including debugging, project configuration, deployment packaging, etc.
  - To go through the store placement processes, version management, promotion, rating and target platform configuration.

Without a huge amount of personal bandwidth, I also wanted to make this all happen as quickly as possible, without sacrificing
the goal of having a comprehensive experience. For the application, I chose to solve a personal pain point related to training for
rock climbing using a __hangboard__. Hangboards are molded plastic constructs that allow climbers to develop finger strength over time by
hanging by their fingertips from different grips within a tightly constrained exercise regimen. You choose a series of "grips" to work on and,
using an interval timer, alternate hanging for 7 seconds and recovering for 3 seconds. The idea is to
keep the connective tissue in your fingers close to maximum fatigue for a period of time. To allow a climber to complete these exercises on different grips, weight
must be either added or removed from the climber's body weight. While there are lots of generic interval timers out there that climbers use,
the record-keeping around the grips and weight adjustments needed have always been paper-based (or, in my case, I have a Google Sheet on my phone that
I used). This app combines all of these requirements. It wasn't terribly complex business requirements, but they were non-trivial.

I poked around at different starter kits for React Native and landed on [Pepperoni App Kit](https://github.com/futurice/pepperoni-app-kit) as
it had some features I liked (redux) and leveraged some things I wanted to assimilate (immutable.js).

One aspect that also really intrigued me was it's use of [redux-loop](https://github.com/redux-loop/redux-loop), a "port of Elm's effect system to Redux".
A main tenet of redux is that reducers are pure functions (output calculated from input and __no sideeffects__). I've found myself in situations where I've wanted to
trigger another action from within a reducer but you can't create side effects ("reducers can't dispatch actions"). [Saga](https://github.com/redux-saga/redux-saga), redux-loop and other libraries allow you to walk this line, but I haven't had a chance to play with them yet. The debugging/testing support for redux-loop was a bit
rough, but I found the code constructs it [enabled in reducers](https://github.com/dominictracey/hangboard/blob/master/src/modules/workout/WorkoutState.js#L789)
to be powerful.

The objective of working with React Native is that you just write ES6 code (which I develop mainly with Atom) and the RN bridge works with the
mobile device OS's javascript engine to create a truly native experience. This is unlike PhoneGap/Cordova where you are writing for the web and wrapping
it with a mobile container. There's no <div> elements in your render() methods. There's no CSS (yay!). You end up with actual Android and iOS projects within your React
Native project that allow you to "drop down" to leverage platform-specific capabilities. I didn't need to get too far from the centerline of the
technology corridor so didn't need to do much of this, but you find yourself using XCode and Android Studio a bit for working with the emulators and the packaging/deployment phases.

[Jest](https://facebook.github.io/jest/docs/en/tutorial-react.html) is really awesome for the quasi-TDD process I've come to prefer for react-redux apps. Because redux reducers are
so deterministic, it is a great way to put together a really solid implementation of your business rules backed by a comprehensive test suite.
I didn't configure Jest to use redux-loop, which made the test cases a little more verbose. Enzyme is a bit more of a dodgy proposition in
React Native at the time of this writing so I didn't end up going there. In reality, the complexity of the project was mostly within the reducers rather than the views so this was something of a non-issue.

[Immutable.js](https://facebook.github.io/immutable-js/docs/#/) took a little getting used to, but I certainly see the value of it. I needed
the application state to persist between sessions (one of the Hangboard application's main attractions is that it remembers all of your grips and weights), so a big part of
the problem space was figuring out what the state looked like, how it was mutated over time, and how we could persist it in a platform-agnostic manner.
The state tree was implemented with Immutable [Maps](https://facebook.github.io/immutable-js/docs/#/Map) and it was constantly persisted with RN's
[AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html), which abstracts away the host OS persistence capabilities. The state tree
grew in complexity as I went and early on I found I needed to have my selectors as [constants](https://github.com/dominictracey/hangboard/blob/master/src/utils/constants.js#L91)
to maintain my sanity. The jury is still out for me on the state snapshotting as a performant solution. I believe I need to break out the homegrown snapshotting that the app kit nudged me into such
that the monolithic state tree is decomposed and partially persisted in an intelligent manner. In general, Immutable was powerful and feature complete for
what I needed to do. Things like [Map.mergeDeepWith](https://facebook.github.io/immutable-js/docs/#/Map/mergeDeepWith) provided a nice analog to [lodash's equivalent _.mergeWith](https://lodash.com/docs/#mergeWith).

I wanted to sketch in the big picture early, and spent some time figuring out how to get to the stated goal of having an app in the App Store (iOS) and
Play Store (android). React Native creates an iOS and Android project for you but getting their contents out onto a friend's smart phone was a non-trivial process.
There are tools to streamline this, but I just went through it by hand to understand it better. Apple definitely has tighter controls around the App Store,
but I appreciated the TestFlight feature. My non-technical climbing friends who were testing for me had iPhones and they were able to get alpha and beta builds
onto their devices easily. The Play Store was easier to get into but the initial APKs I put up didn't work for other tester friends. The crash reports from their
phones reported through the console weren't particularly helpful and it took me a bit of sleuthing locally to figure out there were some package naming issues
that I needed to fix in Android Studio.

I used [Github](https://github.com/dominictracey/hangboard) to track some [issues](https://github.com/dominictracey/hangboard/issues?q=is%3Aissue+is%3Aclosed) a friend
had identified as she used the app for her workout and worked out a versioning strategy to automatically align the [npm/package.json](https://github.com/dominictracey/hangboard/blob/master/package.json#L18) with the build numbers embedded into the App/Play Store packages which should reduce maintenance headscratching. I banged up a "marketing" site at [hangboard.dominictracey.com](http://hangboard.dominictracey.com) and that was about it.

As of this writing, I have some other things I'd like to explore with it if I have time:
  - Use Auth0 or something similar to allow users to sign on and store their state in the cloud.
  - Add definitions for more boards that users can install from cloud repository.
  - Embed the app within a web page using RN's WebView. (it should be embedded here!)
  - Allow users to craft and share their own custom workouts.
  - Explore the payment mechanisms. One idea was allowing coaches to manage clients' regimens through the app, with clients paying an annual fee.

That said, it was an interesting process. The React Native ecosystem is in a much more fluid state. Just in the month I worked on this, several of the technologies I leveraged had breaking API changes in their new versions. That said, I can't imagine maintaining separate Java/Kotlin and Objective-C/Swift codebases for a new mobile app project. Feel free to contact me to discuss more about developing mobile apps or enjoy the Hangboard app by using the links below!

<a href='https://play.google.com/store/apps/details?id=com.dominictracey.hangboard&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
