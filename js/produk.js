// Ganti gambar utama saat thumbnail diklik
function changeImage(img) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = img.src;
}

// Optional: buka modal besar saat klik gambar utama
document.getElementById("mainImage").addEventListener("click", function () {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.8)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "1050";

  const img = document.createElement("img");
  img.src = this.src;
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  img.style.borderRadius = "8px";
  img.style.boxShadow = "0 4px 15px rgba(0,0,0,0.5)";

  // Tutup modal saat diklik
  modal.addEventListener("click", () => modal.remove());

  modal.appendChild(img);
  document.body.appendChild(modal);
});
