import { useState,useEffect } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function Toggle({ onToggle, checked }) {
  const [enabled, setEnabled] = useState(checked);

  useEffect(() => {
    setEnabled(checked);
  }, [checked]);
  
  const handleChange = () => {
    const newValue = !enabled;
    console.log('Toggle Value:', newValue);

    setEnabled(newValue);

    // Check if onToggle is a function before calling it
    if (typeof onToggle === 'function') {
      onToggle(newValue);
    } else {
      console.log('onToggle is not a function!');
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={classNames(
        enabled ? 'bg-theme' : 'bg-gray-300',
        'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
}
