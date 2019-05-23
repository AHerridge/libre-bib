import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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

const NavigationAuth = ({ authUser }) => (
  <nav>
    <div className="nav-wrapper">
      <div className="container">
        <Link to={ROUTES.LANDING} className="brand-logo">
          Libre-Bib
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/scan">Scan</Link>
          </li>
          {!!authUser.roles[ROLES.ADMIN] && (
            <li>
              <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
          )}
          <li>{authUser.username}</li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

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
