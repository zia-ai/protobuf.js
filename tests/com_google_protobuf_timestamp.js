var tape = require("tape");

var protobuf = require("..");

var root = protobuf.Root.fromJSON({
    nested: {
        Foo: {
            fields: {
                foo: {
                    id: 1,
                    type: "google.protobuf.Timestamp"
                }
            }
        }
    }
})
    .addJSON(protobuf.common["google/protobuf/timestamp.proto"].nested)
    .resolveAll();

var Timestamp = root.lookupType("protobuf.Timestamp"),
    Foo = root.lookupType(".Foo");

tape.test("google.protobuf.Timestamp", function(test) {

    var testDate = new Date(9999 * 1000 + 234);
    var foo = Foo.fromObject({foo: testDate});

    test.ok(foo.foo instanceof Timestamp.ctor, "foo should be an instance of Timestamp");
    test.ok(foo.foo.seconds === 9999 && foo.foo.nanos === 234000, "obj should have the same value as the original object");

    
    var obj = Foo.toObject(foo);
    test.ok(obj.foo.valueOf() === testDate.valueOf(), "foo should have the same integer value");

    test.end();
});
