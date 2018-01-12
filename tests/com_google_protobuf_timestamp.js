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
    var foo = Foo.fromObject({foo: {
        seconds: 9999,
        nanos: 234000
    }});

    test.ok(foo.foo instanceof Date, "foo should be an instance of Date");
    test.ok(foo.foo.valueOf() === testDate.valueOf(), "foo should have the same integer value");
    
    
    var obj = Foo.toObject(foo);
    test.ok(obj.foo.seconds === 9999 && obj.foo.nanos === 234000, "obj should have the same value as the original object");

    test.end();
});
