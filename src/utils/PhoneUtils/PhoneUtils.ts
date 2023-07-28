import validator from 'validator';
import {MobilePhoneLocale} from 'validator/lib/isMobilePhone';

const isValidPhoneNumber = (
  phoneNumber: number,
  countryCode: string,
  locale?: MobilePhoneLocale,
) => {
  const fullPhoneNumber = `${countryCode}${phoneNumber}`;
  return validator.isMobilePhone(fullPhoneNumber, locale, {
    strictMode: false,
  });
};

const getCountryLocale = (countryLocale: string) => {
  return validator.isMobilePhoneLocales.find(mpl =>
    mpl.includes(countryLocale),
  );
};

export const PhoneUtils = {
  isValidPhoneNumber,
  getCountryLocale,
};
