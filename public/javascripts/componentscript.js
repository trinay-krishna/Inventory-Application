const componentAddBtn = document.querySelector(".componentAdd");
const componentList = document.querySelector(".componentList");

componentAddBtn.addEventListener("click", (event) => {
  const id = event.target.id;
  window.location.href = `/component/${id}/create/`;
});

componentList.addEventListener("click", (event) => {
  if (!event.target.id) {
    return;
  }
  if (event.target.className !== "editBtn") {
    window.location.href = `/component/delete/${event.target.id}`;
  } else {
    const id = event.target.getAttribute("data-id");
    window.location.href = `/component/update/${id}`;
  }
});
