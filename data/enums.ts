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

