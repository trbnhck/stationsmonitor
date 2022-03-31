import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

import TripDetails from 'components/TripDetails';

export default function TripsDetailsPage() {
  const router = useRouter();
  const {pid} = router.query;

  const [line, setLine] = useState('');
  const [tripId, setTripId] = useState('');

  useEffect(() => {
    if (pid === undefined) return;
    const [line, tripId] = Buffer.from('' + pid, 'base64')
      .toString('ascii')
      .split(';');

    setLine(line);
    setTripId(tripId);
  }, [pid]);

  if (line === '' || tripId === '') {
    return <>Loading...</>;
  }

  return (
    <>
      <TripDetails line={line} tripId={tripId} />
    </>
  );
}
