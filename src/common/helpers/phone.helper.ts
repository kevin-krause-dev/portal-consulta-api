export function cleanPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
}
