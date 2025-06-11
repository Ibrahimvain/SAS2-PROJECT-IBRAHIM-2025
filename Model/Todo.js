class Todo {
  constructor() {}

  async getData() {
    try {
      const data = await fetch(
        "https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());

      console.log("Get Data: ", data);

      return data;
    } catch (error) {
      console.log("Error while getting data: ", error);
    }
  }

  async postData() {
    try {
      const response = await fetch(
        "https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            dueDate: document.getElementById("due_date").value,
            is_completed: document.getElementById("is_completed").value,
          }),
        }
      );

      alert("Create data successfully");

      window.location.href = "all-tasks.html";
    } catch (error) {
      console.log("Error while posting data: ", error);
    }
  }

  async deleteData(id, title) {
    try {
      const isConfirm = confirm(
        `Apakah Anda yakin ingin menghapus task ${title}? `
      );

      if (isConfirm) {
        const deleteData = await fetch(
          `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`,
          {
            method: "DELETE",
          }
        );

        console.log("Data yang ingin dihapus: ", deleteData);

        if (deleteData.ok) {
          alert(`Task ${title} berhasil dihapus!`);
        }
      } else {
        alert(`Task ${title} batal dihapus!`);
      }
    } catch (error) {
      console.log("Error while deleting data: ", error);
    }
  }

  async fetchData(id) {
    try {
      const response = await fetch(
        `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`
      );

      if (!response.ok) {
        throw new Error(`Error while fetching data: ${response.status}`);
      }

      const data = await response.json();

      // Isi form dengan data yang ada
      document.getElementById("modal_title").value = data.title;
      document.getElementById("modal_description").value = data.description;
      document.getElementById("modal_is_completed").value = data.is_completed;
      document.getElementById("modal_due_date").value = data.dueDate;

      return data;
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  }

  async editData(id, updatedData) {
    try {
      const response = await fetch(
        `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error while updating data: ${response.status}`);
      }

      const result = await response.json();
      console.log("Data berhasil diperbarui: ", result);
      alert("update data successfully");
      return result;
    } catch (error) {
      console.error("Error while updating data: ", error);
    }
  }
}

export { Todo };
