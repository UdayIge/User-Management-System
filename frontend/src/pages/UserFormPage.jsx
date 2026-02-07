import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { createUser, updateUser, fetchUserById } from "../api/userApi";
import { validateUserForm } from "../utils/validation";
import { getAssetUrl } from "../config/api";
import { userToFormData } from "../utils/formData";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "",
  status: "Active",
  location: "",
  verified: false,
};

const statusOptions = [
  { value: "Active", label: "Active", color: "green" },
  { value: "InActive", label: "InActive", color: "red" },
];

export default function UserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserById(id)
        .then((res) => {
          const u = res.data;
          setForm({
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            email: u.email || "",
            mobile: u.mobile || "",
            gender: u.gender || "",
            status: u.status || "Active",
            location: u.location || "",
            verified: u.verified || false,
          });
          if (u.profile) setProfilePreview(getAssetUrl(u.profile));
        })
        .catch((err) => {
          toast.error(err.message || "Failed to load user");
          navigate("/");
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    } else {
      setProfileFile(null);
      setProfilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      const formData = userToFormData(form, profileFile);
      if (isEdit) {
        await updateUser(id, formData);
        toast.success("User updated successfully");
      } else {
        await createUser(formData);
        toast.success("User created successfully");
      }
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Operation failed";
      const errs = err.response?.data?.errors;
      if (errs?.length) {
        const mapped = {};
        errs.forEach((e) => {
          mapped[e.field] = e.message;
        });
        setErrors(mapped);
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Register Your Details
        </h1>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-rose-600 flex items-center justify-center bg-gray-50">
            <FiUser className="w-8 h-8 text-rose-600" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First name"
              name="firstName"
              placeholder="Enter FirstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter LastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              className="md:col-span-2"
            />
            <div className="relative">
              <Input
                label="Mobile"
                name="mobile"
                placeholder="Enter Mobile (10-15 digits)"
                value={form.mobile}
                onChange={handleChange}
                error={errors.mobile}
              />
              {form.mobile && form.verified && (
                <div className="absolute right-3 top-9 flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-blue-500 font-medium">
                    Verified
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={form.gender === "Male"}
                    onChange={handleChange}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={form.gender === "Female"}
                    onChange={handleChange}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>
            <Select
              label="Select Your Status"
              name="status"
              options={statusOptions}
              value={form.status}
              onChange={handleChange}
              error={errors.status}
              required
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Profile
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-rose-700 file:text-white file:cursor-pointer hover:file:bg-rose-800"
                />
              </div>
              {profilePreview && (
                <div className="mt-2">
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                </div>
              )}
            </div>
            <Input
              label="Enter Your Location"
              name="location"
              placeholder="Enter Your Location"
              value={form.location}
              onChange={handleChange}
              error={errors.location}
              className="md:col-span-2"
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="w-full py-3"
            >
              {submitting ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
