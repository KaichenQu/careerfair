import { useEffect, useState } from 'react';

function YourComponent() {
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    // Update date only on client-side
    setDateString(new Date().toLocaleDateString());
  }, []);

  return <div>{dateString}</div>;
} 