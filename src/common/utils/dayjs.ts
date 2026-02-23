import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// set default timezone global
dayjs.tz.setDefault('Asia/Jakarta');

// helper untuk insert DB → tetap UTC
export const nowUTC = () => dayjs().utc().toDate();

// helper untuk API response → otomatis WIB
export const formatWIB = (date: Date | string) =>
  dayjs(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

// optional: return dayjs object WIB
export const nowWIB = () => dayjs().tz('Asia/Jakarta');
