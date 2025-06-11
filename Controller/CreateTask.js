import { Todo } from "../Model/Todo.js";

const todoManajer = new Todo();

const createForm = document.getElementById("create_form");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
});

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const is_completed = document.getElementById("is_completed").value;
  const due_date = document.getElementById("due_date").value;

  if (!title || !description || !is_completed || !due_date) {
    alert("Error: Title, description, status, due date are required!");
    return;
  }

  todoManajer.postData();
  createForm.reset();
});
