
// export const textCut = (text, start, end) => {
//    const cut = text.substring(start, end);
//    return cut;
// };

export const emailFormat = (email, validLength) => {
   let basicEmailPart = email.substring(0, email.indexOf('@'));
   let emailProviderPart = email.substring(email.indexOf('@'));

   if ((basicEmailPart.length + emailProviderPart.length) <= validLength) {
      return email;
   } else {
      return basicEmailPart.substring(0, (validLength - emailProviderPart.length)) + "..." + emailProviderPart;
   }
}