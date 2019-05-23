import React from 'react';

import LoanItem from './LoanItem';

const LoanList = ({ loans }) => (
  <ul>
    {loans.map(loan => (
      <LoanItem key={loan.id} loan={loan} />
    ))}
  </ul>
);

export default LoanList;
