// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const sevenDay = 60 * 60 * 24 * 3 * 1000

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const arr = await db.collection('timeCards').get().then(res=>{
    const currentTime = new Date().getTime()
    const { data } = res
    let deleteArr = []
    data.map(e=>{
      const { createTime } = e
      const time = new Date(createTime).getTime()
      const offstTime = currentTime - time;
      if(offstTime > sevenDay) {
        deleteArr.push(e._id)
      }
    })
    return deleteArr
  })
  arr.map(item=>{
    db.collection('timeCards').doc(item).remove()
  })
  
}