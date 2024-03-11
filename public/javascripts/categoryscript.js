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
    const idd = event.target.getAttribute("data-id");
    console.log("ID IS T", idd);
    window.location.href = `/categories/delete/${idd}`;
  }
});
