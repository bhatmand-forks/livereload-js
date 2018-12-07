/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

let LessPlugin;
module.exports = (LessPlugin = (function () {
  LessPlugin = class LessPlugin {
    static initClass () {
      this.identifier = 'less';
      this.version = '1.0';
    }

    constructor (window, host) {
      this.window = window;
      this.host = host;
    }

    reload (path, options) {
      if (this.window.less && this.window.less.refresh) {
        if (path.match(/\.less$/i)) {
          return this.reloadLess(path);
        }
        if (options.originalPath.match(/\.less$/i)) {
          return this.reloadLess(options.originalPath);
        }
      }
      return false;
    }

    reloadLess (path) {
      let link;
      const links = ((() => {
        const result = [];
        for (link of Array.from(document.getElementsByTagName('link'))) {
          if ((link.href && link.rel.match(/^stylesheet\/less$/i)) || (link.rel.match(/stylesheet/i) && link.type.match(/^text\/(x-)?less$/i))) {
            result.push(link);
          }
        }
        return result;
      })());

      if (links.length === 0) { return false; }

      for (link of Array.from(links)) {
        link.href = this.host.generateCacheBustUrl(link.href);
      }

      this.host.console.log('LiveReload is asking LESS to recompile all stylesheets');
      this.window.less.refresh(true);
      return true;
    }

    analyze () {
      return { disable: !!(this.window.less && this.window.less.refresh) };
    }
  };
  LessPlugin.initClass();
  return LessPlugin;
})());
