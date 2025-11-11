export interface LanguageDetails {
    value: string;
    shortName: string;
}

export const Language: { [key: string]: LanguageDetails } = {
    English: {value: "English", shortName: "en"},
    Ukrainian: {value: "Українська", shortName: "uk"},
};

export const FooterLanguage: { [key: string]: LanguageDetails } = {
    English: {value: "In English", shortName: "en"},
    Ukrainian: {value: "Українською", shortName: "uk"},
};

export const Currency = {
    UAH: 'UAH',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
}

export const OrgIBAN = {
    UAH: 'UA283510050000026003879189233', 
    USD: 'UA283510050000026003879189233USD',
    EUR: 'UA283510050000026003879189233EUR', 
    GBP: 'UA283510050000026003879189233GBP',
}