declare function uuid() : string;
declare function anime(options:any) : void;

declare class Notify{ constructor(options:{ message: string }); }

declare class Cart{
    constructor();
    public static addLineItem() : void;
}