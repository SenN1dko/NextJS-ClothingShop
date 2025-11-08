import Link from 'next/link';
import { PAGES } from '@/config/pages.config';
import Image from 'next/image';
export default function NotFound() {
  return (
    <>
      <div className="h-screen w-full overflow-hidden flex  items-center justify-center  bg-black">
        <div className="flex flex-col gap-5  items-center justify-center ">
          <h1 className="text-white text-5xl text-center">404</h1>
          <div className="flex flex-col items-center h-full justify-center ">
            <div>
              {/* <Image
                src={'/img/not-found.svg'}
                alt="not found"
                className="fill-white"
                width={300}
                height={300}
              /> */}
            </div>
            <Link href={PAGES.HOME}>
              <div>Click to main page</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
