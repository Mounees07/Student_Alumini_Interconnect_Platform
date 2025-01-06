import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaExternalLinkAlt } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleViewAlumniClick = () => {
    navigate(`/officebearer/${job.companyname}`);
  };

  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">{job.companyname}</h5>
        <p className="text-slate-600 leading-normal font-light mb-2">
          <strong>Role:</strong> {job.role}
        </p>
        <p className="text-slate-600 leading-normal font-light mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-slate-600 leading-normal font-light mb-2">
          <strong>Required Skills:</strong> {job.requireskills}
        </p>
        <p className="text-slate-600 leading-normal font-light mb-2">
          <strong>Course:</strong> {job.coursespecialization}
        </p>
        <p className="text-slate-600 leading-normal font-light mb-4">{job.description}</p>
        <p className="text-slate-500 text-sm mb-4">Posted on: {formatDate(job.createdAt)}</p>

        <div className="flex justify-between items-center">
          <button
            className="rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleViewAlumniClick}
          >
            View Alumni
          </button>
          {job.websiteUrl && (
            <a
              href={job.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 transition-all hover:underline flex items-center"
            >
              Visit <FaExternalLinkAlt className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
