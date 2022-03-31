import { fmtServices, hafasClient } from 'libs/HafasHelper';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Station } from 'libs/types/BVG';

type ResponseData = {
  error?: {
    code: string;
    message: string;
  };
  station?: Station;
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

  let data: any;
  try {
    data = await hafasClient.stop(sid);
  } catch (_) {
    data = { error: 1 };
  }

  if (data.error) {
    res.status(400).json({
      error: {
        code: 'ERR_INVALID_PARAMS',
        message: 'Please check whether the provided data is correct.',
      },
    });

    return;
  }

  res.status(200).json({
    station: {
      id: data.id,
      name: data.name,
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      },
      services: fmtServices(data.products),
    },
  });
}
