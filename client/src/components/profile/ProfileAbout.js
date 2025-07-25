import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fa fa-check"></i> {skill}
            </div>
          ))
        ) : (
          <p>No skills listed.</p>
        )}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
