import { Todo } from "../Model/Todo.js";

const todoManajer = new Todo();

const tableBody = document.querySelector("#todo_table tbody");

const updateForm = document.getElementById("update_form");

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

        deleteData(data.id);
      });
  });
}

async function deleteData(id) {
  await todoManajer.deleteData(id);

  renderData();
}

async function editData(id) {
  updateForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const newName = document.getElementById("newName").value;
      const newJob = document.getElementById("newJob").value;

      if (!newName || !newJob) {
        throw new Error("Name and Job are required");
        return;
      }

      try {
        const response = await fetch(
          `https://68258f1d0f0188d7e72d6675.mockapi.io/api/users/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newName,
              job: newJob,
            }),
          }
        );

        console.log(`Chekiing id: `, id);

        if (!response.ok) {
          throw new Error("Error while updating user data: ", response.status);
        }

        const updatedData = await response.json();

        console.log("Data berhasil diupdate: ", updatedData);
        alert("Data berhasil diperbarui");
        updateForm.reset();
        renderUser();
      } catch (error) {
        console.error("Error while updating user data: ", error);
      }
    },
    { once: true }
  );
}
