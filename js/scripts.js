// Generic object to namespace our app (keep variables out of global scope) and keep things organized!
var app = {

  // Table of Contents of what this file does.
  init: function() {
    this.setUpMenu();
    this.setUpFirstView();
  },

  setUpMenu: function() {

    // jQuery UI specific setup function
    $('#tags').selectmenu({

      select: function() {

        var el = $(this);

        // Using animate here instead of fadeOut so it doesn't collapse to zero height.
        $("#main").animate({
          opacity: 0
        }, 500, function() {
          var url = el.val();
          app.getSection(url);
        });

      }

    });

  },

  getSection: function(url) {

    $.ajax({

      url: "elements/" + url

    }).success(function(html) {

      // Replace the card with the new content and fade it back in.
      $("#main")
        .html(html)
        .animate({
          opacity: 1
        }, 500);

      app.updateURL(url);

    });

  },

  updateURL: function(url) {
    window.location.hash = url;
  },

  // This function controls what element will show based on the URL the page loads with.
  setUpFirstView: function() {

    // Look for hash
    var hash = window.location.hash;
    var url = hash.replace("#", "");

    // If there is one...
    if (url) {

      // Deselect the currently selected option
      $("#tags option").prop("selected", false);

      // Select the option that matches the hash
      $("option[value='" + url + "']").prop("selected", true);

      // Refresh jQuery UI menu
      $('#tags').selectmenu("refresh");

      // Load that element
      this.getSection(url);

    }

  }

};

app.init();
