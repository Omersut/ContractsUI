import { mdlExcursionOffer } from "../domain/excursionOffer";

export type mdlGetExcursionDetailsResponse = {
    data: mdlExcursionOffer[];
    metadata: null | { [key: string]: any };
    messages: string[];
};
