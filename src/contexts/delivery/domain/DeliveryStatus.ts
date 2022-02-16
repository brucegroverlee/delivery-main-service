/**
 * https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums
 *
 * we have a numeric enum where CREATED is initialized with 1.
 * All of the following members are auto-incremented from that point on.
 */
enum DeliveryStatus {
  CREATED,
  // ACCEPTED_BY_RECIPIENT, at this moment we dont use this status, when we'll implement an async fare calculator, this status will be used
  DELIVERY_FARE_CALCULATED,
  REJECTED_BY_RECIPIENT,
  DELIVERY_FARE_ACCEPTED_BY_SENDER,
  DELIVERY_FARE_REJECTED_BY_SENDER,
  CARRIER_ASSIGNED,
  CARRIER_ARRIVED_SENDER_LOCATION,
  STARTED,
  ABOUT_TO_ARRIVE_RECIPIENT_LOCATION,
  ARRIVE_RECIPIENT_LOCATION,
  PACKAGE_ACCEPTED,
  DELIVERY_PAID,
}

export default DeliveryStatus;
