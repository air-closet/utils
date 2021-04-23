type PromiseAllOptions = {
  concurrently: number;
};
const DEFAULT_CONCURRENTLY = 20 as const;

export async function promise_all(
  allTaskList: Promise<any>[] | any[],
  options?: PromiseAllOptions
) {
  const concurrently = options?.concurrently || DEFAULT_CONCURRENTLY;
  let cnt = 0;
  let executeTaskList = [];
  const resultList = [];

  for (const task of allTaskList) {
    executeTaskList.push(task);

    if (executeTaskList.length > concurrently) {
      const result = await Promise.all(executeTaskList);

      if (result.length > 0) {
        resultList.push(...result);
      }

      cnt += concurrently;

      executeTaskList = [];
    }
  }

  const result = await Promise.all(executeTaskList);

  if (result.length > 0) {
    resultList.push(...result);
  }

  return resultList;
}

export default promise_all;
