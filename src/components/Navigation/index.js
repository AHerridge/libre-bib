import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import M from 'materialize-css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

class NavigationAuth extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }

  render() {
    const { authUser } = this.props;

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={ROUTES.LANDING} className="brand-logo">
              Libre Bib
            </Link>
            <a
              href="#"
              data-target="mobile-demo"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
              menu
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to={ROUTES.HOME}>
                  <i className="material-icons left">home</i>
                  Home
                </Link>
              </li>
              {/* <li>
                <Link to="/browse">Browse</Link>
              </li> */}
              <li>
                <Link to="/scan">
                  <i className="material-icons left">search</i>
                  Search
                </Link>
              </li>
              {authUser.roles.includes(ROLES.ADMIN) && (
                <li>
                  <Link to={ROUTES.ADMIN}>
                    <i className="material-icons left">
                      verified_user
                    </i>
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <a href="#">
                  <i className="material-icons left">portrait</i>
                  {authUser.username}
                </a>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
          </div>
        </nav>

        {/* <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/scan">
              Scan<i className="material-icons">more_vert</i>
            </Link>
          </li>
          {authUser.roles.includes(ROLES.ADMIN) && (
            <li>
              <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
          )}
          <li>
            {authUser.username}
            <i className="material-icons">portrait</i>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul> */}
      </div>
    );
  }
}

const NavigationNonAuth = () => (
  <nav>
    <div className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Libre-Bib
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
