export class Outlet{
    deviceId:string;
    deviceKey:string;
    current_usage:number;

    constructor(id:string,key:string,usage:number){
        this.deviceId = id;
        this.deviceKey = key;
        this.current_usage = usage;
    }
}