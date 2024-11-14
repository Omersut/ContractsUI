import { mdlBaseRequest } from "./BaseRequest";

export type mdlBasePaginatedRequest  = mdlBaseRequest & {
    pageNumber?: number;
    pageSize?: number;
}

