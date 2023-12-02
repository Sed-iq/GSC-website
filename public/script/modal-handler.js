const modal = document.querySelector("#modal");
const closebtn = document.getElementById("close");

closebtn.addEventListener("click", (event) => {
  modal.style.display = "none";
});
