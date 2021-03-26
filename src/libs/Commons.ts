export const generateString = function( stringlength : number ): string {
	const chars : string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz" ;
    let  randomstring : string = '' ;
    
	for ( let i = 0; i < stringlength ; i++) {
		let rnum = Math.floor( Math.random() *  chars.length ) ;
		randomstring += chars.substring( rnum, rnum + 1 );
	}
	return randomstring;
}


export const generateMailVerification = function() : string {
    return 'MAIL_' + generateString( 50 ) ;
} 
    