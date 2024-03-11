const categoryAddBtn = document.querySelector(".Addbtn");
const categoryList = document.querySelector(".catList");

categoryAddBtn.addEventListener("click", () => {
  window.location.href = "/categories/create/";
});

categoryList.addEventListener("click", (event) => {
  if (!event.target.id) {
    return;
  }
  const id = event.target.id;
  if (event.target.className === "editBtn") {
    window.location.href = `/categories/update/${id}`;
  } else {
    window.location.href = `/categories/delete/${id}`;
  }
});
