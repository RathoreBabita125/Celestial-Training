import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import { useState } from 'react';
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client/react';
import { GETPROJECTS } from '../../query/project/GetProject';

const Calender = () => {
  const { data: projectData } = useQuery(GETPROJECTS);
  const projectsEvents = projectData?.projects?.map((project) => (
    {
      id: project.id,
      title: project.title,
      start: project.startDate,
      end: project.endDate,
      color: project.status === 'Completed' ? 'green'
        : project.status === 'In progress' ? 'orange'
          : project.status === 'Pending' ? 'red'
            : 'blue'
    }
  )) || [];
  
  const [events, setEvents] = useState(projectsEvents);

  return (
    <Box className="calender-section">
      <EventCalendar
        events={events}
        onEventsChange={setEvents}
        defaultPreferences={{ showWeekends: false, isSidePanelOpen: false }}
      />
    </Box>
  );
}
export default Calender;