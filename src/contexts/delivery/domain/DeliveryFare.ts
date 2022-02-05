import IntValueObject from '../../shared/domain/valueObject/IntValueObject';
import Location from './Location';

class DeliveryFare extends IntValueObject {
  public static calculateBy(senderLocation: Location, recipientLocation: Location): DeliveryFare {
    /** TO-DO */
    return new DeliveryFare(0);
  }
}

export default DeliveryFare;
