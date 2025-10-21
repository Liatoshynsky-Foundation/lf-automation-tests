export interface LanguageDetails {
    value: string;
    shortName: string;
}

const Language: { [key: string]: LanguageDetails } = {
    English: { value: "English", shortName: "en" },
    Ukrainian: { value: "Українська", shortName: "uk" },
};

export default Language;