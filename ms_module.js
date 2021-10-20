/**
 * BACOM APP company :
 * IOT Platform
 * 
 */
/**
 * 
 * @param {*} data 
 * @returns text for Add a records to database
 */
function AddRecords(test){

    var textok = {"test":"your "+test+" added","Status":"true"}
    return textok

}
/**
 * 
 * @param {*} data 
 * @returns text for errors
 */
function err_text(test){

    var err_text = {"test":""+test+"","Status":"false"}
    return err_text

}
/**
 * 
 * @param {*} data 
 * @returns a nymber for contorol string, like passwords and etc..
 */
function NumberOfString(data){
    return data.length 
}
/**
 * 
 * @param {*} data 
 * @returns trou or false for contorol a carakter string like &*^%$$ and etc..
 */
function ChackCaracter(data,fild){
    return  data.includes(fild)
}

/**
 * We have exports all functions for use the other pages
 */

exports.AddRecords=AddRecords
exports.err_text=err_text
exports.NumberOfString=NumberOfString
exports.ChackCaracter=ChackCaracter