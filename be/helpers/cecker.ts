const VALID_SEARCH_TARGETS = [
  'partial_match_for_tags',
  'exact_match_for_tags',
  'title',
  '',
] as const

const VALID_LANGUAGES = ['ja', 'ch', 'en', 'all'] as const

type SearchTarget = typeof VALID_SEARCH_TARGETS[number]

export function parseNumber (value: unknown, defaultValue: number): number {
  const number = Number(value)
  return isNaN(number) || number <= 0 ? defaultValue : number
}

export function isValidSearchTarget (value: unknown): value is SearchTarget {
  return VALID_SEARCH_TARGETS.includes(value as SearchTarget)
}

export function isValidLanguage (value: unknown): value is typeof VALID_LANGUAGES[number] {
  return VALID_LANGUAGES.includes(value as typeof VALID_LANGUAGES[number])
}
