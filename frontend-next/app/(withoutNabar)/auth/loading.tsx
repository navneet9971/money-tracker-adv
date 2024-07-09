import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Spinner: React.FC = () => {
  return (
    <div>
      <PacmanLoader color="#000000" speedMultiplier={1} />
    </div>
  );
};

export default Spinner;
