import { EventEmitter } from "@angular/core";
import { UserObject } from "../../user-object";

export class Emitters {
    static authEmitter = new EventEmitter<UserObject>();

}