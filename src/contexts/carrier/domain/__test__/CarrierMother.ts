import Carrier from '../Carrier';

class CarrierMother {
  static givenACarrier(): Carrier {
    return Carrier.create();
  }
}

export default CarrierMother;
