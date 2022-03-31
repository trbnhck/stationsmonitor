import {useState, useEffect} from 'react';
import useSWR from 'swr';
import {fetcher} from 'libs/SWRHelper';
import {calcUntil} from 'libs/ScheduleHelper';

import StationsmonitorScheduleDeparture from 'components/Stationsmonitor/Schedule/Departure';

export default function StationsmonitorScheduleComponent({station}) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const {data, error, isValidating} = useSWR(
    `/api/stations/${station.value.id}/monitor`,
    fetcher,
    {
      refreshInterval: 15000,
    }
  );

  useEffect(() => {
    if (isValidating) {
      setLastUpdated(new Date());
    }
  }, [isValidating]);

  if (error) {
    return <>failed to load</>;
  }

  if (!data) {
    return (
      <div className="bg-slate-100 w-10/12 h-64 mx-auto my-11 animate-pulse"></div>
    );
  }

  return (
    <div className="lg:mx-16 mx-6 my-12">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold uppercase">{station.label}</h1>
        <h1 className="font-bold uppercase text-blue-800 place-self-end">
          Filter
        </h1>
      </div>
      <hr className="mb-4" />
      <div className="first:bg-gray-500 overflow-hidden">
        {data.departures.length === 0 ? <>Keine Daten verfügbar</> : <></>}
        {data.departures.map(departure => {
          return (
            <StationsmonitorScheduleDeparture
              key={departure.id}
              tripId={departure.id}
              direction={departure.direction}
              product={departure.line.product}
              line={departure.line.slug}
              timeUntil={calcUntil(departure.when)}
              remarks={departure.remarks}
            />
          );
        })}
      </div>
      <hr className="my-4" />

      <p className="text-center text-xs font-medium uppercase text-slate-600">
        Stand: {lastUpdated.toLocaleTimeString()} Uhr
      </p>
    </div>
  );
}
