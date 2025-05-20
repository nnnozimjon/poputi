export function formatPhoneNumber(number: string) {
    let originalNumber = number.replace(/\D/g, '');
  
    if (originalNumber.startsWith('992')) {
      originalNumber = '+' + originalNumber;
    } else {
      originalNumber = '+992' + originalNumber;
    }
    return originalNumber.replace(/(\+992)(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  }
  