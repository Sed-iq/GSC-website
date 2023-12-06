const modal = document.getElementById("modal");
const modalUnder = document.getElementById("modal-under"); // White spot

modal.addEventListener("click", (event) => {
  if (event.target.id == "modal") {
    modal.style.display = "none";
  }
});
function callModal() {
  modal.style.display = "flex";
}
