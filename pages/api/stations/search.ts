import findStations from 'vbb-find-stations';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  error?: {
    code: string;
    message: string;
  };
  results?: any[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { q } = req.query;

  if (!q) {
    res.status(400).json({
      error: {
        code: 'ERR_MISSING_PARAMS',
        message: 'Please provide all needed params.',
      },
    });
  }

  const data = await findStations(q, true);

  res.status(200).json({
    results: data.map((result: any) => {
      return {
        id: result.id,
        name: result.name,
        location: {
          latitude: result.location.latitude,
          longitde: result.location.longitude,
        },
      };
    }),
  });
}
