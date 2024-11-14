import { mockServiceData } from "./mock-data/mockServiceData";
import { mdlSearchExcursionRequest } from "../models/service-models/SearchExcursionRequest";
import { mdlSearchExcursionResponse } from "../models/service-models/SearchExcursionResponse";
import { mdlGetExcursionDetailsRequest } from "../models/service-models/GetExcursionDetailsRequest";
import { mdlGetExcursionDetailsResponse } from "../models/service-models/GetExcursionDetailsResponse";
import { mdlBookExcursionRequest } from "../models/service-models/BookExcursionRequest";
import { mdlBookExcursionResponse } from "../models/service-models/BookExcursionResponse";
import { mdlGetExcursionsRequest } from "../models/service-models/GetExcursionsRequest";
import { mdlGetExcursionsResponse } from "../models/service-models/GetExcursionsResponse";
import { mdlCancelExcursionRequest } from "../models/service-models/CancelExcursionRequest";
import { mdlCancelExcursionResponse } from "../models/service-models/CancelExcursionResponse";

const useMock = false;

async function GetResponse<T>(endpoint: string, pRequest: any): Promise<T> {
    try {
        const envUrl = "http://"
        const response = await fetch(`/${envUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pRequest),
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Error during API request:", error);
        throw error;
    }
}

export const ContractsService = {
    async SearchExcursion(pRequest: mdlSearchExcursionRequest): Promise<mdlSearchExcursionResponse> {
        if (useMock) {
            return mockServiceData.SearchExcursionResponse;
        } else {
            return await GetResponse<mdlSearchExcursionResponse>("contracts/searchExcursion", pRequest);
        }
    },

    async GetExcursionDetails(pRequest: mdlGetExcursionDetailsRequest): Promise<mdlGetExcursionDetailsResponse> {
        if (useMock) {
            return mockServiceData.GetExcursionDetailsResponse;
        } else {
            return await GetResponse<mdlGetExcursionDetailsResponse>("contracts/getExcursionDetails", pRequest);
        }
    },

    async BookExcursion(pRequest: mdlBookExcursionRequest): Promise<mdlBookExcursionResponse> {
        if (useMock) {
            return mockServiceData.BookExcursionResponse;
        } else {
            return await GetResponse<mdlBookExcursionResponse>("contracts/bookExcursion", pRequest);
        }
    },

    async GetExcursions(pRequest: mdlGetExcursionsRequest): Promise<mdlGetExcursionsResponse> {
        if (useMock) {
            return mockServiceData.GetExcursionsResponse;
        } else {
            return await GetResponse<mdlGetExcursionsResponse>("contracts/getExcursions", pRequest);
        }
    },

    async CancelExcursion(pRequest: mdlCancelExcursionRequest): Promise<mdlCancelExcursionResponse> {
        if (useMock) {
            return mockServiceData.CancelExcursionResponse;
        } else {
            return await GetResponse<mdlCancelExcursionResponse>("contracts/cancelExcursion", pRequest);
        }
    }
};
