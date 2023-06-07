import { useEffect, useState } from 'react';
import { ROLLUP_VERSION, compile } from './feature/rollup';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  useEffect(() => {
    compile({
      input: 'virtual',
    }).then((code) => setCode(code));
  }, []);

  return (
    <div>
      <div className="flex items-center relative h-10">
        <div className="font-bold text-xl">
          Rollup Version: {ROLLUP_VERSION}
        </div>
        <button className="bg-blue-500 rounded-lg text-white h-8 text-sm px-3 pl-2 flex items-center space-x-2 absolute left-[50%]">
          Bundle
        </button>
      </div>
      <div className="code-content">
        <div className="code-edit">
          <CodeMirror
            value="console.log('hello world!');"
            height="100%"
            extensions={[javascript({ jsx: true })]}
          />
        </div>
        <div className="code-result">
          <CodeMirror
            value="console.log('hello world!');"
            height="200px"
            extensions={[javascript({ jsx: true })]}
            readOnly
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
