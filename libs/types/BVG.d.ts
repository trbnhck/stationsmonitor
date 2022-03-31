import { Location } from 'libs/types/LocationProvider';

interface Station {
  id: string;
  name?: string;
  location?: Location;
  services?: string[];
}

interface Line {
  id: string;
  slug: string;
  name: string;
  product: 'bus' | 'suburban' | 'subway' | 'ferry' | 'tram';
  productName: string; // TODO: figure out enums
}

interface Remarks {
  type: 'hint' | 'warning' | 'status';
  code?: string;
  summary?: string;
  text?: string;
}
interface Departure {
  id: string;
  direction: string;
  line: Line;

  when: Date;
  delay: number;

  platform: number;
  plannedPlatform: number;
  station: Station;

  remarks: Remarks[];

  currentPosition: Location;
  occupancy: 'low' | 'medium' | 'high' | '?';
}

interface Stops {
  arrival: Date | undefined;
  plannedArrival: Date;
  arrivalDelay: number;
  arrivalPlatform: number;
  plannedArrivalPlatform: number;

  departure: Date;
  plannedDeparture: Date;
  departureDelay: number;
  departurePlatform: number;
  plannedDeparturePlatform: number;

  remarks: Remarks[];
  occupancy: 'low' | 'medium' | 'high' | 'unknown';

  station: Station;
}
