//This run integration test

// util that spawns a child process
var spawn = require('child_process').spawn;

// reference to our node application server
var server = require('../../src/server.js');

// starts the server
server.start(function() {
    // on server ready launch the jasmine-node process with your test file
    var jasmineNode = spawn('jasmine-node', ['--verbose', './' ]);

    // logs process stdout/stderr to the console
    function logToConsole(data) {
        console.log(String(data));
    }
    jasmineNode.stdout.on('data', logToConsole);
    jasmineNode.stderr.on('data', logToConsole);
    jasmineNode.on('exit', function(exitCode) {
        // when jasmine-node is done, shuts down the application server
        server.close();
    });
});
