```javascript
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.querySelector(".navbar");
    const headerButtons = document.querySelector(".header-buttons");
    const emailForm = document.getElementById("emailForm");
    const emailInput = document.getElementById("email");
    const formMessage = document.getElementById("formMessage");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            const isOpen = navbar.classList.toggle("active");

            menuBtn.classList.toggle("active", isOpen);
            menuBtn.setAttribute("aria-expanded", String(isOpen));

            if (headerButtons) {
                headerButtons.classList.toggle("active", isOpen);
            }
        });

        navbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

                if (headerButtons) {
                    headerButtons.classList.remove("active");
                }
            });
        });

        document.addEventListener("click", function (event) {
            const clickedInsideNavbar = navbar.contains(event.target);
            const clickedMenuButton = menuBtn.contains(event.target);

            if (!clickedInsideNavbar && !clickedMenuButton) {
                navbar.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

                if (headerButtons) {
                    headerButtons.classList.remove("active");
                }
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navbar.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

                if (headerButtons) {
                    headerButtons.classList.remove("active");
                }
            }
        });
    }

    if (emailForm && emailInput && formMessage) {
        emailForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();

            if (!email) {
                formMessage.textContent = "Email manzilingizni kiriting.";
                return;
            }

            if (!emailInput.checkValidity()) {
                formMessage.textContent = "Email manzilini to'g'ri kiriting.";
                emailInput.focus();
                return;
            }

            formMessage.textContent =
                "Rahmat! Email manzilingiz qabul qilindi.";

            emailForm.reset();
        });

        emailInput.addEventListener("input", function () {
            formMessage.textContent = "";
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", href);
            }
        });
    });

    document.querySelectorAll(".product-card .learn-more").forEach(
        function (button) {
            button.addEventListener("click", function (event) {
                const href = button.getAttribute("href");

                if (href === "#") {
                    event.preventDefault();

                    const productName =
                        button.closest(".product-card")
                            ?.querySelector("h3")?.textContent;

                    if (productName) {
                        const message =
                            productName + " — batafsil ma'lumot tez orada.";

                        let notice = document.querySelector(".product-notice");

                        if (!notice) {
                            notice = document.createElement("p");
                            notice.className = "product-notice";
                            notice.setAttribute("role", "status");
                            notice.style.textAlign = "center";
                            notice.style.padding = "15px";
                            notice.style.color = "#344477";

                            button.closest(".product-card")
                                .appendChild(notice);
                        }

                        notice.textContent = message;
                    }
                }
            });
        }
    );

    const footerLinks = document.querySelectorAll(".footer a");

    footerLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            link.style.transition = "color 0.3s ease";
        });
    });
});
```