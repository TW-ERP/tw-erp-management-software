import React, { useState } from 'react';
import Login from './Components/login.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  
  return (
    <div>
      <p>WE GOT THIS!</p>
      {/* loggedIn ? loginpage:querypage */}
      {loggedIn && <Login setLoggedIn={setLoggedIn}/>}
    </div>
  );
};

export default App;
