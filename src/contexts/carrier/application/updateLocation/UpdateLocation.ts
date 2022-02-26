import EventBus from '../../../shared/domain/bus/EventBus';
import Presenter from '../../../shared/domain/Presenter';
import CarrierId from '../../domain/CarrierId';
import CarrierLocation from '../../domain/CarrierLocation';
import CarrierRepository from '../../domain/CarrierRepository';

export interface UpdateLocationData {
  carrierId: CarrierId;
  location: CarrierLocation;
}

class UpdateLocation {
  constructor(private repository: CarrierRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(data: UpdateLocationData): Promise<void> {
    const { carrierId, location } = data;

    const carrier = await this.repository.getById(carrierId);

    if (!carrier) throw new Error(`There is not a Carrier entity with id ${carrierId.value}`);

    carrier.updateLocation(location);

    await this.repository.update(carrier);

    await this.eventBus.publish(carrier.getDomainEvents());

    this.presenter.returnEntity(carrier);
  }
}

export default UpdateLocation;
