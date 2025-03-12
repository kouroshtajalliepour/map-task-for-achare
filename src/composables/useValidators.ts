
export default function useValidators () {
    function validateString (str: string) {
        if (str.length < 3) {
            throw new Error("فیلد بالا حتما باید سه حرف باشد");
            
        }
    }
    function validatePhoneNumber (str: string) {
        
    }
    function validateAddress (str: string) {
        
    }
    return {
        validateString,
        validatePhoneNumber,
        validateAddress
    }
}