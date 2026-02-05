import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiUser, FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import { fetchUserById } from '../api/userApi';
import { getAssetUrl } from '../config/api';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserById(id)
      .then((res) => setUser(res.data))
      .catch((err) => {
        toast.error(err.message || 'Failed to load user');
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  const profileUrl = getAssetUrl(user.profile) || null;
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  const DetailRow = ({ label, value }) => (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-gray-900">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-gray-200 text-gray-600"
          aria-label="Back"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">User Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="flex-shrink-0">
              {profileUrl ? (
                <img
                  src={profileUrl}
                  alt={fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-900">{fullName || 'No name'}</h2>
              <p className="text-gray-600">{user.email}</p>
              <Link to={`/users/${id}/edit`} className="mt-3 inline-block">
                <Button variant="secondary" className="gap-2">
                  <FiEdit2 className="w-4 h-4" />
                  Edit User
                </Button>
              </Link>
            </div>
          </div>

          <dl className="divide-y divide-gray-100">
            <DetailRow label="First Name" value={user.firstName} />
            <DetailRow label="Last Name" value={user.lastName} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Mobile" value={user.mobile} />
            <DetailRow label="Gender" value={user.gender} />
            <DetailRow
              label="Status"
              value={
                <span
                  className={`inline-flex px-2 py-0.5 rounded text-sm font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.status}
                </span>
              }
            />
            <DetailRow label="Location" value={user.location} />
          </dl>
        </div>
      </div>
    </div>
  );
}
