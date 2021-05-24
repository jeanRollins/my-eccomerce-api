export const generateString = function( stringlength : number ): string {
	const chars : string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz" ;
    let  randomstring : string = '' ;
    
	for ( let i = 0; i < stringlength ; i++) {
		let rnum = Math.floor( Math.random() *  chars.length ) ;
		randomstring += chars.substring( rnum, rnum + 1 );
	}
	return randomstring;
}

export const generateMailVerification = () : string => {
    return 'MAIL_' + generateString( 50 ) ;
} 

export const generateSlug = ( title : string ) : string => {
	title = title.split(' ').join('-') ;
	title = removeAccents( title ) ; 
	title = title.toLowerCase() ;
	return title ;
}

export const removeAccents = ( str : string ) : string => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 
    