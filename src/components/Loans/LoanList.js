import React from 'react';

import LoanItem from './LoanItem';

const LoanList = ({ loans, all }) => (
  <table className="highlight">
    <thead>
      <tr>
        {/* <th>ID</th> */}
        <th>Book</th>
        {all && <th>User</th>}
        <th>Out Date</th>
        <th>Due Date</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {loans.map(loan => (
        <LoanItem key={loan.id} loan={loan} all={all}/>
      ))}
    </tbody>
  </table>
);

export default LoanList;
