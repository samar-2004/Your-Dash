import React, { useState, useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask, fetchTasks } = useTasks();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        setEditingTask(null);
      } else {
        await createTask(formData);
      }
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        dueDate: "",
        category: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      category: task.category || "",
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      dueDate: "",
      category: "",
    });
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
      })
    : [];

  if (loading && !tasks.length) return <div className="text-center text-gray-400">Loading tasks...</div>;
  if (error && !tasks.length) return <div className="text-center text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Tasks
        </h1>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-gray-300 focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-white font-medium shadow-lg"
          >
            + Create Task
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-300 flex justify-between items-center">
          <p>⚠️ {error}</p>
          <button
            onClick={fetchTasks}
            className="px-3 py-1 bg-red-600/80 hover:bg-red-700 transition rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Task Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-cyan-500 text-gray-100"
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter task description"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-cyan-500 text-gray-100"
                />
              </div>

              {/* Priority & Status */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-cyan-500 text-gray-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-cyan-500 text-gray-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Due Date & Category */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-cyan-500 text-gray-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Work, Personal"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-cyan-500 text-gray-100"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-white font-medium"
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">
            <p>
              No tasks found.{" "}
              {error ? "Please check your connection and try again." : "Create your first task!"}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={(taskId, newStatus) => updateTask(taskId, { status: newStatus })}
            />
          ))
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400 border-opacity-80"></div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
