import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import { useState } from 'react';
import {Box} from '@mui/material'
import { defaultVisibleDate, initialEventsWithoutResources } from '../calender/calender';


export default function ColorPalettes() {
  const [events, setEvents] = useState(initialEventsWithoutResources);

  return (
    <Box className="calender-section">
      <EventCalendar
        events={events}
        defaultVisibleDate={defaultVisibleDate}
        onEventsChange={setEvents}
        defaultPreferences={{ showWeekends: false, isSidePanelOpen: false }}
      />
    </Box>
  );
}