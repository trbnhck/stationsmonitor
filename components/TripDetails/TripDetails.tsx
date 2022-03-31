import dynamic from 'next/dynamic';
import useSWR from 'swr';
import {fetcher} from 'libs/SWRHelper';
import {FaArrowRight} from 'react-icons/fa';

export default function TripDetailsComponent({line, tripId}) {
  const {data, error} = useSWR(
    `/api/trips/${encodeURIComponent(line)}/${encodeURIComponent(tripId)}`,
    fetcher,
    {
      refreshInterval: 15000,
    }
  );

  if (error) {
    return <>failed to load</>;
  }

  if (!data) {
    return (
      <div className="bg-slate-100 w-10/12 h-11 mx-auto animate-pulse"></div>
    );
  }

  const Map = dynamic(() => import('components/Map'), {
    ssr: false,
  });

  //TODO: dont show origin and destination at ringbahn
  return (
    <>
      <div id="main" className="w-full h-80">
        <Map
          latitude={data.currentLocation.latitude}
          longitude={data.currentLocation.longitude}
          lineOpts={{
            color: 'brown',
            stops: data.stops,
          }}
        />
      </div>
      <div className="text-2xl font-semibold text-center my-4">
        <span>{data.origin.name}</span>
        <FaArrowRight className="inline mx-2 text-base self-center" />
        <span>{data.destination.name}</span>
      </div>
    </>
  );
}
