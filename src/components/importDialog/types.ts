export type ImportedJson = {
    Data: {
        Id: string;
        Date: string;
        Status: "Completed" | "Overdue" | "Upcoming";
        Title: string;
        Description: string;
        CategoryId: string;
        HiddenCategory: boolean;
        HiddenDate: boolean;
        State: "Completed" | "None";
    }[];
    Error: null;
    Success: boolean;
    ErrorMessage: null;
    Meta: null;
}


