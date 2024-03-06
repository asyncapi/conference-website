export const CommonUtils = {
    getCurrentYear2Digit: () => {
        return CommonUtils.getCurrentYearFull().substring(2)
    },
    extractYear: (dateString) => {
        return dateString.split(' ').pop();
    },
    getCurrentYearFull: () => {
        return new Date().getFullYear().toString()
    },
}