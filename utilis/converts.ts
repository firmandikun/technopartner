/**
 *
 * @param {*} data
 * @param {*} prefix
 *
 * Convert price integer value into string devided by (.) and give prefix IDR
 *
 * How to use -> convertToIdr(10000)
 * Result -> IDR 10.000
 *
 */
 export const convertToIdr = (data = 0, prefix = "Rp") => {
    return `${prefix}${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };
  
  /**
   *
   * @param {*} data
   *
   * Convert integer value into string devided by (.)
   *
   * How to use -> convertToKilo(10000)
   * Result -> 10.000
   *
   */
  export const convertToKilo = (data = 0) => {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  /**
   *
   * @param {*} data
   *
   *  getFullYear() - Returns the 4-digit year
   *  getMonth() - Returns a zero-based integer (0-11) representing the month of the year.
   *  getDate() - Returns the day of the month (1-31).
   *  getDay() - Returns the day of the week (0-6). 0 is Sunday, 6 is Saturday.
   *  getHours() - Returns the hour of the day (0-23).
   *  getMinutes() - Returns the minute (0-59).
   *  getSeconds() - Returns the second (0-59).
   *  getMilliseconds() - Returns the milliseconds (0-999).
   *  getTimezoneOffset() - Returns the number of minutes between the machine local time and
   *
   * */
  export const getTimezone = (format: string) => {
    switch (format) {
      case "Asia/Makassar":
        return "WITA";
      case "Asia/Jayapura":
        return "WIT";
      default:
        return "WIB";
    }
  };
  
  /**
   *
   * @param {*} data
   * @param {*} format
   * @param {*} utc
   *
   * Formatting datetime javascript value into the design needed
   *
   * How to use -> formatDateTime(data, "dd MMM y hh:mm:ss")
   * Result -> 12 Jun 2020 18:24:22
   *
   */
  export const formatDateTime = (data: any, format: string, utc: string = "") => {
    const date = new Date(data);
  
    let formated = format;
  
    const MMMM = [
      "\x00",
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
  
    const MMM = [
      "\x01",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agt",
      "Sep",
      "Oct",
      "Nov",
      "Des",
    ];
  
    const dddd = [
      "\x02",
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
  
    const ddd = ["\x03", "Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  
    const ii = (i: any, len?: any) => {
      let s = `${i}`;
      const length = len || 2;
  
      while (s.length < length) {
        s = `0${s}`;
      }
  
      return s;
    };
  
    const y = utc ? date.getUTCFullYear() : date.getFullYear();
    formated = formated.replace(/(^|[^\\])yyyy+/g, `$1${y}`);
    formated = formated.replace(/(^|[^\\])yy/g, `$1${y.toString().substr(2, 2)}`);
    formated = formated.replace(/(^|[^\\])y/g, `$1${y}`);
  
    const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    formated = formated.replace(/(^|[^\\])MMMM+/g, `$1${MMMM[0]}`);
    formated = formated.replace(/(^|[^\\])MMM/g, `$1${MMM[0]}`);
    formated = formated.replace(/(^|[^\\])MM/g, `$1${ii(M)}`);
    formated = formated.replace(/(^|[^\\])M/g, `$1${M}`);
  
    const d = utc ? date.getUTCDate() : date.getDate();
    formated = formated.replace(/(^|[^\\])dddd+/g, `$1${dddd[0]}`);
    formated = formated.replace(/(^|[^\\])ddd/g, `$1${ddd[0]}`);
    formated = formated.replace(/(^|[^\\])dd/g, `$1${ii(d)}`);
    formated = formated.replace(/(^|[^\\])d/g, `$1${d}`);
  
    const H = utc ? date.getUTCHours() : date.getHours();
    formated = formated.replace(/(^|[^\\])HH+/g, `$1${ii(H)}`);
    formated = formated.replace(/(^|[^\\])H/g, `$1${H}`);
  
    let h = 0;
    if (H > 12) {
      h = H - 12;
    } else if (H === 0) {
      h = 12;
    } else {
      h = H;
    }
  
    formated = formated.replace(/(^|[^\\])hh+/g, `$1${ii(h)}`);
    formated = formated.replace(/(^|[^\\])h/g, `$1${h}`);
  
    const m = utc ? date.getUTCMinutes() : date.getMinutes();
    formated = formated.replace(/(^|[^\\])mm+/g, `$1${ii(m)}`);
    formated = formated.replace(/(^|[^\\])m/g, `$1${m}`);
  
    const s = utc ? date.getUTCSeconds() : date.getSeconds();
    formated = formated.replace(/(^|[^\\])ss+/g, `$1${ii(s)}`);
    formated = formated.replace(/(^|[^\\])s/g, `$1${s}`);
  
    let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    formated = formated.replace(/(^|[^\\])fff+/g, `$1${ii(f, 3)}`);
    f = Math.round(f / 10);
    formated = formated.replace(/(^|[^\\])ff/g, `$1${ii(f)}`);
    f = Math.round(f / 10);
    formated = formated.replace(/(^|[^\\])f/g, `$1${f}`);
  
    const T = H < 12 ? "AM" : "PM";
    formated = formated.replace(/(^|[^\\])TT+/g, `$1${T}`);
    formated = formated.replace(/(^|[^\\])T/g, `$1${T.charAt(0)}`);
  
    const t = T.toLowerCase();
    formated = formated.replace(/(^|[^\\])tt+/g, `$1${t}`);
    formated = formated.replace(/(^|[^\\])t/g, `$1${t.charAt(0)}`);
  
    let tz = -date.getTimezoneOffset();
    let K = utc;
  
    if (!tz) {
      K = "Z";
    } else if (tz > 0) {
      K = "+";
    } else {
      K = "-";
    }
  
    if (!utc) {
      tz = Math.abs(tz);
      const tzHrs = Math.floor(tz / 60);
      const tzMin = tz % 60;
  
      K += `${ii(tzHrs)}:${ii(tzMin)}`;
    }
  
    formated = formated.replace(/(^|[^\\])K/g, `$1${K}`);
  
    const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    formated = formated.replace(new RegExp(dddd[0], "g"), dddd[day]);
    formated = formated.replace(new RegExp(ddd[0], "g"), ddd[day]);
  
    formated = formated.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    formated = formated.replace(new RegExp(MMM[0], "g"), MMM[M]);
  
    formated = formated.replace(/\\(.)/g, "$1");
  
    return formated;
  };
  
  /**
   *
   * @param {*} data
   *
   * Convert times into times ago.
   *
   */
  export const convertTimeAgo = (data: any) => {
    const now: any = new Date();
    const past: any = new Date(data);
    const elapsed = now - past;
  
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;
  
    if (!data) {
      return "unseen";
    }
  
    if (elapsed < minute) {
      return "recently";
    }
  
    if (elapsed < hour) {
      return `${Math.round(elapsed / minute)} minutes ago`;
    }
  
    if (elapsed < day) {
      return `${Math.round(elapsed / hour)} hours ago`;
    }
  
    if (elapsed < month) {
      return `${Math.round(elapsed / day)} days ago`;
    }
  
    if (elapsed < year) {
      return `${Math.round(elapsed / month)} months ago`;
    }
  
    return `${Math.round(elapsed / year)} years ago`;
  };
  
  /**
   *
   * @param {*} start
   * @param {*} end
   * @param {*} into
   *
   * Convert time start and time end into duration time
   * and return it by different type
   *
   * format start & end = "00:00"
   * type = showcase / small_showcase
   *
   */
  export const convertToDuration = (start: any, end: any, type: any) => {
    const countstart = start.split(":");
    const countend = end.split(":");
  
    const startDate = new Date(0, 0, 0, countstart[0], countstart[1], 0);
    const endDate = new Date(0, 0, 0, countend[0], countend[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
  
    // If 24 hours format
    if (hours < 0) {
      hours += 24;
    }
  
    switch (type) {
      case "showcase":
        return `${hours}jam ${(minutes <= 9 ? "0" : "") + minutes}menit`;
      case "small_showcase":
        return `${hours}j ${(minutes <= 9 ? "0" : "") + minutes}m`;
      case "seconds": {
        const hourToSeconds = hours * 60 * 60;
        const minuteToSeconds = minutes * 60;
  
        return hourToSeconds + minuteToSeconds;
      }
  
      default:
        return `${(hours <= 9 ? "0" : "") + hours}:${
          (minutes <= 9 ? "0" : "") + minutes
        }`;
    }
  };
  
  export const convertTimeToDuration = (data: any, type: any) => {
    const temp = data.split(":");
  
    switch (type) {
      case "small":
        return `${parseInt(temp[0], 2) > 0 ? parseInt(temp[0], 2) : "0"}j ${
          parseInt(temp[1], 2) > 0 ? parseInt(temp[1], 2) : "00"
        }m`;
      default:
        return `${parseInt(temp[0], 2) > 0 ? parseInt(temp[0], 2) : "0"}jam ${
          parseInt(temp[1], 2) > 0 ? parseInt(temp[1], 2) : "00"
        }menit`;
    }
  };
  
  /**
   *
   * @param {*} data
   * @param {*} limit
   *
   * Limit content text to show.
   * return content with 100 char and ...
   *
   */
  export const limitContentText = (data: string, limit: number) => {
    const description = data.length > limit ? `${data.substring(0, limit)} ...` : data;
  
    return description;
  };
  
  /**
   *
   * @param {*} data
   *
   * Convert title or string data into slug.
   * return "title-data-slug"
   *
   */
  export const convertToSlug = (data: string) => {
    const slug = data
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  
    return slug;
  };
  
  /**
   *
   * @param {*} from
   * @param {*} to
   *
   * Convert title or string data into slug.
   * return "title-data-slug"
   *
   */
  export const convertToDistance = (from: any, to: any) => {
    const { PI } = Math;
    const R = 6378137;
  
    const squared = (x: number) => {
      return x * x;
    };
  
    const toRadius = (x: any) => {
      return (x * PI) / 180.0;
    };
  
    const aLat = toRadius(Array.isArray(from) ? from[1] : from.latitude || from.lat);
    // console.log("From: ", from);
    // console.log("Radius: ", aLat);
  
    return null;
  };
  