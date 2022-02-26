import EventBus from '../../../shared/domain/bus/EventBus';
import Presenter from '../../../shared/domain/Presenter';
import CarrierId from '../../domain/CarrierId';
import CarrierRepository from '../../domain/CarrierRepository';

export interface ChangeStatusToIdleData {
  carrierId: CarrierId;
}

class ChangeStatusToIdle {
  constructor(private repository: CarrierRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(data: ChangeStatusToIdleData): Promise<void> {
    const { carrierId } = data;

    const carrier = await this.repository.getById(carrierId);

    if (!carrier) throw new Error(`There is not a Carrier entity with id ${carrierId.value}`);

    carrier.changeStatusToIdle();

    await this.repository.update(carrier);

    await this.eventBus.publish(carrier.getDomainEvents());

    this.presenter.returnEntity(carrier);
  }
}

export default ChangeStatusToIdle;
