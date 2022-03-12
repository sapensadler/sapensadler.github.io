---
title: "Containers"
date: 2022-03-12T12:44:25Z
draft: false
tags:
- containers
---
A container is software and dependencies packaged into a standardised format. It uses the Open Container Initiave (OCI) specifications, runtime-spec and image-spec. The image spec defines the format of the created container image. The runteime-spec defines how to execute the created image.

# Benefits and Drawbacks

Using containers allows you to simplify your infrastructure. Configure a host with an container runtime e.g. containerd and you can run your containers - there are no other dependencies to install, they all exist within the container. This is incredibly useful when running at scale.

Containers have all the dependencies included in the image you can easily run containers that rely on different library versions on the same host. However, if one of the dependencies had a security vulnerability raised against it, each container that uses it will need to be rebuilt rather than the dependency updated in a single place.

# Container Orchestration

To start a process on a host, you would usually start it with the hosts init system - this allows the process to start up on boot should the host restart. You run start containers in a similar fashion, using cli tools such as docker, ctr, podman etc. within the init system configuration files. This becomes harder to manage as things scale up. Container orchestration is a solution to manage the scheduling containers, providing advanced features such as load balancing and autoscaling. Kubernetes is a popular container orchestrator.

