// Bookmarklets

document.addEventListener('DOMContentLoaded', function () {
  var bookmarklets = [];

  chrome.bookmarks.getTree(function(nodes) {
    getBookmarklets(nodes);
    bookmarklets.forEach(function(bookmarklet) {
      $('#bookmarklets').append(
        $('<li></li>').append(
          $('<a href="#">' + bookmarklet.title + '</a>').click(function(event) {
            chrome.tabs.update(null, {url: decodeURI(bookmarklet.url)});
          })
        )
      );
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

