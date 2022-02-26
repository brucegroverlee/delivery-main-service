import DTO from '../../shared/infrastructure/DTO';
import CarrierLocationDTO from './CarrierLocationDTO';

interface CarrierDTO extends DTO {
  id: string;
  status: number;
  location: CarrierLocationDTO | null;
  deliveryId: string | null;
}

export default CarrierDTO;
