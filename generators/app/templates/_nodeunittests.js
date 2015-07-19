// If you would like more information on get started with Nodeunit see the
// documentation at https://github.com/caolan/nodeunit

exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

// exports.testSomethingElse = function(test){
//     test.ok(false, "this assertion should fail");
//     test.done();
// };
