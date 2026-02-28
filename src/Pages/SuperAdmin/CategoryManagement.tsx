import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/api/categoryApi";
import type { Category } from "@/types/category";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);
  const handleSubmit = async () => {
    if (editId) {
      await updateCategory(editId, { name, description });
    } else {
      await createCategory({ name, description });
    }
    setName("");
    setDescription("");
    setEditId(null);
    fetchCategories();
  };

  const handleEdit = (cat: Category) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="p-6 w-1/2 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </div>

      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat._id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <strong>{cat.name}</strong>
              <p>{cat.description}</p>
            </div>
            <div className="space-x-2">
              <button className="bg-green-500 px-2 py-1 rounded text-white" onClick={() => handleEdit(cat)}>Edit</button>
              <button className="bg-red-500 px-2 py-1 rounded text-white" onClick={() => handleDelete(cat._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;