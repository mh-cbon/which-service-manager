
function whichServiceManager (then) {
  require('@mh-cbon/has-systemd')(function (err, systemdPath) {
    if(!err) return then(null, 'systemd', systemdPath);
    require('@mh-cbon/has-upstart')(function (err1, initctlPath) {
      if(!err1) return then(null, 'upstart', initctlPath);
      require('@mh-cbon/has-chkconfig')(function (err2, chkconfigPath) {
        if(!err2) return then(null, 'chkconfig', chkconfigPath);
        require('@mh-cbon/has-launchd')(function (err3, launchdPath) {
          if(!err3) return then(null, 'launchd', launchdPath);
          require('@mh-cbon/has-sc')(function (err4, scPath) {
            if(!err4) return then(null, 'sc', scPath);
            return then('unhandled system');
          })
        })
      })
    })
  })
  // I may have used async too !
}

module.exports = whichServiceManager;
