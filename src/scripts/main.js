(function () {
  ("use strict");

  // ########################## AOS Animations ##############################
  AOS.init({
    once: true,
    duration: 500,
    offset: 100,
  });

  // ########################## Make External Svg Into Inline Svg ##########################
  let svgImages = document.querySelectorAll("img[data-src]");
  if (svgImages.length > 0) {
    SVGInjector(svgImages, {});
  }

  // ####################### Header Menu #########################
  const allPages = document.getElementById("all-pages");
  allPages.addEventListener("click", () => {
    const menu = document.getElementById("all-pages-dropdown");
    menu.classList.toggle("active");
  });

  // ####################### Brands Slider #########################
  new Swiper(".is-brands-slider", {
    centeredSlides: true,
    speed: 3000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: true,
    disableOnInteraction: true,
  });

  // ########################## Tab ##########################
  function setActiveTab(tabGroup, tabName) {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`,
    );
    selectedTabPane.classList.add("active");
  }
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const activeTabName = tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);
      });
    });
  });

  const tablist = document.querySelectorAll("[data-tab-nav] [data-tab]");
  function tabsHandler(event) {
    let index = Array.from(tablist).indexOf(this);
    let numbTabs = tablist.length;
    let nextId;
    if (numbTabs > 1) {
      if (event.key === "ArrowRight") {
        nextId = tablist[(index + 1) % numbTabs];
        if (index === numbTabs - 1) {
          nextId = tablist[0];
        }
        nextId.focus();
        nextId.click();
      }
      if (event.key === "ArrowLeft") {
        nextId = tablist[(index - 1 + numbTabs) % numbTabs];
        if (index === 0) {
          nextId = tablist[numbTabs - 1];
        }
        nextId.focus();
        nextId.click();
      }
    }
  }

  tablist.forEach(function (tab) {
    tab.addEventListener("keydown", tabsHandler);
  });

  // ########################## Accordion ##########################
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  // ########################## Modal ##############################
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });

  // ########################## TOGGLE Pricing Plans ##########################
  const billSwitch = document.getElementById("pricing-switch");

  if (billSwitch) {
    const monthlyText = document.getElementById("monthly");
    const yearlyText = document.getElementById("yearly");
    const monthlyPrices = document.querySelector("#monthly-card-container");
    const yearlyPrices = document.querySelector("#yearly-card-container");

    function togglePricing(e) {
      // check if the switch is checked
      let isYearly = e.target.checked;
      console.log("🪲 :", isYearly);
      if (isYearly) {
        // Switch to yearly
        monthlyText.style.color = "#9ea3bf";
        yearlyText.style.color = "#ffffff";
        monthlyPrices.style.display = "none";
        yearlyPrices.style.display = "block";
      } else {
        // Switch to monthly
        monthlyText.style.color = "#ffffff";
        yearlyText.style.color = "#9ea3bf";
        monthlyPrices.style.display = "block";
        yearlyPrices.style.display = "none";
      }
    }

    billSwitch.addEventListener("change", togglePricing);
  }

  // ########################## SHUFFLE FILTER ##########################
  const shuffleContainer = document.querySelector(".blog-shuffle-container");
  if (shuffleContainer) {
    const shuffle = new Shuffle(shuffleContainer, {
      itemSelector: ".blog-shuffle-item",
      sizer: ".blog-shuffle-sizer",
    });
    const filterButtons = document.querySelectorAll(".blog-category-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Remove 'active' class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add 'active' class to the clicked button
        e.currentTarget.classList.add("active");

        const filter = e.currentTarget.getAttribute("data-filter");
        if (filter === "all") {
          shuffle.filter();
        } else {
          shuffle.filter((element) => {
            const groups = element.getAttribute("data-groups");
            return groups.includes(filter);
          });
        }
      });
    });
  }
})();
