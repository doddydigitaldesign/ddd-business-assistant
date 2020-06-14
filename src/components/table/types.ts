
export type TableRow = {
    id: string;
    date: string;
    title: string;
    done: boolean;
}

export type TableHeaders = {
    date: 'Datum',
    title: 'Titel',
    done: 'Klar'
};

export type TableHeader = [TableHeaders['date'], TableHeaders['title'], TableHeaders['done']];