import {useEffect, useState} from 'react';
import {useAppContext} from 'context/AppContext';

import Stationsmonitor from 'components/Stationsmonitor';

export default function Index() {
  const [context, _] = useAppContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (context.location || context.error) {
      setLoading(false);
    }
  }, [context]);

  if (isLoading) {
    return <>Spinner</>;
  }

  return (
    <>
      <header className="text-center p-16">
        <h1 className="text-3xl font-extrabold">Stationsmonitor</h1>
      </header>
      <Stationsmonitor />
    </>
  );
}
