import records from './researched.json'
import type { Camp } from './camps'

// Records are validated before the daily workflow commits them.
export const researchedCamps = records as Camp[]
