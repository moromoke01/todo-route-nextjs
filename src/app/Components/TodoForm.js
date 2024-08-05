import { useState, useEffect } from 'react';

const TodoForm = ({ initialData = {}, onSave }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || ''
  });

  useEffect(() => {
    setFormData({
      title: initialData.title || '',
      description: initialData.description || ''
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: '', description: '' }); // Reset form after saving
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 rounded-lg border"
        placeholder="Enter todo title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 mt-2 rounded-lg border"
        placeholder="Enter todo description"
      />
      <button type="submit" className="mt-2 py-2 px-5 bg-blue-500 text-white rounded-xl">
        Save
      </button>
    </form>
  );
};

export default TodoForm;
