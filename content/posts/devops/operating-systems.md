---
title: "Operating Systems and Hardware Architecture"
date: 2022-02-12T15:00:23Z
draft: false
tags:
- operating-systems
- hardware-architecture
---
Operating systems are being abstracted away from the problem. With the popularisation of serverless and container orchestration tools, the underlying operating system has less impact as containers will run on any operating system and with serverless code, you can't even see the operating system. However, you should still learn the basics. Serverless is great for startups, but as you scale it becomes prohibitively expensive and you will eventually have to move away. With container orchestration e.g. Kubernetes, you still have your worker nodes to manage.

# Hardware Architecture

Operating systems abstracts away the hardware. This hardware can vary greatly in both computational power, price, and design; fundamentally, the hardware has the same building blocks and principles. The modern computer consists of:
* The CPU aka 'the brain' which executes instructions and performs computation
* Memory - short term data storage
* Disk - Long term data storage
* Peripherals - GPU's, network cards etc. These extend the computers basic ability e.g. allowing it to communicate over a network

## CPU and the Fetch Execute Cycle

A program consists of a list of instructions. The fetch execute cycle decodes the instruction, performs the corresponding action, then reads the next instruction:

1. Software (an executable program that the CPU can understand) is written and stored
2. The computer starts and the data is loaded from disk into RAM by EFI or BIOS
3. The CPU fetches the next instruction
4. The CPU decodes the instruction and executes the desired action
5. Repeat steps 3 and 4 until there are no more instructions or hardware is powered off

## Memory, Registers, and Caches
The CPU cannot directly interact with disks, the data must first be loaded into RAM. Registers are built into the CPU and can store a small amount of data that can be accessed quickly by the CPU. Memory is a data store much larger in size but much slower. A cache is used to speed up memory access by storing frequently accessed data. The cache is built in to the CPU, and is faster than memory, but slower than registers. The caches can also have layers with layer 1 being the first, fastest and smallest cache layer, with layers 2,3 etc. gradually increasing in size but decreasing in access times.

## Disks and Other Peripherals

Disks and other peripherals such as network cards and GPU's also form part of the hardware and communicate with the CPU in a more complex way such as memory mapped I/O or Direct memory access.

# What is an operating system?

An operating system is a piece of software that abstracts away the hardware and allows the execution other software. It does this by sharing the hardware resources between the running softwares.

## Processes and Threads
A process is a piece of running software. The operating system allocates dedicated resources to a process e.g. memory. A thread exists within a process, shares resources with the parent process, but will have it's own instructions to execute. A thread is faster to create than a process as is shares resources and fewer new resources need to be created. Both threads and processes can be used to create concurrency.

Concurrency and parallelism are realated concepts but are not the same. Concurrency allows multiple threads to run. Parallelism allows multiple threads to run at the same time. With a single core CPU concurrency can occur by the kernel context switching between threads/processes giving each time to perform their own instructions. On multi-core threads/processes can run at the same time on each core giving us parallelism. With a single core we cannot get parallelism.

## Locking - Mutexes and Semaphores
Parallelism allows computation to be be sped up by doing multiple things at once, but causes its own set of problems. If two processes write to the same memory address at the same time what happens? This is where mutexes, locks and semaphores come in.

A mutex/lock is a method of protecting a resource. A single thread/process can obtain the mutex at any time. If each thread/process tries to obtain the mutex before accessing a shared resources, it enforces only a single thread can access the data at a point in time. Any other thread/process attempting to access will wait until the mutex is released. A semaphore is similar to a mutex in that it allows a number `n` of threads/process to obtain it, but no more. If thread `n-1` tries to obtain the semaphore it will succeed. If thread `n+1` tries, it will block until another thread releases it.

Although mutexes and semaphores protect resources they can cause deadlocks e.g. thread 1 waiting on thread 2 waiting on thread 1.

There are also read and write locks. All readers are allowed concurrent access except when a write is occurring. When a writer must get access to the resource mutual exclusive access must occur to prevent data corruption.

## Disks and Networking
Operating systems also deal with processing data from both disk and other computers. These are often bottlenecks in our software and understanding how these work at a low level can also help improve performance.

# Learn your operating system and learn it well
An operating system is extremely complex. There are some general ideas that stay the same, such as those mentioned above. However, each OS will have its own idiosyncrasies. Learning your operating system of choice and it's best practices will help in the long run.

## AWS outage
The [AWS kinesis outage](https://aws.amazon.com/message/11201/) was caused by the number of running threads exceeding the OS limit. This is an interesting post mortem and shows how operating systems do still matter and are incredibly important.

# Summary
Although the operating system hides the detail away from you, understanding how a computer works under the hood and what your code is doing at an instruction level is a valuable skill to have. Try some assembly and see for yourself. It can come in handy when you least expect it, particularly when profiling code to find bugs and improve performance. Most programs are not single threaded and will have an element of concurrency to them - understanding these basics will help you write safe concurrent code and allow you to debug intermittent concurrency bugs.

These fundamentals have stayed the same for decades and will last for many more. Having this fundamental understanding of how computers work will put you in good stead for debugging advanced problems and help you become a better engineer.

