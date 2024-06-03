export enum UserRole {
  Visitor = 'Visitor', //0
  CheckingStaff = 'Checking staff', //1
  EventOperator = 'Event operator', //2
  Admin = 'Admin' //3
}
export enum UserVerifyStatus {
  UNVERIFIED,
  VERIFIED,
  BANNED
}

export enum EventStatus {
  PENDING = 'Pending', //0
  APPROVED = 'Approved', //1
  REJECTED = 'Rejected' //2
}
