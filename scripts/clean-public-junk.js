/**
 * 部署前清理 macOS / Windows 产生的垃圾文件
 *
 * 背景：在 Finder 里浏览过目录后，macOS 会写入 .DS_Store 隐藏文件；
 * 它们会被 hexo deploy 一起传到 gh-pages 分支，污染仓库。
 *
 * 这里在每次部署前同时清理两个位置：
 *   1. public/        —— 即将被复制的产物目录
 *   2. .deploy_git/   —— hexo-deployer-git 的临时仓库（可能残留上一次的垃圾文件）
 *
 * 注意：Hexo 的部署钩子事件名是 deployBefore / deployAfter，
 *       不是 before_deploy / after_deploy（写错会静默不生效）。
 */
const fs = require('fs');
const path = require('path');

const JUNK = ['.DS_Store', 'Thumbs.db'];

function cleanDir(dir) {
  if (!dir || !fs.existsSync(dir)) return 0;
  let removed = 0;
  (function walk(p) {
    let names;
    try {
      names = fs.readdirSync(p);
    } catch (e) {
      return;
    }
    for (const name of names) {
      if (name === '.git') continue; // 别动 git 内部
      const full = path.join(p, name);
      let st;
      try {
        st = fs.statSync(full);
      } catch (e) {
        continue;
      }
      if (st.isDirectory()) {
        walk(full);
      } else if (JUNK.indexOf(name) >= 0) {
        try {
          fs.unlinkSync(full);
          removed++;
        } catch (e) {
          /* 删不掉就跳过 */
        }
      }
    }
  })(dir);
  return removed;
}

hexo.on('deployBefore', function () {
  const removed = cleanDir(hexo.public_dir) + cleanDir(path.join(hexo.base_dir, '.deploy_git'));
  if (removed > 0) {
    hexo.log.info('已清理垃圾文件 ' + removed + ' 个（.DS_Store / Thumbs.db）');
  }
});
