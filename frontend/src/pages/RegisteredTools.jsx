import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Button, TextInput, Textarea, Modal } from 'flowbite-react';
import toast from 'react-hot-toast';
import ToolCard from '../components/ToolCard';

const RegisteredTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  // Edit modal state
  const [editingTool, setEditingTool] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Delete confirm state
  const [deletingTool, setDeletingTool] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      if (!currentUser) { setLoading(false); return; }
      try {
        const response = await fetch(`/api/tools/owned/${currentUser._id}`, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch tools');
        setTools(await response.json());
      } catch {
        toast.error('Error fetching tools. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, [currentUser]);

  const openEdit = (tool) => {
    setEditingTool(tool);
    setEditForm({ name: tool.name, description: tool.description, price: tool.price, max: tool.max });
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/tools/${editingTool._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setTools((prev) => prev.map((t) => t._id === editingTool._id ? { ...t, ...editForm } : t));
        toast.success('Tool updated!');
        setEditingTool(null);
      } else {
        toast.error(data.message || 'Failed to update tool');
      }
    } catch {
      toast.error('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/tools/${deletingTool._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setTools((prev) => prev.filter((t) => t._id !== deletingTool._id));
        toast.success('Tool deleted.');
        setDeletingTool(null);
      } else {
        toast.error(data.message || 'Failed to delete tool');
      }
    } catch {
      toast.error('An error occurred.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-left text-teal-600 dark:text-gray-400 mb-6">Registered Tools</h1>

      {tools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Registered Tools</h3>
          <p className="text-gray-500 dark:text-gray-400">Start sharing by adding your first tool!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool._id}
            title={tool.name}
            image={tool.image}
            description={tool.description}
            flatNumber={tool.owner?.flatNumber}
            primaryButtonText="Edit"
            primaryButtonAction={() => openEdit(tool)}
            secondaryButtonText="Delete"
            secondaryButtonAction={() => setDeletingTool(tool)}
          />
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={!!editingTool} onClose={() => setEditingTool(null)} size="md">
        <Modal.Header>Edit Tool</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tool Name</label>
              <TextInput value={editForm.name || ''} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <Textarea rows={3} value={editForm.description || ''} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹/day)</label>
                <TextInput type="number" min="0" value={editForm.price ?? 0} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Quantity</label>
                <TextInput type="number" min="1" value={editForm.max ?? 1} onChange={(e) => setEditForm({ ...editForm, max: e.target.value })} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditSave} isProcessing={saving} disabled={saving}>Save</Button>
          <Button color="gray" onClick={() => setEditingTool(null)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal show={!!deletingTool} onClose={() => setDeletingTool(null)} size="sm">
        <Modal.Header>Delete Tool</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete <strong>{deletingTool?.name}</strong>? This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDelete} isProcessing={deleting} disabled={deleting}>Delete</Button>
          <Button color="gray" onClick={() => setDeletingTool(null)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisteredTools;
