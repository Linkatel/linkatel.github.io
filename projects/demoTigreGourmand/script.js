(function () {
  var header = document.querySelector("header");

  function update() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  update();
  window.addEventListener("scroll", update, {
    passive: true
  });

  var cards = document.querySelectorAll(".ticket");
  if (cards.length) {
    var total = document.getElementById("total"),
      count = document.getElementById("count"),
      msg = document.getElementById("order-msg");
    var sum = function () {
      var t = 0,
        n = 0;
      cards.forEach(function (c) {
        var q = +c.querySelector("output").textContent;
        t += q * c.dataset.price;
        n += q;
      });
      total.textContent = t + " €";
      count.textContent = n + (n > 1 ? " billets" : " billet");
    };
    cards.forEach(function (c) {
      var out = c.querySelector("output");
      c.querySelectorAll(".qty button").forEach(function (b) {
        b.addEventListener("click", function () {
          out.textContent = Math.max(0, Math.min(10, +out.textContent + +b.dataset.d));
          sum();
        });
      });
    });
    document.getElementById("order-btn").addEventListener("click", function () {
      msg.textContent = count.textContent.charAt(0) === "0" ?
        "Ajoutez au moins un billet pour commander." :
        "Commande passée. Merci, vos billets arrivent par e-mail.";
    });
  }

  var pt = document.querySelectorAll(".prog-tabs button"),
    pp = document.querySelectorAll(".prog-panel");
  pt.forEach(function (b) {
    b.addEventListener("click", function () {
      pt.forEach(function (x) {
        x.setAttribute("aria-selected", x === b);
      });
      pp.forEach(function (p) {
        p.hidden = p.id !== b.dataset.p;
      });
    });
  });

  var cart = document.getElementById("cart"),
    n = 0;
  document.querySelectorAll(".add").forEach(function (b) {
    b.addEventListener("click", function () {
      n++;
      cart.textContent = n + (n > 1 ? " articles ajoutés" : " article ajouté") + " au panier.";
    });
  });

  var tabs = document.querySelectorAll(".tabs button");
  tabs.forEach(function (b) {
    b.addEventListener("click", function () {
      tabs.forEach(function (x) {
        x.setAttribute("aria-pressed", x === b);
      });
      document.querySelectorAll(".tile").forEach(function (t) {
        t.hidden = b.dataset.f !== "all" && t.dataset.t !== b.dataset.f;
      });
    });
  });

  var form = document.getElementById("exh-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("exh-msg").textContent = "Merci ! Votre demande a bien été envoyée.";
      form.reset();
    });
  }
})();

(function () {
  var header = document.querySelector("header"),
    btn = document.querySelector(".menu-btn");
  if (!btn) return;

  function set(open) {
    header.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }
  btn.addEventListener("click", function () {
    set(!header.classList.contains("open"));
  });
  document.querySelectorAll("nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      set(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") set(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1000) set(false);
  });
})();