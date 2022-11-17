export interface Features {
    id: number;
    name: string;
    country: string;
    segment: number;
}
export declare class AppService {
    private features;
    getFeatures(): Features[];
}
