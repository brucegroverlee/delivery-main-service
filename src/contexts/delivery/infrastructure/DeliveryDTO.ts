import DTO from '../../shared/infrastructure/DTO';
import LocationDTO from './LocationDTO';

interface DeliveryDTO extends DTO {
  id: string;
  senderId: string;
  senderLocation: LocationDTO;
  recipientId: string;
  recipientLocation: LocationDTO;
  status: number;
  fare: number | null;
  carrierId: string | null;
  startedTime: string | null;
  completedTime: string | null;
}

export default DeliveryDTO;
