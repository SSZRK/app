export const createFileByType = (type: string) => {
    switch (type) {
        case 'mileage-book':
            return {
                type: 'mileage-book',
                pages: [
                    {
                        type: 'title-page',
                        index: 0,
                        data: {
                            institution: '',
                            type: '',
                            startedDay: '',
                            startedYear: '',
                            finishedDay: '',
                            finishedYear: '',
                            numberOfPages: '',
                            pagesInWords: '',
                            chiefSignature: '',
                        },
                    },
                    {
                        type: 'blank-a4',
                        index: 1,
                        data: {},
                    },
                    ...Array.from({length: 100}, (_, i) => i).map((_, index) => {
                        return {
                            type: index % 2 === 0 ? 'left-page' : 'right-page',
                            index: index + 2,
                            data: {
                                rows: [],
                            },
                        };
                    })
                ],
            };
        case 'announcement-post-movement-log':
            return {
                type: 'announcement-post-movement-log',
                pages: [
                    {
                        type: 'title-page',
                        index: 0,
                        data: {
                            institution: '',
                            station: '',
                            type: '',
                            signalBoxOrPost: '',
                            type1: '',
                            trailOrSpace1: '',
                            type2: '',
                            trailOrSpace2: '',
                            startedDay: '',
                            startedYear: '',
                            finishedDay: '',
                            finishedYear: '',
                            numberOfPages: '',
                            pagesInWords: '',
                            chiefSignature: '',
                        },
                    },
                    {
                        type: 'blank-a4',
                        index: 1,
                        data: {},
                    },
                    ...Array.from({length: 100}, (_, i) => i).map((_, index) => {
                        return {
                            type: 'page',
                            index: index + 2,
                            data: {
                                type: '',
                                fromAndTo: '',
                                rows: [],
                            },
                        };
                    })
                ],
            };
        default:
            return {};
    }
}