import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile }) => {
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
    if (status === '0') {
      alert('Please select a valid professional status.');
      return;
    }
    createProfile(formData, navigate);
  };

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your profile stand out
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
          <small className="form-text">Company or personal site</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          <small className="form-text">City & state suggested (e.g., Boston, MA)</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
          <small className="form-text">Comma-separated (e.g., HTML,CSS,JS)</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="GitHub Username" name="githubusername" value={githubusername} onChange={onChange} />
          <small className="form-text">Include to pull GitHub repos</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
          <small className="form-text">Tell us something about you</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
