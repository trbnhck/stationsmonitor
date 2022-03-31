import {fmtServices, hafasClient} from 'libs/HafasHelper';

import type {NextApiRequest, NextApiResponse} from 'next';
import type {Station} from 'libs/types/BVG';

type ResponseData = {
  error?: {
    code: string;
    message: string;
  };
  stations?: Station[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {latitude, longitude} = req.query;

  if (!latitude || !longitude) {
    res.status(400).json({
      error: {
        code: 'ERR_MISSING_PARAMS',
        message: 'Please provide all needed params.',
      },
    });
  }

  const data = await hafasClient.nearby({
    type: 'location',
    latitude: +latitude,
    longitude: +longitude,
  });

  res.status(200).json({
    stations: data.map(station => {
      return {
        id: station.id,
        name: station.name,
        location: {
          latitude: station.location.latitude,
          longitude: station.location.longitude,
        },
        services: fmtServices(station.products),
        distance: station.distance,
      };
    }),
  });
}
