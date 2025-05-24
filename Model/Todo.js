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
    } catch (error) {
      console.log("Error while posting data: ", error);
    }
  }

  async deleteData(id) {
    try {
      const isConfirm = confirm(`Apakah Anda yakin ingin menghapus task `);

      if (isConfirm) {
        const deleteData = await fetch(
          `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`,
          {
            method: "DELETE",
          }
        );

        console.log("Data yang ingin dihapus: ", deleteData);

        if (deleteData.ok) {
          alert(`Task berhasil dihapus`);
        } else {
          alert(`Task gagal dihapus: ${deleteData.status}`);
        }
      }
    } catch (error) {
      console.log("Error while deleting data: ", error);
    }
  }

  async editData(id) {
    try {
      const data = await fetch(
        `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`
      );

      console.log(`cheking id: `, id);

      if (!data.ok) {
        throw new Error(`Error while fetch data user: ${data.status}`);
      }

      const updateDate = await user.json();
      document.getElementById("modal_title").value = updateDate.title;
      document.getElementById("modal_description").value =
        updateDate.description;
      document.getElementById("modal_is_completed").value =
        updateDate.is_completed;
      document.getElementById("modal_due_date").value = updateDate.dueDate;
    } catch (error) {
      console.error("Error while updating user data: ", error);
    }
  }
}

export { Todo };
