export const getAllHandbag = async () => {
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handbag`)
        return res.json()
    } catch (err) {
        console.log(err)
    }
}