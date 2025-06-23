import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => {
  const {
    status,
    company,
    location,
    skills,
    user
  } = profile;

  const name = user?.name || 'Deleted User';
  const avatar = user?.avatar || '/default.jpeg';
  const id = user?._id || '#';

  return (
    <div className="profile bg-light">
      <img src={avatar} alt="avatar" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
        {location && <p className="my-1">{location}</p>}
        {user && (
          <Link to={`/profile/${id}`} className="btn btn-primary">
            View Profile
          </Link>
        )}
        <ul>
          {skills?.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check" /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
