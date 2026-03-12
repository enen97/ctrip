import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => ({
        city: '上海',
        checkIn: null,
        checkOut: null,
        filters: { start: 0, princeRange: [0, 1000] }
    }),
    actions: {
        setSearchCriteria(params) {
            this.$patch(params)
        }
    }
})