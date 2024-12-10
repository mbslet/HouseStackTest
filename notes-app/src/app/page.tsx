'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string>(''); // Estado para filtro por data
  const [noResults, setNoResults] = useState<boolean>(false); // Estado para verificar se há resultados

  useEffect(() => {
    fetchNotes(); // Chama a função para buscar as notas ao carregar a página
  }, []);

  const fetchNotes = async (dateFilter?: string) => {
    try {
      // Faz a requisição com o filtro de data, se houver
      const { data } = await axios.get(dateFilter ? `${API_URL}?createdAt=${dateFilter}` : API_URL);
      if (data.length === 0) {
        setNoResults(true); // Se não houver notas, seta a mensagem de "sem resultados"
      } else {
        setNoResults(false); // Se houver notas, remove a mensagem de "sem resultados"
      }
      setNotes(data); // Atualiza as notas no estado
    } catch (error) {
      console.error('Erro ao buscar as notas:', error);
      setNoResults(true); // Em caso de erro, também exibe a mensagem
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
    fetchNotes(); // Atualiza as notas após a criação ou edição
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes(); // Atualiza as notas após a exclusão
  };

  const handleEdit = (note: any) => {
    setForm(note);
    setEditId(note._id);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate); // Atualiza o estado do filtro
    fetchNotes(selectedDate); // Chama a função de busca com o filtro de data
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-400 text-center mb-6">Personal Notes</h1>
        
        {/* Formulário para adicionar/editar notas */}
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

        {/* Filtro por data dentro da lista de notas */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 font-semibold">Filter by Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mensagem de "sem resultados" se não houver notas para o filtro */}
        {noResults && <p className="text-center text-red-500 mt-4">No notes found for the selected date.</p>}

        {/* Lista de notas */}
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
