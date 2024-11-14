export type mdlExcursionContract = {
    contractAddress: string;
    id: string;
    name: string;
    variation: string;
    startDate: string;
    paxCount: number;
    currency: string;
    price: number;
    supplierShare: number;
    agentShare: number;
    tourGuideShare: number;
    status: string | null;
};