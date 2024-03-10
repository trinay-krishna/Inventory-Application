const categoryAddBtn = document.querySelector(".Addbtn");

categoryAddBtn.addEventListener("click", () => {
  console.log("clicked");
  window.location.href = "/categories/create/";
});
