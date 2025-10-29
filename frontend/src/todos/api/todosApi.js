import { BASE_URL } from "../../config/constants";

export const fetchTodoLists = async () => {
  try {
    const res = await fetch(BASE_URL)

    if (!res.ok) {
      console.error("Server returned error code: ", res.status);
      alert(`Error code: ${res.status}`)
      return {};
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error code: ", error)
    alert(`Error code: ${error}`)
    return {}
  }
}

export const updateTodosList = async (listId, todos) => {
  try {
      const res = await fetch(`${BASE_URL}/${listId}/todos`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(todos)
    })

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return true

  } catch (error) {
    console.error("Failed to save todos: ", error)
    return false
  }
}