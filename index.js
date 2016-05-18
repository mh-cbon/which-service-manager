var async = require('async')

whichServiceManager.sysInits = [
  'systemd',
  'upstart',
  'chkconfig',
  'launchd',
  'sc',
  'sysv',
]
whichServiceManager.all = function (then) {
  var foundSysInit = {}

  async.parallel([
    function (next) {
      require('@mh-cbon/has-systemd')(function (err, systemdPath) {
        if(!err) foundSysInit.systemd = {sys: 'systemd', path: systemdPath}
        next()
      })
    },
    function (next) {
      require('@mh-cbon/has-upstart')(function (err, initctlPath) {
        if(!err) foundSysInit.upstart = {sys: 'upstart', path: initctlPath};
        next()
      })
    },
    function (next) {
      require('@mh-cbon/has-chkconfig')(function (err, chkconfigPath) {
        if(!err) foundSysInit.chkconfig = {sys: 'chkconfig', path: chkconfigPath};
        next()
      })
    },
    function (next) {
      require('@mh-cbon/has-launchd')(function (err, launchdPath) {
        if(!err) foundSysInit.launchd = {sys: 'launchd', path: launchdPath};
        next()
      })
    },
    function (next) {
      require('@mh-cbon/has-sc')(function (err, scPath) {
        if(!err) foundSysInit.sc = {sys: 'sc', path: scPath};
        next()
      })
    },
    function (next) {
      require('@mh-cbon/has-sysv')(function (err) {
        if(!err) foundSysInit.sysv = {sys: 'sysv', path: ''};
        next()
      })
    },
  ], function (voidErr) {
    if(!Object.keys(foundSysInit).length) {
      return then(new Error('Init system not found'))
    }
    then(null, foundSysInit);
  })
}
function whichServiceManager (then) {
  whichServiceManager.all(function (err, found) {
    if (err) return then(err);
    var preferredSysInit;
    whichServiceManager.sysInits.forEach(function (sys) {
      if (found[sys] && !preferredSysInit) {
        preferredSysInit = found[sys];
      }
    })
    return then(null, preferredSysInit.sys,preferredSysInit.path);
  })
}

module.exports = whichServiceManager;
