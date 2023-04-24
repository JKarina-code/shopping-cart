const cart = document.querySelector("#cart");
const contentCart = document.querySelector("#list-cart tbody");
const emptyCarBtn = document.querySelector("#empty-cart");
const listCourses = document.querySelector("#list-courses");

let cartItems = [];

loadEventListeners();
function loadEventListeners() {
  listCourses.addEventListener("click", addCourse);
  cart.addEventListener("click", deleteCourse);
  emptyCarBtn.addEventListener("click", () => {
    cartItems = [];
    cleanHTML();
  });
}

function addCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-cart")) {
    const course = e.target.parentElement.parentElement;
    readData(course);
  }
}

function readData(course) {
  const infoCourse = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price  span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
    amount: 1,
  };

  if (cartItems.some((course) => course.id === infoCourse.id)) {
    const courses = cartItems.map((course) => {
      if (course.id === infoCourse.id) {
        course.amount++;
        return course;
      } else {
        return course;
      }
    });

    cartItems = [...courses];
  } else {
    cartItems = [...cartItems, infoCourse];
  }

  cartHTML();
}

function deleteCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete-course")) {
    const courseId = e.target.getAttribute("data-id");
    cartItems = cartItems.filter((course) => course.id !== courseId);

    cartHTML();
  }
}

function cartHTML() {
  cleanHTML();
  cartItems.forEach((course) => {
    const { image, title, price, amount, id } = course;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <image src="${image}" width="100"></image>
    </td>
    <td>${title}</td>
    <td>${price}</td>
    <td>${amount}</td>
    <td>
    <a href='#' class='delete-course' data-id= '${id}'> X</a>
    </td>
`;

    contentCart.appendChild(row);
  });
}

function cleanHTML() {
  while (contentCart.firstChild) {
    contentCart.removeChild(contentCart.firstChild);
  }
}
