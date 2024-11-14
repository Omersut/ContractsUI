export type mdlExcursionOffer = {
    offerId: string;
    variationCode: string;
    currencyCode: string;
    date: string;
    time: string;
    price: number;
    isAvailable: boolean;
    reasonDisabled: string | null;
    cancellationPolicy: string | null;
    hasPickup: boolean;
    sharingOptionType: string | null;
    soldPax: string;
}