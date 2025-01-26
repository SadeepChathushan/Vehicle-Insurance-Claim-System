import React, { useState  , useEffect} from 'react';
import AdminProfileService from '../../services/adminService';

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
  const [avatarPreview, setAvatarPreview] = useState('https://images.unsplash.com/photo-1595152772830-6e55b6d4788e');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const user = JSON.parse(localStorage.getItem('user')); // Retrieve stored user data
  const adminId = user?.adminId; // Safely access adminId





  // Fetch profile details from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {

       
      if (!adminId) {
        setError('Admin ID is missing.');
        return;
      }
        const data = await AdminProfileService.getAdminProfile(adminId);

        console.log("Use effect");

        // Map the data to the formData structure
        setFormData({
          name: data.data.name,
          city: data.data.city,
          address: data.data.address,
          dob: new Date(data.data.dob).toISOString().split('T')[0], // Format DOB for input[type="date"]
          email: data.data.email,
          contactNumber: data.data.contact,
          employeeId: adminId,
          nic: data.data.nic,
          role: data.data.role,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } catch (err) {
        setError('Failed to fetch profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [adminId]);







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


    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-1xl flex">
        <div className="text-center mr-8"> {/* Add margin to the right */}
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-gray-300 mx-auto"> {/* Circular container */}
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full object-cover" // Ensures the image covers the circular space
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
          <h2 className="text-2xl font-semibold mt-4">{formData.name}</h2>
          <p className="text-sm text-gray-500">Update your profile details</p>
        </div>

        <div className="flex-grow"> {/* Allow this section to take remaining space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="Name"
                value={formData.name}
                disabled 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
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
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-medium">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
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
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

          </div>

          <h3 className="text-lg font-medium mt-6">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
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
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
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
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                autoComplete="new-password" // Prevent browser autofill

              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600"
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
