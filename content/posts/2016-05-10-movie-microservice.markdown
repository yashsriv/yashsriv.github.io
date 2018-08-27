+++
draft = false
date = 2016-05-10T15:38:27+05:30
title = "Day 8: Movie Microservice"
slug = "nyo-day8"
tags = [ "akka", "scala" ]
categories = [ "nyo" ]
aliases = [ "/2016/05/movie-microservice" ]
+++

  Today I finally had enough confidence with `akka-http` to try and understand the
akka-http-microservice [example](https://github.com/theiterators/akka-http-microservice).
I understood each and every line and why it was like it was and with that knowledge, I
got working on a movie microservice which would return movie info from imdb id.

  I finished it today, and the code can be found at
[my repo](https://github.com/yashsriv/akka-movie-microservice).
I intend to add another JSON query which takes movie name and returns movie info by tomorrow morning.
