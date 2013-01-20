// Bookmarklets

document.addEventListener('DOMContentLoaded', function () {
  var bookmarklets = [];

  chrome.bookmarks.getTree(function(nodes) {
    getBookmarklets(nodes);
    var html = '';
    bookmarklets.forEach(function(bookmarklet) {
      html += '<li><a href="' + bookmarklet.url + '">' + bookmarklet.title + '</a></li>';
    });
    document.getElementById('bookmarklets').innerHTML = html;
    $("#bookmarklets").html(html);
    $("#bookmarklets a").click(function(event) {
      var el = $(event.target);
      var href = el.attr('href');
      var script = href.substr(11, href.length - 11);
      chrome.tabs.update(null, {url: href});
    });
  });

  getBookmarklets = function(nodes) {
    nodes.forEach(function(node) {
      if (node.url && /^javascript:/.test(node.url)) {
        bookmarklets.push(node);
      } else if (node.children) {
        getBookmarklets(node.children);
      }
    })
  };

});

