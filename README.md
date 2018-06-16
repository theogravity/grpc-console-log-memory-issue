# grpc-console-log-memory-issue

This repo is an example for `node/help` issue [1339](https://github.com/nodejs/help/issues/1339),
which illustrates that `console.log` output to the default stream does not get gc'd.

This example sets up a [gRPC](https://grpc.io/) server running in debug/inspect mode. It has two modes of operation:

- One where it outputs data via `console.log`
- Another where it does not do any console output at all

## How to run

Install deps with `npm install`.

You want to have your Chrome inspector listen for the debug connection from the server.

- `npm run start`: Starts the server
- `npm run test`: Starts the test

The `npm run test` sequence does the following:

- Warms up the server process by sending sample commands to it
- After the warmup is completed, you should start the `Memory > Allocation Timeline` recording in the
Chrome inspector.
- The sequence will now have the server perform console output
- After that sequence ends, the script will now have the server not perform console output

After the script ends, you should stop recording on the timeline.

Your output should look like this:

![timeline](https://github.com/theogravity/grpc-console-log-memory-issue/blob/master/timeline.png?raw=true)

If you inspect the tiny blue blips, they are data from `console.log`.
