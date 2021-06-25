export default async function (url) {
    const result = await fetch(process.env.API+url);
    return await result.json()
}