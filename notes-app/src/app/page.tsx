'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string>('');
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (dateFilter?: string) => {
    try {
      const { data } = await axios.get(dateFilter ? `${API_URL}?createdAt=${dateFilter}` : API_URL);
      if (data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNoResults(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  const handleEdit = (note: any) => {
    setForm(note);
    setEditId(note._id);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    fetchNotes(selectedDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-400 text-center mb-6">Personal Notes</h1>
        
        {/* Form to add/edit notes */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <label className="block text-lg text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg text-gray-700 font-semibold">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            {editId ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        {/* Filter by date within the list of notes */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-semibold">Filter by Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* "No results" message if there are no notes for the selected date */}
        {noResults && <p className="text-center text-red-500 mt-4">No notes found for the selected date.</p>}

        {/* List of notes */}
        <ul className="space-y-6">
          {notes.map((note: any) => (
            <li
              key={note._id}
              className="p-6 border border-gray-200 rounded-lg shadow-md flex justify-between items-start bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{note.title}</h2>
                <p className="text-gray-700 mt-2">{note.content}</p>
                <span className="text-sm text-gray-500 mt-4 block">
                  {new Date(note.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-sm bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-sm bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
