import DeliveryFare from '../../domain/DeliveryFare';
import DeliveryFareCalculatorService from '../../domain/DeliveryFareCalculatorService';
import Location from '../../domain/Location';

class GoogleMapsDeliveryFareCalculator implements DeliveryFareCalculatorService {
  async calculateBy(senderLocation: Location, recipientLocation: Location): Promise<DeliveryFare> {
    return new DeliveryFare(15);
  }
}

export const googleMapsDeliveryFareCalculator = new GoogleMapsDeliveryFareCalculator();

export default GoogleMapsDeliveryFareCalculator;
