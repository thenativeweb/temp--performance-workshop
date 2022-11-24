# web application performance

## day 1

- what is performance?
  - speed
    - network
    - computation
    - responsiveness
  - memory utilization
  - application size
- when do we have a performance problem?
  - what are indicators of problems?
    - (out of memory) errors
    - noticeable delay in the UI
    - waiting for backend data
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

- sources of performance issues in web applications
  - network
    - bandwidth <- how much stuff can be put through at the same time
    - latency <- how fast does the stuff travel
    - we can't change the network
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

- execution model of browser based applications
  - UI thread
  - single threaded
  - event loop
- react basics
  - render cycle
  - updates happen if
    - the props change
    - the hooks change

- Performance issues in react apps
  - redundant rendering
    - non-static callbacks
    - non-static components
    - too broad properties
    - missing keys

## day 2

- react contexts
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

- data fetching
  - how to indicate to the user that data is being fetched
    - Add a "isLoading" state or use useAsync / react-async
    - Using Suspense


7
3
1 

root---------------------------------
|                                   |
child1-------                       child2-------
|           |                       |           |
child11    child12                  child21    child22
