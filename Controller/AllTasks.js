import { Todo } from "../Model/Todo.js";

const todoManajer = new Todo();

const tableBody = document.querySelector("#todo_table tbody");

const updateForm = document.getElementById("update_form");
const newTitle = document.getElementById("modal_title");
const newDescription = document.getElementById("modal_description");
const newStatus = document.getElementById("modal_is_completed");
const newDueDate = document.getElementById("modal_due_date");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  renderData();
});

async function renderData() {
  const semuaDataTodo = await todoManajer.getData();

  tableBody.innerHTML = "";

  semuaDataTodo.forEach((data) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${data.id}</td>
      <td>${data.title}</td>
      <td>${data.description}</td>
      <td>${data.is_completed === "true" ? "Completed" : "Not Completed"}</td>
      <td>${data.dueDate}</td>
      <td>
      <button type="button" id="edit-${
        data.id
      }"data-bs-toggle="modal" data-bs-target="#detailModal" class="btn btn-warning">Edit</button>
      <button id="delete-${data.id}" class="btn btn-danger ">Delete</button>
      </td>
      `;

    tableBody.appendChild(tr);

    // window.location.href = "#bagian-bawah";

    document
      .getElementById(`edit-${data.id}`)
      .addEventListener("click", (e) => {
        e.preventDefault();

        editData(data.id);
      });

    document
      .getElementById(`delete-${data.id}`)
      .addEventListener("click", (e) => {
        e.preventDefault();

        deleteData(data.id, data.title);
      });
  });
}

async function deleteData(id, title) {
  await todoManajer.deleteData(id, title);

  renderData();
}

async function editData(id) {
  try {
    // Ambil data yang sudah ada terlebih dahulu
    await todoManajer.fetchData(id);

    // Siapkan penanganan pengiriman form
    updateForm.addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();

        const updatedData = {
          title: newTitle.value,
          description: newDescription.value,
          is_completed: newStatus.value,
          dueDate: newDueDate.value,
        };

        // Panggil editData dengan data yang diperbarui
        await todoManajer.editData(id, updatedData);

        // Segarkan data
        await renderData();

        // Reset form
        updateForm.reset();
      },
      { once: true }
    ); // Gunakan { once: true } untuk mencegah banyak listener
  } catch (error) {
    console.error("Error saat mengedit data: ", error);
  }
}
