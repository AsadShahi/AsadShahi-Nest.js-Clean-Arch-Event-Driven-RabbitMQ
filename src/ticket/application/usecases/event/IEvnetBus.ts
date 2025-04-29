export interface IEventBus{

    // event= payload routing key =message ticket created 
    publish(event:any,routingKey:string):Promise<void>
}