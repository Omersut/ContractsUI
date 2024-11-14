import { mdlExcursion } from "../domain/excursion";

export type mdlSearchExcursionResponse = {
    data: {
        page: number;
        size: number;
        totalSize: number;
        totalPages: number;
        items: mdlExcursion[];
    };
    metadata: {
        searchId: string;
    };
    messages: string[];
};
