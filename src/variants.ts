import { anyOf, capturingGroup, RegexPart, PUNCTUATION, sequence, CUSTOM_WORD_BOUNDARY } from './regex'

export type Variant = {
    key: string
    triggerParts: RegexPart[]

    displayName?: string
}

export type VariantKeywordMatch = {
    variantKey: string
    variantKeyword: string
    variantDisplayName: string
    start: number
    end: number
}

export function getVariantKeywordMatches(message: string, variants: Variant[]): VariantKeywordMatch[] {
    return variants.flatMap((variant) => {
        const regex = sequence(CUSTOM_WORD_BOUNDARY, capturingGroup(anyOf(...variant.triggerParts))).toRegExp('ig')
        const matches = message.matchAll(regex)

        return Array.from(matches).map((match) => {
            const index = match.index ?? 0

            return {
                variantKey: variant.key,
                variantKeyword: match[1],
                variantDisplayName: variant.displayName ?? match[1],
                start: index,
                end: index + match[1].length,
            }
        })
    })
}

export type VariantMatch = {
    variantKey: string
    variantDisplayName: string
    sentence: string
    clearSentence: string
}

export function getVariantMatches(message: string, variants: Variant[]): VariantMatch[] {
    const variantKeywordMatches = getVariantKeywordMatches(message, variants)

    return variantKeywordMatches
        .map((match, index, array) => {
            const nextMatch = array[index + 1]

            if (nextMatch) {
                const start = match.start
                const end = nextMatch.start

                const sentence = message.slice(start, end).trim()

                return {
                    variantKey: match.variantKey,
                    variantDisplayName: match.variantDisplayName,
                    sentence,
                }
            }

            return {
                variantKey: match.variantKey,
                variantDisplayName: match.variantDisplayName,
                sentence: message.slice(match.start).trim(),
            }
        })
        .map((match) => ({
            ...match,
            clearSentence: match.sentence.replaceAll(PUNCTUATION.toRegExp('ig'), '').trim(),
        }))
}
