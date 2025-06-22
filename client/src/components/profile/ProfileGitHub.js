import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getGitHubProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

const ProfileGitHub = ({ username, getGitHubProfiles, repos }) => {
  useEffect(() => {
    getGitHubProfiles(username);
  }, [getGitHubProfiles, username]); // ✅ include username as a dependency

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">GitHub Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              {repo.description && <p>{repo.description}</p>}
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGitHub.propTypes = {
  getGitHubProfiles: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGitHubProfiles })(ProfileGitHub);

