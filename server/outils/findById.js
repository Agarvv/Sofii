
const findById = async (model, id) => {
    return new Promise((resolve, reject) => {
        try {
            const data = model.findOne({
                where:{id}
            })
            if(!data) {
                reject('No data Found.')
            }
            resolve(data)
        } catch(e) {
            console.log(e)
        }
    })
}

module.exports = findById