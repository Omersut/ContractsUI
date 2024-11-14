import { mdlExcursion } from "./excursion";
import { mdlExcursionOffer } from "./excursionOffer"

export type mdlExcursionDetail = {
    offers: mdlExcursionOffer[];
    detail?: mdlExcursion,
    selectedOffer?: mdlExcursionOffer
}