import statisticsSchema from '../db/schema/statistics'

export const getSiteStatistics = async () => {
    const result = await statisticsSchema.hgetall()
    return result
}