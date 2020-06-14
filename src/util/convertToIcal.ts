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
        s += appendAttribute('PRODID', '//' + host + '//ddd-business-assistant');
        s += appendAttribute('CALSCALE', 'GREGORIAN');
        s += appendAttribute('METHOD', 'PUBLISH');
        // Add events to calendar
        events.forEach(({ date, done, id, title }, i) => {
            s += appendAttribute('BEGIN', 'VTODO')
            s += 'X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE\r\n';
            s += appendAttribute('UID', id + '@' + host);
            s += appendAttribute('SEQUENCE', '' + i);
            s += appendAttribute('STATUS', done ? 'COMPLETED' : 'NEEDS-ACTION');
            s += appendAttribute('DTSTAMP', formatDate(new Date(Date.now()).toISOString()));
            const startDate = formatDate(new Date(new Date(date).setHours(0)).toISOString());
            s += appendAttribute('DTSTART', startDate);
            const dueDate = formatDate(new Date(new Date(date).setHours(23)).toISOString());
            s += appendAttribute('DUE', dueDate);
            s += appendAttribute('SUMMARY', title);
            s += appendAttribute('CLASS', 'CONFIDENTIAL');
            s += appendAttribute('CATEGORIES', 'BUSINESS,FINANCE,ACCOUNTING');
            s += appendAttribute('PRIORITY', '1');
            s += appendAttribute('END', 'VTODO');
        })
        s += appendAttribute('END', 'VCALENDAR');
    }
    return s;
}

const appendAttribute = (attr: string, data: string) => attr + ':' + data + '\r\n';

