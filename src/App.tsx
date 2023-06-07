import { useEffect, useState } from 'react';

import { ROLLUP_VERSION, compile } from './feature/rollup';

function App() {
  const [code, setCode] = useState('');
  useEffect(() => {
    compile({
      input: 'virtual',
    }).then((code) => setCode(code));
  }, []);
  return (
    <div>
      <div>current Rollup Version: {ROLLUP_VERSION}</div>
      <div>{code}</div>
    </div>
  );
}

export default App;
