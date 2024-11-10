

class A {

    baz() {
        return `"A"`
    }
}


class B extends A {

    baz() {
        return `${super.baz()} > "B"`
    }
}

/* This time, we populate this one. */
class C extends B {

    // baz() {
    //     return `${super.baz()} > "C"`
    // }
}

class D extends C {

    baz() {
        return `${super.baz()} > "D"`
    }
}


Glucose.head.install(A)
Glucose.head.install(B)
Glucose.head.install(C)
Glucose.head.install(D)

const value = function() {
    console.log('c Baz', v)
    return `${this} > "Cm"`
}


;d = new D;
console.log('baz chain:', d.baz())

;c = new C;
console.log('baz chain:', c.baz())
