import EventBus from '../../../shared/domain/bus/EventBus';
import Presenter from '../../../shared/domain/Presenter';
import Carrier from '../../domain/Carrier';
import CarrierRepository from '../../domain/CarrierRepository';

class CreateCarrier {
  constructor(private repository: CarrierRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(): Promise<void> {
    const carrier = Carrier.create();

    await this.repository.add(carrier);

    await this.eventBus.publish(carrier.getDomainEvents());

    this.presenter.returnNewEntity(carrier);
  }
}

export default CreateCarrier;
