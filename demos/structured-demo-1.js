
Glucose.head.mixin(Glucose.B, {
    egg: {
        get() {
            return this
        }
    }
})


class A {

    foo() {
        return 'foo'
    }
}


class B extends A {

    bar() {
        return 'bar'
    }
}


class C extends B {

    baz() {
        return 'baz'
    }
}


Glucose.head.install(A)
Glucose.head.install(B)
Glucose.head.install(C)


;c = new C;
console.log('egg', c.egg)
