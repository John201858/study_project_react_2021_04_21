import { useEffect, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";

const timefunc = (date) => {
  if (isToday(date)) {
    return format(date, "Сегодня в HH:mm");
  } else if (isYesterday(date)) {
    return format(date, "Вчера в HH:mm");
  } else {
    return format(date, "dd.MM.yyyy");
  }
};

const Time = ({ date }) => {
  const [time, setTime] = useState(timefunc(new Date(date)));

  const interval = setInterval(() => {
    setTime((time) => (time = timefunc(new Date(date))));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return time;
};

export default Time;
