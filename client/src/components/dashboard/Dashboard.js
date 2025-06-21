import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentUserProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../Layout/Spinner';


const Dashboard = ({
  getCurrentUserProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]); // ✅ Add dependency to avoid warning

  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead" style={{ fontFamily: 'Arial, sans-serif' }}>
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>

      {profile !== null ? (
        <Fragment>
          {/* ✅ You can render actual profile dashboard here */}
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fa fa-user-minus"></i>Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You’ve not yet set up a profile. Please add some info.</p>
          <Link to="/create-profile" className="btn btn-primary my-1"> 
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile, deleteAccount })(Dashboard);
