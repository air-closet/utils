
type PromiseAllOptions = {
    concurrently: number
}
const DEFAULT_CONCURRENTLY = 20 as const

async function promise_all(allTaskList: Promise<any>[] | any[], options?: PromiseAllOptions) {
    const concurrently = options?.concurrently || DEFAULT_CONCURRENTLY;
    let cnt = 0;
    let executeTaskList = []
    const resultList = []

    for (const task of allTaskList) {
        executeTaskList.push(task)

        if (executeTaskList.length > concurrently) {
            const result = await Promise.all(executeTaskList);
            resultList.push(...result)
            cnt += concurrently;

            executeTaskList = []
            console.log(`${cnt} end`);
        }
    }

    console.debug({ resultList})

    const result = await Promise.all(executeTaskList)
    resultList.push(...result)

    console.debug({ resultList})

    return resultList
}

export default promise_all
