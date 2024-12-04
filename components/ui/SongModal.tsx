import React, { useState, useEffect } from 'react';

const SongModal = ({ isVisible, onClose, songDetails, isEdit, setIsRefresh }: any) => {
  if (!isVisible) return null;

  const [formReadOnly, setFormReadOnly] = useState(isEdit);
  const [title, setTitle] = useState(songDetails?.title || '');
  const [artist, setArtist] = useState(songDetails?.artist || '');
  const [lyrics, setLyrics] = useState(songDetails?.lyrics || '');
  const [saveDisplay, setSaveDisplay] = useState(false);

  // Validation function to check for empty fields
  const validateFields = () => {
    return title.trim() !== '' && artist.trim() !== '' && lyrics.trim() !== '';
  };

  async function handleSave() {
    if (!validateFields()) {
      alert('All fields must be filled!');
      return;
    }
    setIsRefresh(true);
    await fetch(`http://localhost:8080/songbook/${songDetails?._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        artist,
        lyrics,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
      alert('Changes saved');
      setFormReadOnly(true);
  }

  async function handleDelete() {
    await fetch(`http://localhost:8080/songbook/${songDetails?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async function handleCreate() {
    if (!validateFields()) {
      alert('All fields must be filled!');
      return;
    }
    setIsRefresh(true);
    await fetch(`http://localhost:8080/songbook/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        artist,
        lyrics,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
      alert('Song Created!');
      setFormReadOnly(true);
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white rounded-xl w-full max-w-4xl flex flex-col shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit Song' : 'Create Song'}</h2>
        <form className="w-full space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required={true}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly={formReadOnly}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="artist" className="text-gray-700 font-medium">
              Artist
            </label>
            <input
              id="artist"
              name="artist"
              type="text"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly={formReadOnly}
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="lyrics" className="text-gray-700 font-medium">
              Lyrics
            </label>
            <textarea
              id="lyrics"
              name="lyrics"
              rows={8}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly={formReadOnly}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
            />
          </div>
        </form>
        <div className="flex space-x-4 mt-6">
          {isEdit && saveDisplay && (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </button>
          )}
          {isEdit && (
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all"
              onClick={() => {
                setFormReadOnly(false);
                setSaveDisplay(true);
              }}
            >
              Edit
            </button>
          )}
          {!isEdit && (
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
              onClick={() => {
                handleCreate();
              }}
            >
              Create
            </button>
          )}
          {isEdit && (
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
              onClick={() => {
                handleDelete();
                alert('Song Deleted');
                window.location.reload();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongModal;
