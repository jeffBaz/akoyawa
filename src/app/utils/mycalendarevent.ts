import { CalendarEvent } from 'angular-calendar';
export interface ICalendarEvent<MetaType = any> extends CalendarEvent {
    startTime?:number;
    endTime?:number;
    nom?:string;
    prenom?:string;
    tel?:string;
    codeValidation?:string;
  
}