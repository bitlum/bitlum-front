
const trackingId =
process.env.NODE_ENV !== 'production'
  ? '3256711276'
    : '664479579';

(function HAinitializer() {
  window.heap = window.heap || [];
  window.heap.load = function(e, t) {
    window.heap.appid = e;
    window.heap.config = t = t || {};
    var r = t.forceSSL || 'https:' === document.location.protocol;
    const a = document.createElement('script');
    a.type = 'text/javascript';
    a.async = !0;
    a.src = (r ? 'https:' : 'https:') + '//cdn.heapanalytics.com/js/heap-' + e + '.js';
    var n = document.getElementsByTagName('script')[0];
    n.parentNode.insertBefore(a, n);
    for (
      var o = function(e) {
          return function() {
            window.heap.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        },
        p = [
          'addEventProperties',
          'addUserProperties',
          'clearEventProperties',
          'identify',
          'resetIdentity',
          'removeEventProperty',
          'setEventProperties',
          'track',
          'unsetEventProperty',
        ],
        c = 0;
      c < p.length;
      c++
    )
      window.heap[p[c]] = o(p[c]);
  };
  window.heap.load(trackingId);
})();
export default '';
