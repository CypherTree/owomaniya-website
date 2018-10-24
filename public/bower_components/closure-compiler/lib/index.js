// Generated by CoffeeScript 1.10.0
var JAR_PATH, JAVA_PATH, OPTIONS, path, spawn;

spawn = require('child_process').spawn;

path = require('path');

JAVA_PATH = exports.JAVA_PATH = 'java';

JAR_PATH = exports.JAR_PATH = require.resolve('google-closure-compiler/compiler.jar');

OPTIONS = exports.OPTIONS = {};

exports.compile = function(input, options, callback) {
  var args, compiler, result, stderr, stdout;
  if ('function' === typeof options) {
    callback = options;
    options = OPTIONS;
  } else {
    result = {};
    Object.keys(OPTIONS).forEach(function(key) {
      return result[key] = OPTIONS[key];
    });
    Object.keys(options).forEach(function(key) {
      return result[key] = options[key];
    });
    options = result;
  }
  args = [];
  if (!options.jar) {
    options.jar = JAR_PATH;
  }
  args.push('-jar');
  args.push(options.jar);
  delete options.jar;
  Object.keys(options).forEach(function(key) {
    var i, len, val, value;
    value = options[key];
    if (Array.isArray(value)) {
      for (i = 0, len = value.length; i < len; i++) {
        val = value[i];
        args.push("--" + key);
        args.push(val);
      }
      return;
    }
    if (typeof value === 'boolean' && value === false) {
      return;
    }
    args.push("--" + key);
    if (value !== true) {
      return args.push(value);
    }
  });
  compiler = spawn(JAVA_PATH, args);
  stdout = '';
  stderr = '';
  compiler.stdout.setEncoding('utf8');
  compiler.stderr.setEncoding('utf8');
  compiler.stdout.on('data', function(data) {
    return stdout += data;
  });
  compiler.stderr.on('data', function(data) {
    return stderr += data;
  });
  compiler.on('exit', function(code) {
    var error;
    if (code !== 0) {
      error = new Error(stderr);
      error.code = code;
    } else {
      error = null;
    }
    return callback(error, stdout, stderr);
  });
  return compiler.stdin.end(input);
};
