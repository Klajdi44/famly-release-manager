import { Injectable } from '@nestjs/common';

export interface Features {
  id: number;
  name: string;
  country: string;
  segment: number;
}

@Injectable()
export class AppService {
  private features: Features[] = [
    { id: 1, name: 'Profile image', country: 'Uk', segment: 225 },
    { id: 2, name: 'Face detection sign off', country: 'Dk', segment: 334  },
    { id: 3, name: 'Fingerprint authenication', country: 'Uk', segment: 554  },
  ];

  getFeatures(): Features[] {
    return this.features;
  }

}
