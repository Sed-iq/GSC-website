const modal = document.querySelector("#modal");
const closebtn = document.getElementById("close");

modal.addEventListener("click", (event) => {
  if (event.target.id == "modal") {
    modal.style.display = "none";
  }
});

closebtn.addEventListener("click", (event) => {
  modal.style.display = "none";
});
