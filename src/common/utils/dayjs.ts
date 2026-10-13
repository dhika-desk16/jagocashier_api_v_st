import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Jakarta');

export const nowUTC = () => dayjs().utc().toDate();

export const formatWIB = (date: Date | string) =>
  dayjs(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

export const nowWIB = () => dayjs().tz('Asia/Jakarta');
