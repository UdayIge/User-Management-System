import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiDownload,
  FiUser,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  exportUsersToCsv,
} from "../api/userApi";
import { getAssetUrl } from "../config/api";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import PageHeader from "../components/ui/PageHeader";
import UserActionMenu from "../components/users/UserActionMenu";
import StatusSelect from "../components/users/StatusSelect";
import toast from "react-hot-toast";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers({ page, limit: 8, search: searchTerm });
      setUsers(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      loadUsers();
    } catch (err) {
      toast.error(err.message || "Failed to delete user");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportUsersToCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `users-export-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Export completed");
    } catch (err) {
      toast.error(err.message || "Failed to export");
    } finally {
      setExporting(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      await updateUser(userId, formData);
      toast.success("Status updated");
      loadUsers();
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="User Listing">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 w-40 md:w-48"
          />
          <Button type="submit" variant="primary">
            <FiSearch className="w-4 h-4" />
            Search
          </Button>
        </form>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleExport} disabled={exporting}>
            <FiDownload className="w-4 h-4" />
            Export To Csv
          </Button>
          <Link to="/users/add">
            <Button variant="primary">
              <FiPlus className="w-4 h-4" />
              Add User
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No users found.{" "}
            <Link to="/users/add" className="text-rose-600 hover:underline">
              Add a user
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Sr.No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      FullName
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Profile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {index + 1 + (pagination?.page - 1 || 0) * 10}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user._id?.slice(-6)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>{user.mobile || "-"}</span>
                          {user.mobile && user.verified && (
                            <svg
                              className="w-4 h-4 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              title="Verified"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {user.gender?.[0] || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusSelect
                          value={user.status}
                          onChange={(val) => handleStatusChange(user._id, val)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        {user.profile ? (
                          <img
                            src={getAssetUrl(user.profile)}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-00 text-xs">
                            <FiUser className="w-6 h-6 " />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <UserActionMenu
                          onView={() => navigate(`/users/${user._id}`)}
                          onEdit={() => navigate(`/users/${user._id}/edit`)}
                          onDelete={() => handleDelete(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200">
                <Button
                  variant="primary"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <FiArrowLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="primary"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
