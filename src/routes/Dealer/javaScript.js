export function formValidation(params) {
    for (const item in params) {
        if(item == 'contactNo' && params[item].length != 10)
            return false;
        else if (item == 'emailId'){
            if(!String(params[item]).toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )){
                console.log('email id');
                return false
            }
        }else if ((item == 'state' || item == 'district') && params[item] == 'none'){
            return false;   
        }
        else if(params[item].length == 0){
            return false;
        }
    }
    return true;
}