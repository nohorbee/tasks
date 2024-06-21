# Task API (for every.io coding challenge)

## Description

The application follows these specs: [https://github.com/every-io/engineering-interivew-be](https://github.com/every-io/engineering-interivew-be) (I'll try to clarify any assumption on my end)

### Code factors

1. Readability: I think it's fairly straightforward. Although, I implemented "clean architecture"-ish which might be overkill for this small project. The goal was just to organize code in a decoupled way to illustrate the point.

2. Scalability: Without further context, scalability is not measurable. For instance, if we assumed that we will be constantly reading tasks and eventually reading (which is a fair assumption), we could cache these. Or, for instance, if we assumed that "Archived" tasks will be accessed less frequently, we could remove these from the cache.

**NOTE**: Already using REDIS for opaque authentication. This will be explained below.

3. Bugs: I tested for some corner cases but not exahustively (TBH)

### Requirements

It's complete. I created 3 endpoints:

- Create Task: Associated to the logged user.
- Retrieve Tasks: Associated to the logged user.
- Update Task: Title, Description, and Status can be modified (using json-patch standard)

### Ideal

- Typescript ✅
- Dockerized ✅
- Tests 🚧: I have implemented a few tests for the controller (it was mainly because I ran out of time)

### Extra credit

- Logging 🚧: There is some logging (actually, it's using winston so it can easily be plugged with major cloud vendors)
- Apollo: I went for REST. Even though I played with GraphQL before, I wasn't confident enough for this ocasion. I'll learn more about it.

## Authentication

I didn't want to tie this to any particular IDP, neither code one myself. I coded an opaque authentication mechanism in which, once logged in, the user session is present in redis. (This is easily plugable with any IDP that uses tokens for sessions)
I am seeding 2 sessions when the app starts.

- Token: `asecretokenforuser0` has permissions to Create a Task, View their own Tasks, Update a Task.
- Token: `asecretokenforuser1` only has permissions to Create a Task

This way you can create tasks for both and check that the first user don't see second's tasks.

## Running the app

The application has 2 Docker files.

- Dockerfile: Used for building and running (as if it is production).
- Dockerfile.dev: Referenced via docker-compose.

I also INTENTIONALLY left a .env.dev with some config values. SoL

1. `cp .env.dev .env`
2. `docker compose up --build` (will run mongodb, redis, and app containers). If you want to only see the app logs, you can go:

```
docker compose up redis -d &&
docker compose up mongodb -d &&
docker compose up task --build
```

3. You can use any HTTP client you want. I included an OpenAPI console with interactive documentation at: [http://localhost:8080/api-docs](http://localhost:8080/api-docs). Click "Authorize", and complete with any of the provided tokens.
