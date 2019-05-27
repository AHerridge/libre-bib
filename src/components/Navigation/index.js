import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import M from 'materialize-css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => <NavigationAuth authUser={authUser} />}
  </AuthUserContext.Consumer>
);

class NavigationAuth extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }

  render() {
    const { authUser } = this.props;

    let links = null;

    if (authUser) {
      links = (
        <Fragment>
          <li>
            <Link to={ROUTES.HOME}>
              <i className="material-icons left">home</i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/scan">
              <i className="material-icons left">search</i>
              Search
            </Link>
          </li>
          {authUser.roles && authUser.roles.includes(ROLES.ADMIN) && (
            <li>
              <Link to={ROUTES.ADMIN}>
                <i className="material-icons left">verified_user</i>
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
        </Fragment>
      );
    } else {
      links = (
        <Fragment>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
        </Fragment>
      );
    }

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
              {links}
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          {links}
        </ul>
      </div>
    );
  }
}

export default Navigation;
