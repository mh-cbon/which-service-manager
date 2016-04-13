
function whichServiceManager (then) {
  require('@mh-cbon/has-systemd')(function (err, systemdPath) {
    if(!err) return then(null, 'systemd', systemdPath)
    require('@mh-cbon/has-upstart')(function (err, initctlPath) {
      if(!err) return then(null, 'upstart', initctlPath)
      require('@mh-cbon/has-chkconfig')(function (err, chkconfigPath) {
        if(!err) return then(null, 'chkconfig', chkconfigPath)
        require('@mh-cbon/has-launchd')(function (err, launchdPath) {
          if(!err) return then(null, 'launchd', launchdPath)
          require('@mh-cbon/has-sc')(function (err, scPath) {
            if(!err) return then(null, 'sc', scPath)
            return then('unhandled system');
          })
        })
      })
    })
  })
  // I may have used async too !
}

module.exports = whichServiceManager;
