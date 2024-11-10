<div align="center">

# Glucose.js

Late-stage class augmentation and property injection.

</div>

`Glucose.js` is an ES6 suite of tools to help withclass composition and object management. Streamline creating and managing classes, methods, and properties, injecting functions dynamically.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
  - [Naming the Global Object](#naming-the-global-object)
- [Getting Started](#getting-started)
  - [Basic Usage](#basic-usage)
- [Examples](#examples)
  - [Larger Example](#larger-example)
  - [Inheritance Compliance](#inheritance-compliance)
  - [Pre-Mixin](#pre-mixin)
  - [Fence Hopping Head Space](#fence-hopping-head-space)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

---

```js
// Assume Glucose is already included and available as 'Glucose'

// 1. Define a simple class
class Animal {
  speak() {
    return 'Moo Woof Meow';
  }
}

// 2. Install the class into Glucose
Glucose.head.install(Animal);

// 3. Create an instance of the class
const animal = new Animal();
console.log(animal.speak()); // Output: 'Moo Woof Meow'

// 4. Dynamically add new properties and methods to the class
Glucose.head.mixin('Animal', {
  type: {
    value: 'Mammal',
    writable: true,
  },
  speak: {
    value: function () {
      return `I am a ${this.type}`;
    },
  },
});

// 5. Existing instances now have the new properties and methods
console.log(animal.type);    // Output: 'Mammal'
console.log(animal.speak()); // Output: 'I am a Mammal'

// 6. New instances also have the new properties and methods
const anotherAnimal = new Animal();
console.log(anotherAnimal.type);    // Output: 'Mammal'
console.log(anotherAnimal.speak()); // Output: 'I am a Mammal'
```

This syntactic sugar on top of ES6 enables developers to write cleaner and more flexible code while leveraging late dynamic imports.

---

## Features

- Define Classes Without the Magic
  Keep your classes clean and straightforward without unnecessary complexity.
- Ready-to-Go Global Object
  Start using glucose.js immediately with a global object that's easy to access and manage.
- Lazy Install Any Property or Method
  Add properties or methods to your classes whenever you need them, even after instantiation.
- Pre or Late Stage Mixins
  Flexibly compose your classes before or after they're defined, allowing for dynamic enhancements.

---

## Installation

To get started, include the assets within your scope or page:

```jinja
<script src="../point_src/core/head.js" name="mylib"></script>
```


This installs an object with a range of functions, conveniently using the `name` to define the global object:

```js
window.mylib

// Tools available in `head`
mylib.head.install(...)
mylib.head.mixin(...)
mylib.head.installFunctions(...)
```


## Getting Started

For our code, we use standard ES6 classes

```js
class Being {
    speak() { return 'meow' }
}

class Human extends Being {}
```

Store the class in the global object (e.g. `mylib` from above)

```js
/* _install_ the class in our library. */
mylib.head.install(Human)
```

The class is available in your library object `myLib.Human`.

### Adding Mixins

Target `Human` class and adds functionality

```js
/* from above

class Human {};
*/

/* late stage mixin */
mylib.head.mixin('Human', {
    frogCount: {
        value: 2,
        writable: true,
        // enumerable: true,
        // configurable: true,
    },
    ownsFrog: {
        get() {
            return this.frogCount += 1
        }
    }
})
```

The `Human` gains the new methods as expected:

```js
h = new Human

console.log(h.ownsFrog) // 3
console.log(h.ownsFrog) // 4
console.log(h.ownsFrog) // 5
```

## Late Stage Mixin

We can apply a `head.mixin()` before, or after the target class is created.

Here we

+ Create a class called `A`,
+ Instantiate it (as `a`, and `a2`)
+ install a mixin: `hello` value
+ Create a new instance `a3`

All instances of `A` will contain the `hello` mixin:

```js
class A {
    /* My Fancy class full of important busy ness work ness. */
    foo() { return 'foo' }
}


let a = new A
let a2 = new A

/* As expected. `hello` doesn't exist. */
console.log(a.hello)
console.log(a2.hello)
// undefined

/* Install it into our object. */
Glucose.head.install(A)  // Found at: `Glucose.A`

/* Install an addon after creation */
Glucose.head.mixin('A', {
    hello: {
        value:  'world'
    }
})

/* Poof! The new property is available on the existing instance! */
console.log(a.hello)
console.log(a2.hello)
// world

/* And new instances also apply. */
let a3 = new A

console.log(a3.hello)
// world
```


## Root Object Name

You can provide a name for the root global object through any of the following



#### `name` Attribute

Apply the attribute `name=mylib`:

```jinja
<script src="../point_src/core/head.js" name='Glucose'></script>
```

#### `data-name` Attribute

Or use the `data-name=mylib` property:

```jinja
<script src="../point_src/core/head.js" data-name='Glucose'></script>
```

#### Filepath Hash Value

If that's not possible, the _hash_ at the end of the filepath `src=head.js#mylib` can define the name:

```jinja
<script src="../point_src/core/head.js#Glucose"></script>
```

#### Default _filename_

If non of those exist, the name of the imported file is used

```jinja
<!-- name is head.js -->
<script src="../point_src/core/head.js"></script>
```

## Inheritance Compliant

We can target a class within a chain of inheritance. All children of a class will receive the updates

```js
class A {};
class B extends A {};
class C extends B {};


Glucose.head.installMany(A, B, C)
Glucose.head.mixin('B', {
    one: {
        get() => 'flew'
    }
})

const c = new C()
console.log(c.one)
// 'flew'
```

### Larger Example

Let's define a basic inheritance chain:

```js

class A {
    foo() { return 'foo' }
}


class B extends A {
    bar() { return 'bar' }
}


class C extends B {
    baz() { return 'baz' }
}

// Install them to make them _detectable_
Glucose.head.installMany(A, B, C)
```

We can use our classes as expected:

```js
c = new C()
c.foo() == 'foo'
```

At any point, we can define extra functionality:

```js

Glucose.head.mixin('C', {
    one: {
        get() {
            return 'one'
        }
    }
})

// It's ready to go:
c = new C;
c.one == 'one'
c.two == undefined

```

As a fun trick, we can update class `B` with more functionality, and _existing_ `C` instances also receive the properties:

```js
Glucose.head.mixin('B', {
    two: {
        get() {
            return 'two'
        }
    }
})

b = new B;
b.two == 'two'

// our 'c' instance (from above); inherits the method.
c.two == 'two'
```

Furthermore, any _installed_ class is a target, such as class `A`. All three classes we defined, will receive the new functionality, including the `c` instance.

```js
Glucose.head.mixin('A', {
    three: {
        get() {
            return 'three'
        }
    }
})

(new A).three == 'three'
b.three == 'three'

// from above `c = new C`
c.three == 'three'
```

## Pre-mixin

We can target a class before it is used and generated, and only `head.install()` the target classes:

```js
// Create a mixin for a class, of which doesn't exist yet.
Glucose.head.mixin('E', {
    four: {
        get() {
            return 'four'
        }
    }
})

// Build stuff
class D {
    foo() { return 'foo' }
}


class E extends D {
    bar() { return 'bar' }
}


// Install to make  _detectable_
Glucose.head.install(E)        // D was never installed (which is fine)

e = new E
e.four == 'four'
```

## Fence Hopping Head Space

The _head_ contains useful functions to help load classes, and provides a convenient location to store things when we need to hop-the-fence:


```js
;(function(){

    Glucose.head.mixin('E', {
        four: {
            get() {
                return 'four'
            }
        }
    })

    // Build stuff
    class D {
        foo() { return 'foo' }
    }

})();


// Let's create E _later_, in another scope.
setTimeout(function(){

    class E extends Glucose.D {
        bar() { return 'bar' }
    }


    // Install to make  _detectable_
    Glucose.head.install(E)

    runStuff()
}, 1000)


const runStuff() = function{
    e = new Glucose.E
    e.four == 'four'
}

```