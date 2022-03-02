import EventBus from '../../../shared/domain/bus/EventBus';
import Presenter from '../../../shared/domain/Presenter';
import CarrierFinderService from '../../domain/CarrierFinderService';
import CarrierLocation from '../../domain/CarrierLocation';
import CarrierRepository from '../../domain/CarrierRepository';
import DeliveryId from '../../domain/DeliveryId';

export interface FindAvailableCarrierData {
  deliveryId: DeliveryId;
  location: CarrierLocation;
}

class FindAvailableCarrier {
  constructor(
    private finderService: CarrierFinderService,
    private repository: CarrierRepository,
    private eventBus: EventBus,
    private presenter: Presenter,
  ) {}

  async run(data: FindAvailableCarrierData): Promise<void> {
    const { deliveryId, location } = data;

    const carrier = await this.finderService.findAvailable(location);

    if (!carrier) throw new Error(`There is not a Carrier available`);

    carrier.assignDelivery(deliveryId);

    await this.repository.update(carrier);

    await this.eventBus.publish(carrier.getDomainEvents());

    this.presenter.returnEntity(carrier);
  }
}

export default FindAvailableCarrier;
