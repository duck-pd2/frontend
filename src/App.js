import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal';
import './App.css'; // 导入自定义的 CSS 文件

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Meeting',
      start: '2024-06-10T10:30:00',
      end: '2024-06-10T12:30:00',
      backgroundColor: '#3788d8',
      tag: 'Tasks',
      note: 'Discuss project status'
    },
    {
      id: '2',
      title: 'Lunch',
      start: '2024-06-11T12:00:00',
      backgroundColor: '#3788d8',
      tag: 'Tasks',
      note: 'Lunch with team'
    },
    {
      id: '3',
      title: 'Conference',
      start: '2024-06-13',
      end: '2024-06-15',
      backgroundColor: '#3788d8',
      tag: 'work',
      note: 'Attend annual conference'
    }
  ]);
  const [currentNote, setCurrentNote] = useState('');

  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    backgroundColor: '#3788d8',
    tag: '',
    note: ''
  });

  const [filterTags, setFilterTags] = useState({
    Tasks: true,
    work: true
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentNote('');
    setNewEvent({
      id: '',
      title: '',
      start: '',
      end: '',
      backgroundColor: '#3788d8',
      tag: '',
      note: ''
    });
  };

  const closeNoteModal = () => setNoteModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const [filterVisible, setFilterVisible] = useState(true);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start) {
      const isNewTag = !(newEvent.tag in filterTags);
      const newEvents = [...events, { ...newEvent, id: String(events.length + 1) }];
      setEvents(newEvents);

        if (isNewTag) {
          setFilterTags({ ...filterTags, [newEvent.tag]: true });
        }
      
      closeModal();
    } 
  };
  
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilterTags({ ...filterTags, [name]: checked });
  };

  const handleEventClick = ({ event }) => {
    setCurrentNote(event.extendedProps.note || 'No note available');
    setNoteModalIsOpen(true);
  };

  const filteredEvents = events.filter(event => filterTags[event.tag]);

  return (
    <div className="App">
      <div className="sidebar">
        <button onClick={openModal}
                style={{ fontFamily: "'Times New Roman', Times, serif" ,fontSize: "24px",backgroundColor: "#3f78b5",color:"white", border: "none", borderadius: "4px",marginBottom :"10px" }}>add event</button>
        <button onClick={() => setFilterVisible(!filterVisible)}
                style={{ fontFamily: "'Times New Roman', Times, serif" ,fontSize: "24px",backgroundColor: "#3f78b5",color:"white", border: "none", borderadius: "4px", marginBottom :"10px"}}>
          {filterVisible ? 'filter▲' : 'filter▼'}
        </button>
        {filterVisible && (
          <div>
            {Object.keys(filterTags).map(tag => (
              <React.Fragment key={tag} >
                <label style={{ fontFamily: "'Times New Roman', Times, serif",fontSize: "16px" , marginBottom :"10px"}}>    
                  <input
                    type="checkbox"
                    name={tag}
                    checked={filterTags[tag]}
                    onChange={handleFilterChange}
                  />
                  {tag}
                </label>
                <br />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="窗口"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000 // 确保 modal 的 z-index 高于 FullCalendar
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <h2>add new event</h2>
        <form onSubmit={handleFormSubmit}>
          <label style={{ fontFamily: "'Times New Roman', Times, serif",fontSize: "16px" , marginBottom :"10px"}}>    
            title:
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label style={{ fontFamily: "'Times New Roman', Times, serif",fontSize: "16px" , marginBottom :"10px"}}>    
            start:
            <input
              type="datetime-local"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label style={{ fontFamily: "'Times New Roman', Times, serif",fontSize: "16px" , marginBottom :"10px"}}>    
            end:
            <input
              type="datetime-local"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label style={{ fontFamily: "'Times New Roman', Times, serif",fontSize: "16px" , marginBottom :"10px"}}>    
          backgroundColor:
            <input
              type="color"
              name="backgroundColor"
              value={newEvent.backgroundColor}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label style={{ fontFamily: "'Times New Roman', Times, serif",fontSize: "16px" , marginBottom :"10px"}}>    
            tag:
            <input
              type="text"
              name="tag"
              value={newEvent.tag}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "16px", marginBottom: "10px" }}>
            Note:
            <br />
            <textarea
              name="note"
              value={newEvent.note}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit"style={{ fontFamily: "'Times New Roman', Times, serif" }}>add event</button>
          <button type="button" onClick={closeModal} style={{ fontFamily: "'Times New Roman', Times, serif" }}>cancel</button>
        </form>
      </Modal>

      <Modal
        isOpen={noteModalIsOpen}
        onRequestClose={closeNoteModal}
        contentLabel="Note Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000 // 确保 modal 的 z-index 高于 FullCalendar
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <h2>Event Note</h2>
        <p>{currentNote}</p>
        <button onClick={closeNoteModal} style={{ fontFamily: "'Times New Roman', Times, serif" }}>Close</button>
      </Modal>
        
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "today prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          height="90vh"
          events={filteredEvents}
          editable={true}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
}

export default App;
