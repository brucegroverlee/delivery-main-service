import Location from './Location';
import DeliveryFare from './DeliveryFare';

interface DeliveryFareCalculatorService {
  calculateBy(senderLocation: Location, recipientLocation: Location): Promise<DeliveryFare>;
}

export default DeliveryFareCalculatorService;
