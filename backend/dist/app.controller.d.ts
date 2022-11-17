import { AppService, Features } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getFeatures(): Features[];
    getOne(id: any): string;
}
