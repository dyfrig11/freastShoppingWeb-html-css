document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productNodes = Array.from(
    productsGrid.querySelectorAll(".product-card")
  ).map((el) => el.closest(".col-12"));
  // keep original order
  const originalNodes = productNodes.slice();

  // controls
  const searchInput = document.getElementById("searchInput");
  const catCheckboxes = Array.from(document.querySelectorAll(".cat-filter"));
  const typeRadios = Array.from(
    document.querySelectorAll('input[name="typeFilter"]')
  );
  const stockRadios = Array.from(
    document.querySelectorAll('input[name="stockFilter"]')
  );
  const sizeButtons = Array.from(document.querySelectorAll(".size-btn"));
  const clearSize = document.getElementById("clearSize");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const resetFilters = document.getElementById("resetFilters");
  const sortSelect = document.getElementById("sortSelect");

  // init price range max
  let maxPrice = Math.max(
    ...originalNodes.map((n) =>
      parseInt(n.querySelector(".product-card").dataset.price || 0)
    )
  );
  if (isNaN(maxPrice) || maxPrice <= 0) maxPrice = 1000000;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = formatRupiah(priceRange.value);

  // helper
  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID").format(Number(num));
  }

  function getActiveCategories() {
    return catCheckboxes.filter((c) => c.checked).map((c) => c.value);
  }
  function getActiveSize() {
    const active = sizeButtons.find((b) => b.classList.contains("active"));
    return active ? active.dataset.size : null;
  }
  function getTypeFilter() {
    return typeRadios.find((r) => r.checked).value;
  }
  function getStockFilter() {
    return stockRadios.find((r) => r.checked).value;
  }

  // apply filters + sort
  function applyFilters() {
    let nodes = originalNodes.slice();

    const q = searchInput.value.trim().toLowerCase();
    const cats = getActiveCategories();
    const size = getActiveSize();
    const type = getTypeFilter();
    const stock = getStockFilter();
    const priceMax = Number(priceRange.value);
    const sort = sortSelect ? sortSelect.value : "featured";

    // filter
    nodes = nodes.filter((col) => {
      const card = col.querySelector(".product-card");
      const name = (card.dataset.name || "").toLowerCase();
      const category = (card.dataset.category || "").toLowerCase();
      const instock = card.dataset.instock === "true";
      const sizes = (card.dataset.sizes || "")
        .split(",")
        .map((s) => s.trim().toUpperCase());
      const price = Number(card.dataset.price) || 0;
      const featured = card.dataset.featured === "true";

      // search text
      if (q && !name.includes(q)) return false;

      // category
      if (cats.length > 0 && !cats.includes(category)) return false;

      // type featured
      if (type === "featured" && !featured) return false;

      // stock
      if (stock === "instock" && !instock) return false;

      // size
      if (size && !sizes.includes(size)) return false;

      // price
      if (price > priceMax) return false;

      return true;
    });

    // sort
    nodes.sort((a, b) => {
      const A = a.querySelector(".product-card");
      const B = b.querySelector(".product-card");
      const pa = Number(A.dataset.price || 0);
      const pb = Number(B.dataset.price || 0);

      if (sort === "low") return pa - pb;
      if (sort === "high") return pb - pa;
      if (sort === "new") return 0;
      // featured: keep original order but bring featured first
      if (sort === "featured") {
        const fa = A.dataset.featured === "true";
        const fb = B.dataset.featured === "true";
        if (fa === fb) return 0;
        return fa ? -1 : 1;
      }
      return 0;
    });

    // render
    productsGrid.innerHTML = "";
    nodes.forEach((n) => productsGrid.appendChild(n));
  }

  // events
  searchInput.addEventListener("input", debounce(applyFilters, 220));
  catCheckboxes.forEach((c) => c.addEventListener("change", applyFilters));
  typeRadios.forEach((r) => r.addEventListener("change", applyFilters));
  stockRadios.forEach((r) => r.addEventListener("change", applyFilters));
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });
  clearSize.addEventListener("click", () => {
    sizeButtons.forEach((b) => b.classList.remove("active"));
    applyFilters();
  });
  priceRange.addEventListener("input", () => {
    priceValue.textContent = formatRupiah(priceRange.value);
    applyFilters();
  });
  resetFilters.addEventListener("click", () => {
    // reset UI
    searchInput.value = "";
    catCheckboxes.forEach((c) => (c.checked = false));
    document.querySelector(
      'input[name="typeFilter"][value="all"]'
    ).checked = true;
    document.querySelector(
      'input[name="stockFilter"][value="all"]'
    ).checked = true;
    sizeButtons.forEach((b) => b.classList.remove("active"));
    priceRange.value = priceRange.max;
    priceValue.textContent = formatRupiah(priceRange.value);
    sortSelect.value = "featured";
    applyFilters();
  });
  sortSelect.addEventListener("change", applyFilters);

  // utils
  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // initial render (ensure DOM order preserved)
  applyFilters();
});
