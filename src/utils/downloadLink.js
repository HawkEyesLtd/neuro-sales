// // check json
// function checkJSON(doc) {
//     return doc?.headers.get('Content-Type').includes('json');
// }
// // download link function
// const download = async ({ url, fileName }) => {
//     try {
//         dispatch(setGlobalLoading(true));
//         for (let index = -1; ; ) {
//             const [result1, result2, result3] = await Promise.all([
//                 fetch(`${import.meta.env.VITE_API_URL}${url}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: ` Bearer ${accessToken}`,
//                     },

//                     body: JSON.stringify({ ...getBodyData(), index: ++index }),
//                     mode: 'cors',
//                 }),
//                 fetch(`${import.meta.env.VITE_API_URL}${url}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: ` Bearer ${accessToken}`,
//                     },

//                     body: JSON.stringify({ ...getBodyData(), index: ++index }),
//                     mode: 'cors',
//                 }),
//                 fetch(`${import.meta.env.VITE_API_URL}${url}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: ` Bearer ${accessToken}`,
//                     },

//                     body: JSON.stringify({ ...getBodyData(), index: ++index }),
//                     mode: 'cors',
//                 }),
//             ]);
//             const typeJSON1 = checkJSON(result1);
//             const typeJSON2 = checkJSON(result2);
//             const typeJSON3 = checkJSON(result3);

//             const arr = [];

//             if (!typeJSON1) arr.push(downLoadingFile(result1));
//             if (!typeJSON2) arr.push(downLoadingFile(result2));
//             if (!typeJSON3) arr.push(downLoadingFile(result3));

//             await Promise.all(arr);

//             if (typeJSON1 || typeJSON2 || typeJSON3) break;
//         }
//     } catch (error) {
//         message.error('Something went wrong');
//     } finally {
//         dispatch(setGlobalLoading(false));
//     }
// };
