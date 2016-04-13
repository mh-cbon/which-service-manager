# which-service-manager

Tells the service manager running on the current system.

# Install

```sh
npm i @mh-cbon/which-service-manager --save
```

# Usage

```js
require('@mh-cbon/which-service-manager')(function (err, serviceManager, bin) {
  // serviceManager is one of
  // - systemd
  // - upstart
  // - chkconfig
  // - launchd
  // - sc
  err && console.error(err);
  !err && console.log("System found is %s", serviceManager);
  !err && bin && console.log("It provides a binary path %s", bin);
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
