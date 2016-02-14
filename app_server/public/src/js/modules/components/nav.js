const m = require('mithril');

const App = require('../app');

const Nav = module.exports = {};

Nav.navItems = [];

Nav.controller = function () {
  this.getVisibleItems = function () {
    let scopes = App.getScopes();
    let nav = [];

    if (scopes.contains('metrics')) {
      nav.push({
        name: 'Metrics', href: '/metrics',
        sub: [
          {name: 'Overview', href: '/metrics/overview'},
          {name: 'Real-Time', href: '/metrics/realtime'},
          {name: 'Demographics', href: '/metrics/demographics'}
        ]
      });
    }
    if (scopes.contains('streams')) {
      nav.push({
        name: 'Streams', href: '/streams',
        sub: [
          {name: 'Live Streams', href: '/streams/live'},
          {name: 'All Streams', href: '/streams/all'},
          {name: 'Search', href: '/streams/search'}
        ]
      });
    }
    if (scopes.contains('users')) {
      nav.push({
        name: 'Users', href: '/users',
        sub: [
          {name: 'All Users', href: '/users/all'},
          {name: 'Search', href: '/users/search'}
        ]
      });
    }
    if (scopes.contains('admins')) {
      nav.push({
        name: 'Admins', href: '/admins',
        sub: [
          {name: 'All Admins', href: '/admins/all'},
          {name: 'Create Admin', href: '/admins/create'}
        ]
      });
    }
    if (scopes.contains('settings')) {
      nav.push({
        name: 'Settings',
        href: '/settings',
        sub: []
      });
    }

    return nav;
  };
};

Nav.view = function (ctrl) {
  let getLink = (item) =>
      m('a[href="' + item.href + '"]', {config: m.route}, item.name);

  let makeList = function (items) {
    if (!items) {
      return;
    }

    return m('ul', [
      items.map(function (item) {
        let isActive = m.route().startsWith(item.href);
        return isActive ?
            m('li.active', getLink(item), makeList(item.sub)) :
            m('li', getLink(item));
      })
    ]);
  };

  return makeList(ctrl.getVisibleItems());
};
