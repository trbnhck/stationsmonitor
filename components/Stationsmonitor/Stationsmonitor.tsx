import {useEffect, useState} from 'react';
import {useAppContext} from 'context/AppContext';
import {fetcher} from 'libs/SWRHelper';
import useSWR from 'swr';

import AsyncSelect from 'react-select/async';

import StationsmonitorSchedule from 'components/Stationsmonitor/Schedule';

export default function StationsmonitorComponent() {
  const [context, _setContext] = useAppContext();
  const {data, error} = useSWR(
    `/api/stations?latitude=${context.location.latitude}&longitude=${context.location.longitude}`,
    fetcher
  );
  const [selectedStation, setSelectedStation] = useState({
    label: '',
    value: {},
  });

  useEffect(() => {
    if (!data) return;

    setSelectedStation({
      label: data.stations[0].name,
      value: data.stations[0],
    });
  }, [data]);

  if (error) {
    return <>failed to load</>;
  }

  if (!data) {
    return (
      <div className="bg-slate-100 w-10/12 h-11 mx-auto animate-pulse"></div>
    );
  }

  const options = data.stations.map(station => {
    return {
      label: `${station.name}`,
      value: station,
    };
  });

  const searchStations = async (input: string) => {
    const stations = await (
      await fetch(`/api/stations/search?q=${encodeURIComponent(input)}`)
    ).json();
    return stations.results.map(station => {
      return {
        label: `${station.name}`,
        value: station,
      };
    });
  };

  return (
    <>
      <AsyncSelect
        className="lg:mx-32 mx-6"
        loadOptions={searchStations}
        defaultOptions={options}
        cacheOptions
        autoFocus={true}
        value={selectedStation}
        onChange={newVal => setSelectedStation(newVal)}
      />
      <StationsmonitorSchedule station={selectedStation} />
    </>
  );
}
