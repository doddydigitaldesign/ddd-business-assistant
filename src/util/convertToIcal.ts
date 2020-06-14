import { TableRow } from "../components/table/types";

export const convertToIcal = (data: TableRow[]) => {
    const stringify = generate(data);
    return stringify;
}

const generate = (events: TableRow[]) => {
    const host = 'doddydigitaldesign.github.io';
    const regexIsoDate = /([:]|[-]|[.][\d]{3}|[Z])/g;
    const formatDate = (d: string) => d.replace(regexIsoDate, '');
    let s = '';
    if (events) {
        // Begin calendar
        s += appendAttribute('BEGIN', 'VCALENDAR');
        s += appendAttribute('VERSION', '2.0');
        s += appendAttribute('PRODID', '-//' + host + '//DDD Business Assistant');
        s += appendAttribute('CALSCALE', 'GREGORIAN');
        s += appendAttribute('BEGIN', 'VTIMEZONE');
        s += appendAttribute('TZID', 'Europe/Stockholm');
        s += appendAttribute('TZURL', 'http://tzurl.org/zoneinfo-outlook/Europe/Stockholm');
        s += appendAttribute('X-LIC-LOCATION', 'Europe/Stockholm')
        s += appendAttribute('BEGIN', 'DAYLIGHT');
        s += appendAttribute('TZOFFSETFROM', '+0100');
        s += appendAttribute('TZOFFSETTO', '+0200');
        s += appendAttribute('TZNAME', 'CEST');
        s += appendAttribute('DTSTART', '19700329T020000');
        s += appendAttribute('RRULE', 'FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU');
        s += appendAttribute('END', 'DAYLIGHT');
        s += appendAttribute('BEGIN', 'STANDARD');
        s += appendAttribute('TZOFFSETFROM', '+0200');
        s += appendAttribute('TZOFFSETTO', '+0100');
        s += appendAttribute('TZNAME', 'CET');
        s += appendAttribute('DTSTART', '19701025T030000');
        s += appendAttribute('RRULE', 'FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU');
        s += appendAttribute('END', 'STANDARD');
        s += appendAttribute('END', 'VTIMEZONE');

        s += appendAttribute('METHOD', 'PUBLISH');
        // Add events to calendar
        events.forEach(({ date, done, id, title }, i) => {
            s += appendAttribute('BEGIN', 'VEVENT')
            s += 'X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE\r\n';
            s += appendAttribute('UID', id + '@' + host);
            s += appendAttribute('STATUS', done ? 'COMPLETED' : 'NEEDS-ACTION');
            s += appendAttribute('DTSTAMP', formatDate(new Date(Date.now()).toISOString()));
            const startDate = formatDate(new Date(new Date(date).setHours(0)).toISOString());
            s += appendAttribute('DTSTART', startDate);
            const dueDate = formatDate(new Date(new Date(date).setHours(23)).toISOString());
            s += appendAttribute('DUE', dueDate);
            s += appendAttribute('SUMMARY', title);
            s += appendAttribute('DESCRIPTION', title);
            s += appendAttribute('TRANSP', 'TRANSPARENT');
            s += appendAttribute('X-MICROSOFT-CDO-BUSYSTATUS', 'FREE');
            s += appendAttribute('BEGIN', 'VALARM');
            s += appendAttribute('ACTION', 'DISPLAY');
            s += appendAttribute('DESCRIPTION', title);
            s += appendAttribute('TRIGGER', '-PT0M');
            s += appendAttribute('END', 'VALARM');
            s += appendAttribute('END', 'VEVENT');
        })
        s += appendAttribute('END', 'VCALENDAR');
    }
    return s;
}

const appendAttribute = (attr: string, data: string) => attr + ':' + data + '\r\n';
