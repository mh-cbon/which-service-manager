# which-service-manager

Tells the service manager running on the current system.

# Install

```sh
npm i @mh-cbon/which-service-manager --save
```

# Usage

```js
// print list of identifiable service manager
console.log(require('@mh-cbon/which-service-manager').sysInits);
  // serviceManager is one of
  // - systemd
  // - upstart
  // - chkconfig
  // - launchd
  // - sc

// get current system manager
require('@mh-cbon/which-service-manager')(function (err, serviceManager, bin) {
  err && console.error(err);
  !err && console.log("System found is %s", serviceManager);
  !err && bin && console.log("It provides a binary path %s", bin);
})

// get all system manager running on the system
require('@mh-cbon/which-service-manager').all(function (err, sysInits) {
  err && console.error(err);
  !err && console.log("Init systems found is %j", sysInits);
  Object.keys(sysInits).forEach(function (system) {
    !err && bin && console.log("It provides %s a binary path %s", system.sys, system.path);
  })
})


```

# Todos
- add openrc support (gentoo)

# Read more
- https://github.com/mh-cbon/has-systemd
- https://github.com/mh-cbon/has-upstart
- https://github.com/mh-cbon/has-chkconfig
- https://github.com/mh-cbon/has-launchd
- https://github.com/mh-cbon/has-sc
