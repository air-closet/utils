import promise_all from "./promise-all";

describe('promise-all', (): void => {
    /**
     - 関数はpromise.allと同じ引数 Array<Promise> を受け取る
     - defaultで concurrently は20
     - Errorハンドリングは promise.all と極めて同じにする
     */
    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

    test('', async () => {

        const promise1 = Promise.resolve(3);
        const promise2 = 42;
        const promise3 = new Promise((resolve, reject) => {
            setTimeout(resolve, 100, 'foo');
        });
        const result = await promise_all([promise1, promise2, promise3])

        expect(result).toStrictEqual([3, 42, "foo"]);
    });

    test('Catch Error', async () => {
        // todo: Errorハンドリング
    });
})
