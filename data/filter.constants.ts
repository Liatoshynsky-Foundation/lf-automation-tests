// ============================================================================
//  FILTERS CONSTANTS
// Centralized enums and text mappings used across filter-related components & tests.
// This improves maintainability, localization, and avoids hardcoded UI strings.
// ============================================================================

// ------------------------- Filter Names -------------------------//
// --------------data-testid--------------//
export enum FilterNames {
    GENRE = 'MusicTableFilters-genre',
    CATEGORY = 'MusicTableFilters-category',
    AUTHOR = 'MusicTableFilters-author',
}

export const FilterNameMap: Record<string, FilterNames> = {
    'Жанр': FilterNames.GENRE,
    'Категорія': FilterNames.CATEGORY,
    'Автор': FilterNames.AUTHOR,

    'Genre': FilterNames.GENRE,
    'Category': FilterNames.CATEGORY,
    'Author': FilterNames.AUTHOR,
};

// ------------------------- Filter Options -------------------------//

export enum FilterOptions {
    ROMANCE = 'Романс',
    ART_SONG = 'Мистецька пісня',
}

// ------------------------- Chip Texts -------------------------//
/**
 * UI texts for chips (selection counters) in both languages.
 */
export const ChipText = {
    Ukrainian: {
        oneSelected: '1 обрано',
        twoSelected: '2 обрано',
    },
    English: {
        oneSelected: '1 selected',
        twoSelected: '2 selected',
    },
} as const;

// ------------------------- Year Inputs -------------------------//
/**
 * Enum representing index positions for "From" and "To" year inputs.
 * Used when accessing inputs in arrays or locator lists.
 */
export enum YearInputIndex {
    FROM = 0,
    TO = 1,
}

// ------------------------- Validation Messages -------------------------//
/**
 * Validation messages for Year filter.
 * Used to avoid hardcoded text in tests and support localization.
 */
export const ValidationMessages = {
    Ukrainian: {
        FROM_LESS_THAN_MIN: "Число 'Від' не може бути менше ніж 1918",
        TO_GREATER_THAN_MAX: "Число 'До' не може бути більше ніж 1998",
        NUMERIC_ONLY: 'Дозволені лише числові значення',
    },
    English: {
        FROM_LESS_THAN_MIN: "The 'From' value cannot be less than 1918",
        TO_GREATER_THAN_MAX: "The 'To' value cannot exceed 1998",
        NUMERIC_ONLY: 'Only numeric values are allowed',
    },
}