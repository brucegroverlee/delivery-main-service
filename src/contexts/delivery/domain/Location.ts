export interface LocationJSON {
  address: string;
  latitude: number;
  longitude: number;
}

class Location {
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;

  private constructor(data: LocationJSON) {
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

  public static create(data: LocationJSON): Location {
    // validate

    const location = new Location(data);

    return location;
  }

  private validate() {}
}

export default Location;
