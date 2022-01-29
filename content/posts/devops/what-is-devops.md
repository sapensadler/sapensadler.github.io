---
title: "What is DevOps?"
date: 2022-01-22T14:35:25Z
tags:
- devops
draft: false
---
# The goal
Technology is at the heart modern civilisation. We want this technology to do 3 things:

1. Work correctly
2. Work reliably
3. *Quickly* adapt to changing needs 

# Software Development and Operations 

Traditionally these have been separate teams. Software developers write software, either creating new software or modifying existing software to change its behavior to meet a new need or fix a bug. Software Developers try to write software does all 3 of the above goals. But what happens to that software when the developer is finished making changes to the software? The handling of software once it's ready is where operations come in. Operations teams are responsible for deploying the software and, configuring and maintaining the backend systems required for the software to operate correctly. It is these backend systems - servers, networks, databases etc. - that operations engineers try to ensure do all 3 of the above goals. These teams generally work separately and do not communicate effectively. This has caused many issues. 

The main issue arising from this lack of communication is a long and slow feedback loop. The software is produced then handed over to operations. It is at this point the feedback cycle starts and continues until the software is deployed to production where users can give their feedback.

# DevOps
DevOps is a culture with the aim of breaking down these communication barriers and getting operations and developers communicating effectively and working together closely to shorten feedback loops getting code into production faster.

## Reducing feedback loops
Reducing feedback loops allows developers and operations to be confident that a software deployment will go smoothly - it will work correctly and have zero/low impact on availability/reliability. This allows engineers to experiment, adapt and innovate with reduced risk of bad deployments. There are many ways to reduce feedback loops and is an art in itself.

### Observability 
Observability is how engineers get feedback. Observability allows engineers to observe the state of a system, and allows engineers to identify if a system is working correctly and reliably. This is usually done via collecting metrics, logs and traces.

### Continuous Integration

Continuous integration is the practice of making small incremental changes regularly, publishing this code to source control, and running automated tests suites for each version. Getting feedback (the test results) quickly allows software engineers to identify mistakes that have been made and fix them, reducing the risk of bugs and improving correctness.

### Continuous Deployment
Continuous deployment is an extension of continuous integration. Once the tests have passed in the CI stage, the code is then automatically deployed to production. Deploying incremental changes regularly reduces risk of deployments. Good observability tooling will identify deployment issues quickly and allow for a rollback to occur. Being able to rollback within minutes instead of hours improves reliability.

## DevOps Implementations

DevOps has not been standardised and hence you will get multiple definitions from different source. It can be implemented in many ways. Each company and team will implement it slightly differently.

### The DevOps Engineer
It's becoming common for a single engineer to both write code, deploy it and manage the operating environment, combining both Software Engineering and Operations Engineering into a single role.

### Cross functional teams
Rather than having a two distinct teams, software and operations, have smaller teams (per service/application etc) that have both software engineering and operations expertise that work closely together and promote the devops culture.

### Site Reliability Engineering
[SRE](https://sre.google) is another implementation of devops that implements operations through the eyes of a software engineer.

