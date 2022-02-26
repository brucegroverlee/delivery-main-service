export interface CarrierLocationProperties {
  address: string;
  latitude: number;
  longitude: number;
}

class CarrierLocation {
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;

  private constructor(data: CarrierLocationProperties) {
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

  public static create(data: CarrierLocationProperties): CarrierLocation {
    const location = new CarrierLocation(data);

    return location;
  }
}

export default CarrierLocation;
