import { fmtRemarks, fmtServices, hafasClient } from 'libs/HafasHelper';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Departure } from 'libs/types/BVG';

type ResponseData = {
  error?: {
    code: string;
    message: string;
  };
  departures?: Departure[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { sid } = req.query;

  if (!sid) {
    res.status(400).json({
      error: {
        code: 'ERR_MISSING_PARAMS',
        message: 'Please provide all needed params.',
      },
    });
  }

  const data = await hafasClient.departures(sid);

  res.status(200).json({
    departures: data.map((departure) => {
      if (departure.currentTripPosition == undefined) {
        departure.currentTripPosition = {
          latitude: -1,
          longitude: -1,
        };
      }
      return {
        id: departure.tripId,
        direction: departure.direction,
        line: {
          id: departure.line.fahrtNr,
          slug: departure.line.id,
          name: departure.line.name,
          product: departure.line.product,
          productName: departure.line.productName,
        },
        when: new Date(departure.when),
        delay: departure.delay,
        platform: departure.platform || 1,
        plannedPlatform: departure.plannedPlatform || 1,
        station: {
          id: departure.stop.id,
          name: departure.stop.name,
          location: {
            latitude: departure.stop.location.latitude,
            longitude: departure.stop.location.longitude,
          },
          services: fmtServices(departure.stop.products),
        },

        remarks: fmtRemarks(departure.remarks),

        currentPosition: {
          latitude: departure.currentTripPosition.latitude || -1,
          longitude: departure.currentTripPosition.longitude || -1,
        },
        occupancy: departure.occupancy,
      };
    }),
  });
}
