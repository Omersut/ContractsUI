import { mockServiceData } from "./mock-data/mockServiceData";
import { mdlSearchExcursionRequest } from "../models/service-models/SearchExcursionRequest";
import { mdlSearchExcursionResponse } from "../models/service-models/SearchExcursionResponse";
import { mdlGetExcursionDetailsResponse } from "../models/service-models/GetExcursionDetailsResponse";
import { mdlGetExcursionDetailsRequest } from "../models/service-models/GetExcursionDetailsRequest";
import { mdlBookExcursionRequest } from "../models/service-models/BookExcursionRequest";
import { mdlBookExcursionResponse } from "../models/service-models/BookExcursionResponse";
import { mdlGetExcursionsRequest } from "../models/service-models/GetExcursionsRequest";
import { mdlGetExcursionsResponse } from "../models/service-models/GetExcursionsResponse";
import { mdlCancelExcursionRequest } from "../models/service-models/CancelExcursionRequest";
import { mdlCancelExcursionResponse } from "../models/service-models/CancelExcursionResponse";
import { GetResponse } from "../utils/ApiClient";
import { mdlCollectManualPaymentRequest } from "../models/service-models/CollectManulaPaymentRequest";
import { mdlCollectManualPaymentResponse } from "../models/service-models/CollectManulaPaymentResponse";

const useMock = false;

module ContractsService {
    export async function SearchExcursion(
        pRequest: mdlSearchExcursionRequest
    ): Promise<mdlSearchExcursionResponse> {
        if (useMock) {
            return mockServiceData.SearchExcursionResponse
        } else {
            return await GetResponse<mdlSearchExcursionResponse>(
                "contracts/searchExcursion",
                pRequest
            );
        }
    }

    export async function GetExcursionDetails(
        pRequest: mdlGetExcursionDetailsRequest
    ): Promise<mdlGetExcursionDetailsResponse> {
        if (useMock) {
            return mockServiceData.GetExcursionDetailsResponse as any
        } else {
            return await GetResponse<mdlGetExcursionDetailsResponse>(
                "contracts/getExcursionDetails",
                pRequest
            );
        }
    }

    export async function BookExcursion(
        pRequest: mdlBookExcursionRequest
    ): Promise<mdlBookExcursionResponse> {
        if (useMock) {
            return mockServiceData.BookExcursionResponse
        } else {
            return await GetResponse<mdlBookExcursionResponse>(
                "contracts/bookExcursion",
                pRequest
            );
        }
    }

    export async function GetExcursions(
        pRequest: mdlGetExcursionsRequest
    ): Promise<mdlGetExcursionsResponse> {
        if (useMock) {
            return mockServiceData.GetExcursionsResponse
        } else {
            return await GetResponse<mdlGetExcursionsResponse>(
                "contracts/getExcursions",
                pRequest
            );
        }
    }

    export async function CancelExcursion(
        pRequest: mdlCancelExcursionRequest
    ): Promise<mdlCancelExcursionResponse> {
        if (useMock) {
            return mockServiceData.CancelExcursionResponse
        } else {
            return await GetResponse<mdlCancelExcursionResponse>(
                "contracts/cancelExcursion",
                pRequest
            );
        }
    }
    export async function CollectManualPayment(
        pRequest: mdlCollectManualPaymentRequest
    ): Promise<mdlCollectManualPaymentResponse> {
        if (useMock) {
            return mockServiceData.CollectManualPaymentResponse
        } else {
            return await GetResponse<mdlCollectManualPaymentResponse>(
                "contracts/collectManualPayment",
                pRequest
            );
        }
    }
}

export { ContractsService };
