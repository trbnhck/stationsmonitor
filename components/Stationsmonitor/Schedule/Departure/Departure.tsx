import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import {FaAccessibleIcon, FaBicycle, FaExclamation} from 'react-icons/fa';

export default function StationsmonitorScheduleDepartureComponent({
  tripId,
  direction,
  product,
  line,
  timeUntil,
  remarks,
}) {
  if (line.includes('flx')) {
    // FLX is an express, not an ICE though
    product = 'regional';
  }
  console.log(remarks);
  return (
    <Link
      href={`/trips/${encodeURIComponent(
        Buffer.from(`${line};${tripId}`).toString('base64')
      )}/details`}
    >
      <div
        key={tripId}
        className={classNames(
          'grid grid-cols-2 p-2 odd:bg-gray-100 even:bg-gray-50',
          {
            'animate-pulse': timeUntil === 0,
          }
        )}
      >
        <div>
          <span className="block text-2xl font-medium">{direction}</span>
          <div className="flex align-middle">
            <Image
              src={`/icons/${product}.svg`}
              width={16}
              height={16}
              className="inline"
            />
            <span className="uppercase p-1">
              {
                line.replace(
                  '-',
                  ' '
                ) /* FLX and ICE contain a dash, that shouldn't be there if displayed */
              }
            </span>
          </div>
        </div>
        <div className="text-right text-4xl">
          <span className="block">{timeUntil}'</span>
          <div className="flex justify-end text-base self-center children:mx-1">
            {remarks.map(remark => {
              if (remark.code == 'bf') {
                return <FaAccessibleIcon title="Barrierefrei" />;
              }
              if (remark.code == 'FB') {
                return <FaBicycle title="Fahrradmitnahme möglich" />;
              }

              if (remark.code == 'text.realtime.journey.cancelled') {
                return (
                  <FaExclamation
                    title="Fahrt fällt aus"
                    className="text-red-500"
                  />
                );
              }

              return <></>;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
