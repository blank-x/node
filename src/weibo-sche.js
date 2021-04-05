const cheerio = require("cheerio");
const superagent = require("superagent");
const fs = require("fs");
const weiboURL = "https://s.weibo.com";
const hotSearchURL = "https://s.weibo.com/top/summary?cate=realtimehot";
// const baidu = 'https://www.qq.com/'
const nodeSchedule = require("node-schedule");

function getHotSearchList() {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) {
        reject("request error");
        return
      }
      const $ = cheerio.load(res.text);
      let hotList = [];
      $("#pl_top_realtimehot table tbody tr").each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1);
          const link = weiboURL + $td.find("a").attr("href");
          const text = $td.find("a").text();
          const hotValue = $td.find("span").text();
          const icon = $td.find("img").attr("src")
            ? "https:" + $td.find("img").attr("src")
            : "";
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          });
        }
      });
      hotList.length ? resolve(hotList) : reject("errer");
    });
  });
}
//Cron风格定时器
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
nodeSchedule.scheduleJob("30 * * * * *", async function () {
  try {
    const hotList = await getHotSearchList();
    await fs.writeFileSync(
      `${__dirname}/hotSearch.json`,
      JSON.stringify(hotList),
      "utf-8"
    );
    console.log('write');
    console.log(new Date);
  } catch (error) {
    console.error(error);
  }
});

//dayOfWeek
//month
//dayOfMonth
//hour
//minute
//second
//每周一的下午16：11分触发，其它组合可以根据我代码中的注释参数名自由组合
