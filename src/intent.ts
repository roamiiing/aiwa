import { anyOf, capturingGroup, CYRILLIC_LETTER, RegexPart, escape, PUNCTUATION } from './regex'

export type Intent = {
    key: string
    triggerParts: RegexPart[]
}

export type IntentKeywordMatch = {
    intentKey: string
    intentKeyword: string
    start: number
    end: number
}

export function getIntentKeywordMatches(message: string, intents: Intent[]): IntentKeywordMatch[] {
    return intents.flatMap((intent) => {
        const regex = capturingGroup(anyOf(...intent.triggerParts)).toRegExp('ig')
        const matches = message.matchAll(regex)

        return Array.from(matches).map((match) => {
            const index = match.index ?? 0

            return {
                intentKey: intent.key,
                intentKeyword: match[0],
                start: index,
                end: index + match[0].length,
            }
        })
    })
}

export type IntentMatch = {
    intentKey: string
    sentence: string
    clearSentence: string
}

export function getIntentMatches(message: string, intents: Intent[]): IntentMatch[] {
    const intentKeywordMatches = getIntentKeywordMatches(message, intents)

    return intentKeywordMatches
        .map((match, index, array) => {
            const nextMatch = array[index + 1]

            if (nextMatch) {
                const start = match.start
                const end = nextMatch.start

                const sentence = message.slice(start, end).trim()

                return {
                    intentKey: match.intentKey,
                    sentence,
                }
            }

            return {
                intentKey: match.intentKey,
                sentence: message.slice(match.start).trim(),
            }
        })
        .map((match) => ({
            ...match,
            clearSentence: match.sentence.replaceAll(PUNCTUATION.toRegExp('ig'), '').trim(),
        }))
}
