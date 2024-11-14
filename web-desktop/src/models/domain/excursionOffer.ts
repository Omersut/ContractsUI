export type mdlExcursionOffer = {
    offerId: string;
    variationCode: string;
    currencyCode: string;
    date: string;
    time: string;
    price: number;
    camPrice: 0.1,
    isAvailable: boolean;
    reasonDisabled: string | null;
    cancellationPolicy: string | null;
    hasPickup: boolean;
    sharingOptionType: string | null;
    soldPax: string;
}