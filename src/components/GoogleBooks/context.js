import React from 'react';

const GoogleBooksContext = React.createContext(null);

export const withGoogleBooks = Component => props => (
  <GoogleBooksContext.Consumer>
    {googlebooks => (
      <Component {...props} googlebooks={googlebooks} />
    )}
  </GoogleBooksContext.Consumer>
);

export default GoogleBooksContext;
