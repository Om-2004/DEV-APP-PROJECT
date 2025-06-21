import React, { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentUserProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentUserProfile
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

useEffect(() => {
  getCurrentUserProfile();
}, [getCurrentUserProfile]);

useEffect(() => {
  if (!loading && profile) {
    setFormData({
      company: profile.company || '',
      website: profile.website || '',
      location: profile.location || '',
      status: profile.status || '',
      skills: profile.skills ? profile.skills.join(',') : '',
      githubusername: profile.githubusername || '',
      bio: profile.bio || '',
      twitter: profile.social?.twitter || '',
      facebook: profile.social?.facebook || '',
      linkedin: profile.social?.linkedin || '',
      youtube: profile.social?.youtube || '',
      instagram: profile.social?.instagram || '',
    });
  }
}, [loading, profile]);  

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's update your information
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Where are you in your career?</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          <small className="form-text">Your company or employer</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          <small className="form-text">Company/personal website</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          <small className="form-text">City & state suggested (e.g., Boston, MA)</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
          <small className="form-text">Use comma separated values (e.g., HTML,CSS,JS)</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="GitHub Username" name="githubusername" value={githubusername} onChange={onChange} />
          <small className="form-text">To pull in GitHub repos</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio" name="bio" value={bio} onChange={onChange}></textarea>
          <small className="form-text">Tell us something about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentUserProfile })(EditProfile);
