import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaEdit, FaSave, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', {
      withCredentials: true,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setProfile({ name: data.name, email: data.email });
        setLoading(false);
      })
      .catch(() => {
        navigate('/login'); // Redirect to login if not authenticated
      });
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save profile changes to backend
      fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profile),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Update failed');
          return res.json();
        })
        .then((data) => {
          alert('Profile updated!');
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to update profile');
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          navigate('/login');
        }
      })
      .catch((err) => console.error('Logout error:', err));
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 text-center">
        <FaUserCircle className="text-7xl text-orange-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
        <p className="text-gray-600 mb-4">{profile.email}</p>

        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center border rounded p-2">
              <FaUserCircle className="mr-2 text-gray-500" />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            <button
              onClick={handleEditToggle}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <FaSave className="inline-block mr-2" />
              Save
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={handleEditToggle}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
            >
              <FaEdit className="inline-block mr-2" />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
