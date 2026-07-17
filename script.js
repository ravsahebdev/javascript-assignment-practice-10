//  JavaScript & DOM Practice Questions
//  Part 1 — JavaScript Tasks (1–15)
//  Easy (1–5)

// 1. Even or Odd Checker — Write a function that takes one number and returns "Even" or "Odd" using the `%` operator. 
// Test with 0 and a negative number too.
function evenOdd(num) {
    if (num < 0) {
        return "Negetive Number";
    }
    if (Number.isNaN(num)) {
        return "Enter Valid Number";
    }
    return num % 2 === 0 ? "Even Number" : "Odd ";
}
console.log(evenOdd(2));
console.log(evenOdd(-2));

// 2. Greeting Generator — Write a function that takes a name and age, and returns
//  a sentence like "Hello, Riya! You are 21 years old." using a template literal.
function greet(name, age) {
    return `Hello, ${name}! You are ${age} years old.`;
}
console.log(greet("Riya", 21));

// 3. Rectangle Area Calculator — Write a function that takes width and height and returns their product as the area.
function rectangleArea(width, height) {
    return width * height;
}
console.log(rectangleArea(10, 20));

// 4. Private Counter with Closures — Write an outer function with a private count variable (starting at 0) that returns an 
// inner function which increases and returns the count each time it's called. The count should not be accessible from outside.
function outer() {
    let count = 0;
    return function inner() {
        return count += 1;
    }
}

let outs = outer();
console.log(outs());
console.log(outs());
console.log(outs());


// 5. Find the Largest Number — Write a function that takes an array of numbers and returns the largest one,
//  without using `Math.max()`.
function largest(arr) {
    let max = arr[0];
    for (let value of arr) {
        if (max < value) {
            max = value;
        }
    }
    return max;
}
console.log(largest([14, 21, 30, 48, 99, 20]));

//  Medium (6–10)
// 6. Product Data Processor — Given an array of product objects (name, price, category): use `map()` to get product names,
// `filter()` to get products from one category, and `reduce()` to get the total price.
let products = [
    { name: "iPhone", price: 70000, category: "Mobile" },
    { name: "Samsung S24", price: 65000, category: "Mobile" },
    { name: "MacBook Air", price: 95000, category: "Laptop" },
    { name: "HP Pavilion", price: 60000, category: "Laptop" },
    { name: "Boat Earbuds", price: 3000, category: "Accessories" }
];

let productsName = products.map(product => product.name);
console.log(productsName);

function categoryProduct(name) {
    return products.filter(product => product.category === name)
}
console.log(categoryProduct("Laptop"));
console.log(categoryProduct("Mobile"));

let totalProductPrice = products.reduce((acc, curr) => acc + curr.price, 0);
console.log(totalProductPrice);

// 7. Debounce Utility from Scratch — Write a `debounce(fn, delay)` function that returns a new function which
//  only runs `fn` after `delay` ms have passed since the last call, resetting the timer on each new call.
function debounce(fun, delay = 500) {
    let interval = null;

    return function () {
        clearTimeout(interval);
        interval = setTimeout(() => {
            fun();
        }, delay);
    }

}

let testing = debounce(function () {
    console.log("I am debounce...");
}, 1000);

testing();
testing();
testing();
testing();

// 8. Sequential Task Runner — Write three functions that each resolve a Promise after a delay, logging "Step 1 done",
//  "Step 2 done", "Step 3 done". Write a fourth function using `async/await` to run them strictly one after another.
function one() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Promise 1st resolved");
            resolve();
        }, 1000);
    })
}
function two() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Promise 2nd resolved");
            resolve();
        }, 1000);
    })
}
function three() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Promise 3rd resolved");
            resolve();
        }, 1000);
    })
}
async function boss() {
    await one();
    await two();
    await three();

    console.log("All steps completed");
}
boss();

// shorter 
function promiseResolver(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve()
        }, 1000);
    })
}

async function runner() {
    await promiseResolver("First");
    await promiseResolver("Second");
    await promiseResolver("Third");
}
runner();

// 9. API Data Cleaner — Use `fetch()` to get data from a public API, extract only specific fields (e.g. `title`, `id`), and return a simplified array/object. Wrap it in `try/catch`.
async function getData() {
    try {
        let res = await fetch("https://dummyjson.com/products/category/smartphones");
        let data = await res.json();

        const products = data.products.map(element => ({ id: element.id, title: element.title, }));
        console.log(products);
    } catch (error) {
        console.log("Error aya: ", error);
    }
}
getData()


// 10. Mini Event Emitter — Build an object with `on(eventName, callback)`, `emit(eventName, data)`, and `off(eventName, callback)` methods.
const emitter = {
    events: {},

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    },

    emit(eventName, data) {
        if (!this.events[eventName]) return;

        this.events[eventName].forEach(callback => callback(data));
    },

    off(eventName, callback) {
        if (!this.events[eventName]) return;

        this.events[eventName] = this.events[eventName].filter(
            cb => cb !== callback
        );
    }
};

// Callback Function
// NOTE: renamed to greetUser (was greet) because it was silently
// overwriting the Q2 greet(name, age) function — both were named `greet`.
function greetUser(name) {
    console.log(`Hello ${name}`);
}

// Register Event
emitter.on("login", greetUser);

// Fire Event
emitter.emit("login", "Ravsaheb");

// Remove Event
emitter.off("login", greetUser);

// Ab kuch print nahi hoga
emitter.emit("login", "Ravsaheb");

//  Hard (11–15)
// 11. Memoization Utility — Write a `memoize(fn)` function that caches results by arguments and returns the cached result on repeated calls with the same arguments.
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("Cache hit for", key);
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const slowSquare = memoize(function (n) {
    console.log("Computing square of", n);
    return n * n;
});
console.log(slowSquare(5)); // computes
console.log(slowSquare(5)); // cached
console.log(slowSquare(6)); // computes


// 12. Auto-Retry for Failing Promises — Write a `retry(asyncFn, attempts)` function that retries a failing async function up to a set number of times before finally rejecting.
function retry(asyncFn, attempts = 3) {
    return new Promise((resolve, reject) => {
        function attempt(remaining) {
            asyncFn()
                .then(resolve)
                .catch((err) => {
                    if (remaining <= 1) {
                        reject(err);
                    } else {
                        console.log(`Retrying... attempts left: ${remaining - 1}`);
                        attempt(remaining - 1);
                    }
                });
        }
        attempt(attempts);
    });
}

// Example: fails a couple of times, then succeeds
let attemptCount = 0;
function flakyRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            attemptCount++;
            if (attemptCount < 3) {
                reject(new Error("Network error on attempt " + attemptCount));
            } else {
                resolve("Success on attempt " + attemptCount);
            }
        }, 300);
    });
}

retry(flakyRequest, 5)
    .then(result => console.log(result))
    .catch(err => console.log("Failed after all retries:", err.message));


// 13. Mini State Store — Build an object with `getState()`, `setState(newState)`, and `subscribe(callback)` methods, similar to Redux.
function createStore(initialState = {}) {
    let state = initialState;
    let listeners = [];

    return {
        getState() {
            return state;
        },
        setState(newState) {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        subscribe(callback) {
            listeners.push(callback);
            // returns an unsubscribe function
            return function unsubscribe() {
                listeners = listeners.filter(cb => cb !== callback);
            };
        }
    };
}

const store = createStore({ count: 0 });
const unsubscribe = store.subscribe(state => console.log("State changed:", state));
store.setState({ count: 1 });
store.setState({ count: 2 });
unsubscribe();
store.setState({ count: 3 }); // no log, listener removed
console.log("Final state:", store.getState());


// 14. Deep Clone Utility — Write a `deepClone` function for nested objects/arrays without using `JSON.parse(JSON.stringify())`. Use recursion.
function deepClone(value) {
    if (value === null || typeof value !== "object") {
        return value; // primitives (including functions) are returned as-is
    }

    if (Array.isArray(value)) {
        return value.map(item => deepClone(item));
    }

    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    const cloned = {};
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            cloned[key] = deepClone(value[key]);
        }
    }
    return cloned;
}

const original = { name: "Riya", address: { city: "Pune", pin: 411001 }, hobbies: ["reading", "coding"] };
const cloned = deepClone(original);
cloned.address.city = "Mumbai";
cloned.hobbies.push("gaming");
console.log("Original:", original);
console.log("Cloned:", cloned);


// 15. Concurrency-Limited Task Queue — Write a function that runs a list of async tasks with a max of N running at once; as one finishes, the next starts.
function runWithConcurrency(tasks, limit) {
    return new Promise((resolve) => {
        const results = new Array(tasks.length);
        let nextIndex = 0;
        let completed = 0;

        if (tasks.length === 0) {
            resolve(results);
            return;
        }

        function runNext() {
            if (nextIndex >= tasks.length) return;
            const currentIndex = nextIndex++;

            tasks[currentIndex]()
                .then(result => {
                    results[currentIndex] = { status: "fulfilled", value: result };
                })
                .catch(err => {
                    results[currentIndex] = { status: "rejected", reason: err };
                })
                .finally(() => {
                    completed++;
                    if (completed === tasks.length) {
                        resolve(results);
                    } else {
                        runNext();
                    }
                });
        }

        // kick off up to `limit` tasks in parallel
        for (let i = 0; i < Math.min(limit, tasks.length); i++) {
            runNext();
        }
    });
}

function makeTask(id, delay) {
    return function () {
        return new Promise((resolve) => {
            console.log(`Task ${id} started`);
            setTimeout(() => {
                console.log(`Task ${id} finished`);
                resolve(`Result ${id}`);
            }, delay);
        });
    };
}

const taskList = [
    makeTask(1, 1000),
    makeTask(2, 500),
    makeTask(3, 800),
    makeTask(4, 300),
    makeTask(5, 600)
];

runWithConcurrency(taskList, 2).then(results => {
    console.log("All tasks done:", results);
});
