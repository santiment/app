import React, { useState, useEffect } from 'react'
import MeetupWidget from './MeetupWidget'

const FINISH_MEETUP_DATE = new Date('May 27, 2021 16:00:00')

const EventBanner = () => {
  const [isShowMeetupBanner, setIsShowMeetupDate] = useState(false)

  useEffect(() => {
    const currDate = new Date()
    setIsShowMeetupDate(currDate < FINISH_MEETUP_DATE)
  }, [])

  if (isShowMeetupBanner) return <MeetupWidget />
  return null
}

export default EventBanner
