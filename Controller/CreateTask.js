import { Todo } from "../Model/Todo.js";

const todoManajer = new Todo();

const createForm = document.getElementById("create_form");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
});

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoManajer.postData();

  createForm.reset();
});
