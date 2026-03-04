import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/api/categoryApi";
import type { Category } from "@/types/category";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

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
      toast.success('Category updated successfully')
    } else {
      await createCategory({ name, description });
      toast.success('Category Created Successfully.')
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

  // const handleDelete = async (id: string) => {
  //   await deleteCategory(id);
  //   fetchCategories();
  // };
  const handleDeleteClick = (id: string, name: string) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await deleteCategory(selectedCategoryId);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    } finally {
      setModalOpen(false);
      setSelectedCategoryId(null);
      setSelectedCategoryName(null);
    }
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

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{cat.name}</td>
              <td className="border border-gray-300 px-4 py-2">{cat.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2 flex">
                <button
                  className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                  onClick={() => handleEdit(cat)}
                >
                  <MdEdit />
                </button>
                {/* <button
            className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
            onClick={() => handleDelete(cat._id)}
          >
          <MdDelete />
          </button> */}
                <button
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                  onClick={() => handleDeleteClick(cat._id, cat.name)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
      <h3 className="text-lg font-semibold mb-4">
        Confirm Delete
      </h3>
      <p className="mb-6">
        Are you sure you want to delete category "{selectedCategoryName}"?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={confirmDelete}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CategoryManagement;