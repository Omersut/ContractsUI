export type mdlExcursion = {
    offerId: string;
    priceId: string;
    excursionId: string;
    locationId: string;
    excursionName: string;
    localizedName: Array<{
        languageCode: string;
        name: string;
    }>;
    duration: string; // Format: "D.HH:MM:SS"
    geoPoint: {
        latitude: number;
        longitude: number;
    };
    coverImage: string | null;
    activityTimeCategories: string[];
    targetGuestCategories: string[];
    excursionStartDate: string; // ISO 8601 format
    excursionEndDate: string;   // ISO 8601 format
    variationCode: string;
    weeklySaleSchedule: string[];
    pricePerExcursion: number;
    isPerPersonPrice: boolean;
    themes: string[];
    facilitiesIncluded: string[];
    facilitiesExcluded: string[];
    currencyCode: string;
}