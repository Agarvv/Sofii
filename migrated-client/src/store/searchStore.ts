import { defineStore } from 'pinia'
import { SearchResults } from '@/types/search/SearchResults'

interface SearchStore {
  originalResults: SearchResults,
  filteredResults: SearchResults 
}

export const searchStore = defineStore('search', {
    state: (): SearchStore => ({
        originalResults: { users: [], posts: []}
        filteredResults: { users: [], posts: [] }
    }),
    actions: {
        setOriginalResults(results: SearchResults) {
            this.originalResults = results; 
        },
        setFilteredResults(results: SearchResults) {
            this.filteredResults = results; 
        }
    }
})