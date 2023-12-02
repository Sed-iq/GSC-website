const selector = document.querySelector("#img-selector");
const file = document.querySelector("#file");
const img = document.querySelector("#profile-img");
const txt = document.querySelector("#action-txt");
const changeBtn = document.querySelector("#change");
selector.addEventListener("click", () => {
  file.click();
});
file.addEventListener("change", (event) => {
  const $file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL($file);
  reader.onload = (data) => {
    const src = data.target.result;
    selector.style.display = "none";
    img.style.display = "block";
    img.src = src;
    txt.style.display = "none";
    changeBtn.style.display = "block";
  };
});
changeBtn.addEventListener("click", () => file.click());
