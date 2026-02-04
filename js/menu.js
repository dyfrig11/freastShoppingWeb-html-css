document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeBtn = document.getElementById("closeBtn");

  // Buka menu
  menuBtn.addEventListener("click", function () {
    sidebarMenu.style.width = "250px"; // sesuaikan lebar
  });

  // Tutup menu
  closeBtn.addEventListener("click", function () {
    sidebarMenu.style.width = "0";
  });
});
