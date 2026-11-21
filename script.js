// PROJECT EXP — small helpers. No tracking, no cookies, no third-party requests.
(function () {
  // Footer year updates itself
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  var btn = document.querySelector(".menu");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // Email address is assembled here so it isn't sitting in the page source for spam bots
  var mail = document.querySelector("[data-mail]");
  if (mail) {
    var addr = mail.getAttribute("data-user") + "@" + mail.getAttribute("data-domain");
    var a = document.createElement("a");
    a.href = "mailto:" + addr;
    a.textContent = addr;
    mail.textContent = "";
    mail.appendChild(a);
  }

  // Enquiry form
  var form = document.getElementById("enquiry");
  if (!form) return;
  var status = document.getElementById("status");
  var endpoint = form.getAttribute("data-endpoint") || "";
  var configured = /^https:\/\//.test(endpoint);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
      status.textContent = "Please add your name, a valid email and a short message.";
      return;
    }
    if (form.elements._gotcha && form.elements._gotcha.value) return; // spam trap
    if (!configured) {
      status.textContent = "The enquiry form isn't switched on yet. Please email us instead.";
      return;
    }
    var submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    status.textContent = "Sending…";
    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (r) {
        if (!r.ok) throw new Error("bad response");
        form.reset();
        status.textContent = "Thanks, your message has been sent. We'll be in touch soon.";
      })
      .catch(function () {
        status.textContent = "Sorry, that didn't send. Please try again or email us instead.";
      })
      .then(function () { submit.disabled = false; });
  });
})();
