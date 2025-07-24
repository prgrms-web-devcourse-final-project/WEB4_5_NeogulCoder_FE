// userId -> writerId, teamCalendarId,personalCalendarId -> scheduleId //개인일정, 팀일정 포맷 맞추기e
export function calendarFormattingResult(
  items: StudyScheduleType[] | UserScheduleType[]
) {
  return items.map((item) => {
    if ('userId' in item) {
      const { userId, personalCalendarId, ...rest } = item;
      return {
        ...rest,
        writerId: userId,
        scheduleId: personalCalendarId,
      };
    } else {
      const { teamCalendarId, ...rest } = item;
      return { ...rest, scheduleId: teamCalendarId };
    }
  });
}
