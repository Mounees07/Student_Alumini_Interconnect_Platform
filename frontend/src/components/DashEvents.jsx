import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashEvents() {
  const { currentstudent } = useSelector((state) => state.student);
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState('');
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/server/event/getevents`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setEvents(data.events);
          if (data.events.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentstudent.isAdmin) {
      fetchEvents();
    }
  }, []);

  const handleShowMore = async () => {
    
  };

  const handleDeleteEvent = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`${BACKEND_URL}/server/event/deleteevent/${eventIdToDelete}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
       
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setEvents((prev) =>
          prev.filter((event) => event._id !== eventIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentstudent.isAdmin && events.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Event</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Time</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Organizer</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              
            </Table.Head>
            {events.map((event) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {event.eventName}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(event.date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {event.time}
                  </Table.Cell>
                  <Table.Cell>
                    {event.location}
                  </Table.Cell>
                  <Table.Cell>
                    {event.organizedBy}
                  </Table.Cell>
                  <Table.Cell>
                    {event.description}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setEventIdToDelete(event._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no events yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this event?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteEvent}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
