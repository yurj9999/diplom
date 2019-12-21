const nowDate = new Date();
const weekAgoDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
weekAgoDate.setDate(weekAgoDate.getDate() - 7);

class DateCalc {
    getDateForApi(nowDate, weekAgoDate) {
        return {
            nowDate: `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`,
            weekAgoDate: `${weekAgoDate.getFullYear()}-${weekAgoDate.getMonth() + 1}-${weekAgoDate.getDate()}`
        }
    }
}

const dateCalc = new DateCalc;

export const dateForApi = dateCalc.getDateForApi(nowDate, weekAgoDate);