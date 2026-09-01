// Safeseal Document Solutions — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is tapped (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form: friendly inline confirmation if it's set up with Formspree's
  // AJAX endpoint. Falls back to a normal full-page POST/redirect if fetch fails
  // or the form action hasn't been configured yet.
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("REPLACE_WITH") !== -1) {
        // Form hasn't been connected to a real submission endpoint yet.
        return;
      }

      e.preventDefault();
      var status = document.querySelector("#form-status");
      var data = new FormData(form);

      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (status) {
              status.textContent =
                "Thanks — your message was sent. We'll get back to you shortly.";
              status.classList.add("success-box");
              status.hidden = false;
            }
          } else {
            if (status) {
              status.textContent =
                "Something went wrong sending your message. Please call or text us instead.";
              status.hidden = false;
            }
          }
        })
        .catch(function () {
          if (status) {
            status.textContent =
              "Something went wrong sending your message. Please call or text us instead.";
            status.hidden = false;
          }
        });
    });
  }
});
