import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class PackageAccepted extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.package_accepted';

  constructor(delivery: Delivery) {
    super(PackageAccepted.EVENT_NAME, delivery);
  }
}

export default PackageAccepted;
