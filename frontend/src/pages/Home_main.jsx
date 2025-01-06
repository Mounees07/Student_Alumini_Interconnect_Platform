import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { Carousel, Footer } from "flowbite-react";
import { BACKEND_URL } from '../url';
import FooterCom  from '../components/Footer';
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/server/job/displayjob`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
    
          setJobs(data.slice(0, 3));
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchEvents = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/server/event/getevents`);
          const result = await response.json();
        
          if (response.ok) {
            setEvents(result.events);
            if (data.events.length < 3) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchJobs();
      fetchEvents();
  }, []);

  const handleShowMore = async () => {
    const startIndex = events.length;
    try {
      const response = await fetch(`${BACKEND_URL}/server/event/getevents?startIndex=${startIndex}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setEvents((prev) => [...prev, ...data.events]);
        if (data.events.length < 3) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log('Error fetching more events:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white">
      <header className="bg-[#FCF8F1] bg-opacity-30">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
            </div>
          </div>
        </div>
      </header>

      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                A social media for learners
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                Connect & learn from the experts
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                Grow your career fast with the right mentor.
              </p>

              <a
                href="#"
                title="Join for free"
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                role="button"
              >
                Join for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>

              <p className="mt-5 text-gray-600">
                Already joined us?{" "}
                <a
                  href="#"
                  title="Log in"
                  className="text-black transition-all duration-200 hover:underline"
                >
                  Log in
                </a>
              </p>
            </div>

            <div>
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

      {/* Latest Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center  text-slate-900 ">Latest Job Openings</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
            
          </div>
        ) : (
          <p className="text-center text-gray-600">No jobs available at the moment.</p>
        )}
      </div>
    

     {/* Latest Events Section */}
     <div className="min-h-screen mt-20 p-5 dark:text-white">
      <h2 className="text-3xl font-semibold mb-8 text-center text-slate-900">Upcoming Events</h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.slice(0, showMore ? events.length : 3).map((event) => (
            <li key={event._id}>
              <div className="border-2 rounded-lg p-6 mb-4 border-custom-blue">
                <div className="flex flex-row">
                  <div className="w-1/4 flex flex-col items-center justify-center p-3">
                    <p className="text-xl font-semibold mb-2">
                      {new Date(event.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                    <p className="">{event.location}</p>
                  </div>
                  
                  <div className="w-3/4 pl-5">
                    <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
                    <p className="mb-2">Time: {event.time}</p>
                    <p className="mb-2">Organized By: {event.organizedBy}</p>
                    <p className="mb-2">Contact Number: {event.contactNo}</p>
                    <p className="mb-2">Description: {event.description}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {events.length > 3 && !showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
   </div> 
    <FooterCom />
   </div>
 
  );
};

export default Home;
