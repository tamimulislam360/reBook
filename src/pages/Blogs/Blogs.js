const Blogs = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6 text-secondary">
        Our latest blogs
      </h2>
      <div className="max-w-2xl mx-auto my-8">
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-slate-900 text-white"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">
            What are the different ways to manage a state in a React
            application?
          </div>
          <div className="collapse-content">
            <h2 className="text-xl font-bold">
              How to Manage Local State in React
            </h2>
            <p>
              Local state is perhaps the easiest kind of state to manage in
              React, considering there are so many tools built into the core
              React library for managing it. useState is the first tool you
              should reach for to manage state in your components. It can take
              accept any valid data value, including primitive and object
              values. Additionally, its setter function can be passed down to
              other components as a callback function (without needing
              optimizations like useCallback).
            </p>
            <h2 className="text-xl font-bold">
              How to Manage Global State in React
            </h2>
            <p>
              Once you attempt to manage state across multiple components,
              things get a bit trickier. You will reach a point in your
              application where patterns like “lifting state up” and passing
              callbacks down to update your state from components lead to lots
              and lots of props. What do you do if you want to update a
              component’s state from basically anywhere in your app? You turn it
              into global state. To manage it, however, you should opt for a
              third-party solution. Many developers are inclined to use built-in
              React features like the Context API to manage their state.
            </p>
            <h2 className="text-xl font-bold">
              How to Manage Server State in React
            </h2>
            <p>
              Server state can be deceptively challenging to manage. At first,
              it seems you just need to fetch data and display it in the page.
              But then you need to display a loading spinner while you are
              waiting for the data. Then you need to handle errors and display
              them to the user as they arise. What happens when there is a
              network error? Do I really need to hit my server every time my
              user visits the home page if the data hasn’t changed? Do I need to
              add useState and useEffect in every component I want to fetch my
              data? To fix this, there are a couple of great libraries that make
              data fetching in React a breeze: SWR and React Query.
            </p>
          </div>
        </div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-slate-900 text-white"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">
            How does prototypical inheritance work?
          </div>
          <div className="collapse-content">
            <p>
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object. getPrototypeOf and Object.
            </p>
            <br />
            <p>
              Every object with its methods and properties contains an internal
              and hidden property known as [[Prototype]]. The Prototypal
              Inheritance is a feature in javascript used to add methods and
              properties in objects. It is a method by which an object can
              inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object.getPrototypeOf and Object.setPrototypeOf.
              Nowadays, in modern language, it is being set using __proto__.
            </p>
          </div>
        </div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-slate-900 text-white"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">
            What is a unit test? Why should we write unit tests?
          </div>
          <div className="collapse-content">
            <p>
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </div>
        </div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-slate-900 text-white"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">
            React vs. Angular vs. Vue?
          </div>
          <div className="collapse-content">
            <h2 className="text-xl font-bold">React vs Angular</h2>
            <p>
              If the choice you’re making is based on Angular vs React alone,
              then you’ll simply need to consider the pros and cons discussed
              for those libraries in this post. But overall, keep in mind that
              both libraries can be used for mobile and web apps, while Angular
              is generally better for more complex apps that are
              enterprise-ready. React often requires extra modules and
              components, which keeps the core library small, but means there’s
              extra work involved when incorporating outside tools. Angular, on
              the other hand, is more of a full-fledged solution that doesn’t
              require extras like React often does, though it does have a
              steeper learning curve for its core compared to React. React is
              more suitable for intermediate to advanced JavaScript developers
              who are familiar with concepts from ES6 and up, while Angular
              favors those same developers who are also familiar with
              TypeScript.
            </p>
            <h2 className="text-xl font-bold">React vs Vue</h2>
            <p>
              The choice between React vs Vue is often debated and it’s not an
              easy one. Vue has a vibrant and ever-growing community and has
              taken over popularity vs. React in many respects. React developers
              are still churning out lots of new components and extras, so
              there’s no sign that React is on the decline either. Vue is
              generally more suited to smaller, less complex apps and is easier
              to learn from scratch compared to React. Vue can be easier to
              integrate into new or existing projects and many feel its use of
              HTML templates along with JSX is an advantage. Overall, Vue might
              be the best choice if you’re a newer developer and not as familiar
              with advanced JavaScript concepts, while React is quite well
              suited for experienced programmers and developers who have worked
              with object-oriented JavaScript, functional JavaScript, and
              similar concepts.
            </p>
            <h2 className="text-xl font-bold">Angular vs Vue</h2>
            <p>
              In most cases, you probably wouldn’t be deciding between only
              Angular and Vue. They are vastly different libraries with very
              different feature sets and learning curves. Vue is the clear
              choice for less experienced developers, and Angular would be
              preferred for those working on larger apps. A large library like
              Angular would require more diligence in keeping up with what’s
              new, while Vue would be less demanding in this regard and the fact
              that the two most recent major releases of Vue are in separate
              repositories helps. It should also be noted that Vue was created
              by a developer who formerly worked on Angular for Google, so
              that’s another thing to keep in mind, though that wouldn’t have a
              huge impact on your decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
