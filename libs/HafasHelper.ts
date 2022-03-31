import createClient from 'hafas-client';
import bvgProfile from 'hafas-client/p/bvg';

import type {Remarks, Stops} from 'libs/types/BVG';

export const hafasClient = createClient(bvgProfile, 'stationsmonitor');

export function fmtServices(services: {}): string[] {
  return Object.keys(
    Object.fromEntries(Object.entries(services).filter(([_, v]) => v))
  ).map((service: string) => {
    return service;
  });
}
export function fmtRemarks(remarks: any): Remarks[] {
  if (remarks == undefined || remarks.length == 0) return [];

  return remarks.map(remark => {
    return {
      type: remark.type,
      code: remark.code,
      summary: remark.summary || '',
      text: remark.text || '',
    };
  });
}

export function fmtStops(stops: any): Stops[] {
  return stops.map((stop, index) => {
    if (index == 0) {
      return {
        arrival: new Date(0),
        plannedArrival: new Date(0),
        arrivalDelay: -1,
        arrivalPlatform: -1,
        plannedArrivalPlatform: -1,
        departure: new Date(stop.departure),
        plannedDeparture: new Date(stop.plannedDeparture),
        departureDelay: stop.departureDelay,
        departurePlatform: stop.departurePlatform,
        plannedDeparturePlatform: stop.plannedDeparturePlatform,
        remarks: fmtRemarks(stop.remarks),
        occupancy: stop.occupancy || '',
        stop: stop.stop,
      };
    } else if (index + 1 == stops.length) {
      return {
        arrival: new Date(stop.arrival),
        plannedArrival: new Date(stop.plannedArrival),
        arrivalDelay: stop.arrivalDelay,
        arrivalPlatform: stop.arrivalPlatform,
        plannedArrivalPlatform: stop.plannedArrivalPlatform,
        departure: new Date(0),
        plannedDeparture: new Date(0),
        departureDelay: -1,
        departurePlatform: -1,
        plannedDeparturePlatform: -1,
        remarks: fmtRemarks(stop.remarks),
        occupancy: stop.occupancy || '',
        stop: stop.stop,
      };
    } else {
      return {
        arrival: new Date(stop.arrival),
        plannedArrival: new Date(stop.plannedArrival),
        arrivalDelay: stop.arrivalDelay,
        arrivalPlatform: stop.arrivalPlatform,
        plannedArrivalPlatform: stop.plannedArrivalPlatform,
        departure: new Date(stop.departure),
        plannedDeparture: new Date(stop.plannedDeparture),
        departureDelay: stop.departureDelay,
        departurePlatform: stop.departurePlatform,
        plannedDeparturePlatform: stop.plannedDeparturePlatform,
        remarks: fmtRemarks(stop.remarks),
        occupancy: stop.occupancy,
        stop: stop.stop,
      };
    }
  });
}
