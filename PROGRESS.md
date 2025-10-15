# Interview prep progress log


## Day 1

- Setup dev envirnonment(Node.js, VScode, Git)
- Created GitHub repo for tracking progress
- Revised Typescript Basics(types, interfaces, functions)
- Watched "What the heck is the event loop anyway?" by Philip Roberts

### Key Learnings - Event Loop:
1. Don't block the event loop with sluggish and long-time taking operations like image processing or animation
2. The flow in the browser ecosystem is: call gets in the callstack, if its an webapi it gets moved in the web apis stack, if not it gets executed and removed from the callstack. When the webapi execution is finished the call it gets pushed in the Callback Queue. The event loop component its responsible for verifying continously if the call stack is empty and if so it moves the call from the callback queue in the call stack one by one.
3. There is also a render queue, above the callback queue. Eventloop first ask the render queue and then the callback queue
4. The JS ecosystem is indeed working synchronously and with the power of the browser/node ecosystem it can achieve concurrency
5. The difference between concurrency and parallelism: concurrency is working with multiple tasks and making progress by switching very fast between them while parallelism is the simultaneous execution of multiple tasks.