# web application performance

## day 1

### what is performance?
- speed
  - network
  - computation
- responsiveness
- memory utilization
- application size


### when do we have a performance problem?
  - what are indicators of problems?
    - (out of memory) errors
    - noticeable delay in the UI
    - bad user experience
    - your app becomes unreliable
    - your app costs a lot more than expected
- developers tend to over-"optimize"
- set goals -> know when to stop
- optimization is a tradeoff
  - you can't have optimal speed, memory, and size
  - you can't have optimal readability and performance
  - optimizing takes a lot of time
- how do we analyze performance?
  - measuring!
    - benchmarking
- 80/20 rule: You get 80% of performance benefits from 20% of optimization measures
  - rank the components in order of performance impact
- certain tasks are just hard
  - certain algorithms are hard
  - you can't change the platform

### sources of performance issues in web applications
- network
  - bandwidth <- how much stuff can be put through at the same time
  - latency <- how fast does the stuff travel
  - we can't (easily) change the network
    - we have to work around it
- server
  - web server becomes overloaded
  - badly managed databases
  - poor load sharing
- client
- computation
  - bad architecture
  - bad management of side effects
  - race conditions / bad handling of concurrency
  - bad order of operations
  - redundant code paths
  - wrong choice of algorithm
  - wrong choice of data structure
  - bad resource management
- (responsiveness <- more of a solution)

### execution model of browser based applications
  - single threaded
  - event loop

### react basics
- render cycle
- updates happen if
  - the props change
  - the hooks change
- pure components vs. impure components

### Performance issues in react apps
- redundant rendering
  - non-static callbacks
  - non-static components
  - too broad properties
  - missing keys

## day 2

# react contexts
- benefits of contexts
  - an easy way to pass data
  - a form of loose coupling
  - no prop drilling
- drawbacks of contexts
  - more boilerplate code
  - more noise: more layers in the component tree
  - you do not see that a child component uses a context
  - it is harder to see the data flow
- performance impact of contexts
  - ideas
    - may increase rendering performance?
    - looking up the provider may be slow?
    - changing the context may re-render the children?
  - updating the provider re-renders all consumers
    - even if the consumer only uses parts of the data
  - updating the provider _may_ re-render all of its children
    - unless you use pure components as children, e.g. by using React.memo
- best practices
  - put the provider as close to the consumers as possible
  - keep your contexts small
  - separate static/constant data from changing/mutable data
- when to use contexts
  - if prop drilling is impractical
    - what impractical means is up to you
  - if you want to share data between many different components
- when not to use contexts
  - if you want to manage application-wide state
    - there are better & more sophisticated solutions
      - redux
### data fetching
- how to indicate to the user that data is being fetched
  - Add a "isLoading" state or use useAsync / react-async
  - Using Suspense
- useAsync
  - encapsulates the promise lifetime
- Suspense
  - Suspenses are triggered by throwing Promises
  - Make sure to put Suspense components at appropriate places in your application

### staying responsive
- how does the application performance feel to the user?
- how do we stay responsive?
  - don't ever take away control from the user
  - tell the user when they are committing to a long running action
  - ideally, the user can cancel actions that are still running
  - displaying partial results
  - gracefully handle "spam" inputs

### AbortController
- solves the problem: how do I abort (network) requests?

#### Example: Not aborting requests leads to out-of-order responses:

```
0ms   searchQuery: ""
10ms  searchQuery: "ho"               -> http://search.awesome?query="ho"             <- yields 10000 results   takes: 320ms
20ms  searchQuery: "how to b"         -> http://search.awesome?query="how to b"       <- yields 1000 results    takes: 140ms
30ms  searchQuery: "how to bake ch"   -> http://search.awesome?query="how to bake ch" <- yields 10 results      takes: 80ms

110ms receive result for "how to bake ch"
160ms receive result for "how to b"
330ms receive result for "ho"
```


### throttling and debouncing user input
- debouncing means waiting for the state to settle before acting on it
- throttling means turning a stream of events with many events into a stream with fewer events, that are organized in regular intervals

### page load
- what happens during page load
  - the html page is requested from the server
    - this page is quite small (usually)
  - the html is parsed
  - external resources are fetched
  - the script bundle is executed
- usually the problem is the loading of the script bundle
  - we have to reduce the bundle size
- minor mistakes can lead to huge bundles
- use the webpack bundle analyzer


### web workers
- web workers provide background threads
  - concurrent work, but also parallel work
- communication via messages
  - data is copied, unless you are using transferable objects, and transfer them
