import { BookingStatusCodeModel } from "./SlotStatus-model";

export class BookingStatusTextModel {
    public static BKG_CAN = 'Booking Cancelled';
    public static BKG_CNF = 'Booking Confirmed';
    public static BKG_PROG = 'Booking Progress';
    public static BKG_CMPLT = 'Booking Completed';
    public static all = 'All';
    public static list = [BookingStatusTextModel.BKG_CAN,
        BookingStatusTextModel.BKG_CNF,BookingStatusTextModel.BKG_PROG,
        BookingStatusTextModel.BKG_CMPLT,BookingStatusTextModel.all];
  }
  