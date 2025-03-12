
export default function useValidators () {
    function validateString (str: string) {
        if (str.length < 3) {
            throw new Error("فیلد بالا حتما باید سه حرف باشد");
            
        }
    }
    function validatePhoneNumber(str: string) {
        const phoneRegex = /^0\d{10}$/;
        if (!phoneRegex.test(str)) {
            throw new Error("شماره تلفن باید ۱۱ رقم و با ۰ شروع شود");
        }
    }
    return {
        validateString,
        validatePhoneNumber,
    }
}