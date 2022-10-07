import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { UserContext } from '../context/UserContext';

export const Home = () => {
  const { user } = useContext(UserContext);

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {user ? (
        <div className='flex flex-col gap-24 h-screen pt-24 px-16 lg:flex-row'>
          <Sidebar />
          <main className='order-first lg:order-last'>
            <div className='text-4xl font-semibold pb-4'>
              Welcome to Roverify!
            </div>
            <div className='text-gray-800 text-lg'>
              <Link to='/upload' className='text-black hover:underline'>
                Upload a song
              </Link>{' '}
              or select a playlist to start listening.
            </div>
          </main>
        </div>
      ) : (
        <div className='w-full h-screen -mt-32 bg-center bg-no-repeat bg-cover'>
          <main className='h-screen flex flex-col gap-12 justify-center items-center pb-36'>
            <div className='text-6xl font-semibold'>Welcome to Roverify</div>
            <div className='mb-24 text-xl font-medium'>Upload and listen.</div>
            <button onClick={handleScroll}>
              <img
                src='../down-arrow.png'
                alt='Down arrow'
                className='hover:scale-105'
              ></img>
            </button>
          </main>
          {/* credit to landingfolio.com for the code below */}
          <section className='py-10 bg-white sm:py-16 lg:py-24'>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <div className='max-w-2xl mx-auto text-center'>
                <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl'>
                  How does it work?
                </h2>
                <p className='max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600'>
                  Roverify is a website that lets you upload and stream your
                  music.
                </p>
              </div>

              <div className='relative mt-12 lg:mt-20'>
                <div className='absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28'>
                  <img
                    className='w-full'
                    src='/curved-dotted-line.svg'
                    alt=''
                  />
                </div>

                <div className='relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12'>
                  <div>
                    <div className='flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow'>
                      <span className='text-xl font-semibold text-gray-700'>
                        {' '}
                        1{' '}
                      </span>
                    </div>
                    <h3 className='mt-6 text-xl font-semibold leading-tight text-black md:mt-10'>
                      Create an account
                    </h3>
                    <p className='mt-4 text-base text-gray-600'>
                      Get started instantly by making a free account. Account
                      details are encrypted and will never be shared with third
                      parties.
                    </p>
                  </div>

                  <div>
                    <div className='flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow'>
                      <span className='text-xl font-semibold text-gray-700'>
                        {' '}
                        2{' '}
                      </span>
                    </div>
                    <h3 className='mt-6 text-xl font-semibold leading-tight text-black md:mt-10'>
                      Upload your songs
                    </h3>
                    <p className='mt-4 text-base text-gray-600'>
                      Choose file from your computer to securely upload to our
                      hosting server. Create playlists to organize your library!
                    </p>
                  </div>

                  <div>
                    <div className='flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow'>
                      <span className='text-xl font-semibold text-gray-700'>
                        {' '}
                        3{' '}
                      </span>
                    </div>
                    <h3 className='mt-6 text-xl font-semibold leading-tight text-black md:mt-10'>
                      Stream for free
                    </h3>
                    <p className='mt-4 text-base text-gray-600'>
                      Play your uploaded songs at streaming quality for no cost.
                      No ads, no premium, just stream.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className='flex justify-center py-10'>
            <Link
              to='/signup'
              className='px-8 py-4 font-semibold border border-black bg-black  text-white rounded-md hover:bg-white hover:text-black focus:bg-white focus:text-black'
            >
              Try for free
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
