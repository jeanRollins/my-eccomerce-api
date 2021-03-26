interface IHttpPOST {
    method : string ;
    body   : any ;
}

export class HttpClient{
    
    private url : string = '' ;
    //private body: IHttpBody ;

    constructor( url : string  ) {
        this.url  = url ;
       // this.body = body ;
    }

    static async post( url : string , body : any){
        const callPost : IHttpPOST = { method : 'POST' , body } ;

        const res = await fetch( url , callPost ) ;
        const response = await res.json() ;
        return response ;
    }

    static async get( url : string  ){
        
        const res = await fetch( url) ;
        const response = await res.json() ;
        return response ;
    }

}