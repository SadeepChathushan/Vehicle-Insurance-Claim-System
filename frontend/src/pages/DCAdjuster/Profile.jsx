import React, { useState  , useEffect} from 'react';
import dcAdService from '../../services/dcAdService';
import Actor from '../../assets/images/Actor2.jpg'

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    dob: '',
    email: '',
    contactNumber: '',
    employeeId:'',
    nic:'',
    role:'',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });



  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(Actor);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const user = JSON.parse(localStorage.getItem('user')); // Retrieve stored user data
  const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage!");
        return;
      }

  // Fetch profile details from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {

       
      if (!userId) {
        setError('User ID is missing.');
        return;
      }
        const data = await dcAdService.getProfile(userId);

        console.log("Use effect");

        console.log("Data received:", data.data);
setFormData({
  ...formData,
  name: data.data.name,
  city: data.data.city,
  address: data.data.address,
  dob: new Date(data.data.dob).toISOString().split('T')[0],
  email: data.data.email,
  contactNumber: data.data.contact,
  employeeId: userId,
  nic: data.data.nic,
  role: data.data.role,
});
      } catch (err) {
        setError('Failed to fetch profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);







  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    if (!formData.name || !formData.email) {
      alert("Name and email are required.");
      return;
    }

    console.log("Form Data:", formData);
    console.log("Avatar File:", avatar);
    alert("Profile updated successfully!");


    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="flex w-full p-6 bg-white rounded-lg shadow-lg max-w-1xl">
        <div className="mr-8 text-center"> {/* Add margin to the right */}
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="mx-auto overflow-hidden border-4 border-gray-300 rounded-full w-52 h-52"> {/* Circular container */}
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="object-cover w-full h-full" // Ensures the image covers the circular space
              />
            </div>
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            className="hidden" // Hide the input
            onChange={handleAvatarChange}
          />
          <h2 className="mt-4 text-2xl font-semibold">{formData.name}</h2>
          <p className="text-sm text-gray-500">Update your profile details</p>
        </div>

        <div className="flex-grow"> {/* Allow this section to take remaining space */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="Name"
                value={formData.name}
                disabled 
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled 
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium" >Role</label>
              <input
                type="text"
                name="role"
                disabled 
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>

          </div>

          <h3 className="mt-6 text-lg font-medium">Change Password</h3>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                autoComplete="new-password" // Prevent browser autofill

              />
            </div>
            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                autoComplete="new-password" // Prevent browser autofill

              />
            </div>
            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                autoComplete="new-password" // Prevent browser autofill

              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
