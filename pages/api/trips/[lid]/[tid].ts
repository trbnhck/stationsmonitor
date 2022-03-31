import { fmtRemarks, fmtServices, fmtStops, hafasClient } from 'libs/HafasHelper';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Line } from 'libs/types/BVG';
import type { Location } from 'libs/types/LocationProvider';

type ResponseData = {
  error?: {
    code: string;
    message: string;
  };
  id?: string;
  origin?: any;
  departure?: Date;
  plannedDeparture?: Date;
  departureDelay?: number;
  destination?: any;
  arrival?: Date;
  plannedArrival?: Date;
  arrivalDelay?: number;
  line?: Line;
  direction?: string;
  currentLocation?: Location;
  arrivalPlatform?: number;
  plannedArrivalPlatform?: number;
  departurePlatform?: number;
  plannedDeparturePlatform?: number;
  stops?: any[];
  remarks?: any[];
  occupancy?: string;
  updated?: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { lid, tid } = req.query;

  if (!tid || !lid) {
    res.status(400).json({
      error: {
        code: 'ERR_MISSING_PARAMS',
        message: 'Please provide all needed params.',
      },
    });
  }

  const data = await hafasClient.trip(tid, lid);

  if (data.error) {
    res.status(400).json({
      error: {
        code: 'ERR_INVALID_PARAMS',
        message: 'Please check whether the provided data is correct.',
      },
    });
  }

  res.status(200).json({
    id: data.id,

    origin: {
      id: data.origin.id,
      name: data.origin.name,
      location: {
        latitude: data.origin.location.latitude,
        longitude: data.origin.location.longitude,
      },
      services: fmtServices(data.origin.products),
    },

    departure: new Date(data.departure),
    plannedDeparture: new Date(data.plannedDeparture),
    departureDelay: data.departureDelay,

    destination: {
      id: data.destination.id,
      name: data.destination.name,
      location: {
        latitude: data.destination.location.latitude,
        longitude: data.destination.location.longitude,
      },
      services: fmtServices(data.destination.products),
    },
    arrival: new Date(data.arrival),
    plannedArrival: new Date(data.plannedArrival),
    arrivalDelay: data.arrivalDelay,

    line: {
      id: data.line.fahrtNr,
      slug: data.line.id,
      name: data.line.name,
      product: data.line.product,
      productName: data.line.productName,
    },

    direction: data.direction,

    currentLocation: {
      latitude: data.currentLocation.latitude,
      longitude: data.currentLocation.longitude,
    },

    arrivalPlatform: +data.arrivalPlatform || 1,
    plannedArrivalPlatform: +data.plannedArrivalPlatform || 1,

    departurePlatform: +data.departurePlatform,
    plannedDeparturePlatform: +data.plannedDeparturePlatform,

    stops: fmtStops(data.stopovers),
    remarks: fmtRemarks(data.remarks),

    occupancy: data.occupancy,

    updated: new Date(data.realtimeDataUpdatedAt),
  });
}
