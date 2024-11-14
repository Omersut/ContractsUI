export type mdlSearchExcursionRequest = {
    fromDate: string;      // Should be in YYYY-MM-DD format
    toDate: string;        // Should be in YYYY-MM-DD format
    nationality: string;   // ISO 3166-1 alpha-2 country code (e.g., "DE")
    adultCount: number;    // Must be a non-negative integer
};
