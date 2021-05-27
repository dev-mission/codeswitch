import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header() {
  const history = useHistory();
  const { user, setUser } = useAuthContext();

  useEffect(function () {
    Api.users.me()
      .then(response => {
        if (response.status === 204) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      });
  }, [setUser]);

  const onLogout = async function (event) {
    event.preventDefault();
    await Api.auth.logout();
    setUser(null);
    history.push('/');
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-md navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand logo-show" to="/"><i class="fas fa-code"></i> <h1>codeswitch</h1></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav flex-grow-1 mb-2 mb-md-0">
            <div className="flex-grow-1 d-flex justify-content-end">
              <li className="nav-item">
                <a href="mentors.html">MENTORS</a>
              </li>
              <li className="nav-item">
                <a href="aboutUs.html">ABOUT US</a>
              </li>
              <li className="nav-item">
                <a href="events.html">EVENTS</a>
              </li>
              <li className="nav-item">
                <a href="requests.html">REQUESTS</a>
              </li>
              {user && (
                <li className="nav-item">
                  <a className="login-button" href="/logout" onClick={onLogout}>LOG OUT</a>
                </li>)}
              {!user && (
                <li className="nav-item">
                  <Link className="login-button" to="/login">LOG IN</Link>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

/**
 * taken out from line 38
 *  <li className="nav-item active">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
 */
