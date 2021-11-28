import { App } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(utcString: string, format: string = DATE_TIME_FORMAT) {
      return dayjs.utc(utcString).utcOffset(8).format(format);
    }
  };
}
