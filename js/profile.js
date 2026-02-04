document.addEventListener("DOMContentLoaded", function () {
  // --- Mengisi dropdown tanggal lahir ---
  function populateDateDropdowns() {
    const daySelect = document.getElementById("birth-day");
    const monthSelect = document.getElementById("birth-month");
    const yearSelect = document.getElementById("birth-year");
    if (!daySelect || !monthSelect || !yearSelect) return;

    daySelect.innerHTML = "<option selected disabled>Tanggal</option>";
    monthSelect.innerHTML = "<option selected disabled>Bulan</option>";
    yearSelect.innerHTML = "<option selected disabled>Tahun</option>";

    for (let i = 1; i <= 31; i++) {
      daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    months.forEach((month, index) => {
      monthSelect.innerHTML += `<option value="${index + 1}">${month}</option>`;
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
  }
  populateDateDropdowns();

  // --- Interaksi antar modal login & register ---
  const loginModalEl = document.getElementById("loginModal");
  const registerModalEl = document.getElementById("registerModal");

  if (loginModalEl && registerModalEl) {
    const loginModal = new bootstrap.Modal(loginModalEl);
    const registerModal = new bootstrap.Modal(registerModalEl);

    loginModalEl.addEventListener("show.bs.modal", () => {
      registerModal.hide();
    });
    registerModalEl.addEventListener("show.bs.modal", () => {
      loginModal.hide();
    });
  }
});
