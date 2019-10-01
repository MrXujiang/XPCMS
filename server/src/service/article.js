import articleSchema from '../db/schema/article'
import { writeFile, delFile } from '../lib/upload'
import { staticPath } from '../config/index'
import fs from 'fs'
import { resolve } from 'path'

const articlePath = resolve(__dirname, '../../public/blog');

export const saveArticle = async (data) => {
    let { 
        id, 
        tit, 
        label, 
        faceUrl, 
        time,
        views, 
        flover, 
        content 
      } = data;

    if(fs.existsSync(articlePath)) {
        return handleService()
    }else {
        let flag = fs.mkdirSync(articlePath);
        if(!flag) {
            return handleService()
        }else {
            return 500
        }  
    }

    async function handleService() {
        let desc = content.slice(0, 60).replace(/<\/?.+?\/?>/g, '')
        let err = await writeFile(`${articlePath}/${id}.json`, JSON.stringify({content}), "utf8")
        if(!err) {
            let articleUrl = `${staticPath}/blog/${id}.json`
            // 将非内容文件数据缓存到redis
            let res = await articleSchema.hmset(id, {
                tit, 
                label, 
                faceUrl,
                desc,
                time,
                views: +views,
                flover: +flover,
                articleUrl
            })
            
            if(res && !Array.isArray(res)) {
                return 200
            }else {
                return res
            }  
        }else {
            return 500
        }
    }
}

export const getArticles = async () => {
    let result = await articleSchema.hgetall()
    if(result) {
        result = Object.entries(result).reduce((prev, current) => {
            let value = current[1] && JSON.parse(current[1])
            let key = value.label
            if(prev[key]) {
                prev[key].push({
                    id: current[0],
                    ...value
                })
            }else {
                prev[key] = [{
                    id: current[0],
                    ...value
                }]
            }
            return prev
        }, {})
        return result
    }else {
        return null
    }
}

export const getArticle = async (id) => {
    let result = await articleSchema.hget(id)
    if(result) {
        return JSON.parse(result)
    }else {
        return null
    }
}

export const getArticleList = async (query) => {
    // query里有num表示一页展示多少条数据，page表示当前页数
    let result = await articleSchema.hgetall()
    if(result) {
        let num = query.num || 10;
        let page = query.page || 0;
        let cate = query.cate || '';
        // 检查是否传入分类数据
        if(cate && cate !== '首页') {
            result = (await getArticles())[cate] || []
            result = result.slice(num * page, num)
        }else {
            result = Object.entries(result)
                        .slice(num * page, num).reduce((prev, current) => {
                            let value = current[1] && JSON.parse(current[1])
                            prev.push({
                                id: current[0],
                                ...value
                            })
                            return prev
                        }, [])
        }
        return result
    }else {
        return null
    }
}

export const editArticle = async (data) => {
    let { 
        id, 
        tit, 
        label, 
        faceUrl,
        content 
      } = data;

    let err = await writeFile(`${articlePath}/${id}.json`, JSON.stringify({content}), "utf8")
    if(!err) {
        // 将非内容文件数据缓存到redis
        let articleData = await articleSchema.hget(id)
        console.log(articleData)
        if(articleData) {
            let res = await articleSchema.hmset(id, {
                ...JSON.parse(articleData),
                tit, 
                label, 
                faceUrl, 
            })
            if(res && !Array.isArray(res)) {
                return 200
            }else {
                return res
            }
        }else {
            // 数据为空
            return '文章数据为空'
        }       
    }else {
        return 500
    }
    
}

export const delArticle = async (id) => {
    let result = await articleSchema.hdel(id)
    console.log(typeof id, id)
    let err = await delFile(`${articlePath}/${id}.json`)
    if(!err) {
        return result
    }else {
        return [err, result === 1 ? '数据删除成功' : '数据不存在']
    }
    
}

/** 注：文章点赞和文章阅读量统计方法一样，之所以没有复用，考虑到代码的解偶或业务的分离 */

// 文章点赞
export const addArticleFlover = async (id, article) => {
    let result = await articleSchema.hmset(id, article)
    return result
}

// 文章阅读量统计
export const calculateArticleViews = async (id, article) => {
    let result = await articleSchema.hmset(id, article)
    return result
}

